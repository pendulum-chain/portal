import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useState } from 'react';
import { Button } from 'react-daisyui';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';

import { useGlobalState } from '../../GlobalStateProvider';
import { useNodeInfoState } from '../../NodeInfoProvider';
import Amount from '../../components/Form/Amount';
import { getMigrationTarget } from '../../constants/migration';
import { getPerReleaseCap, isContractOnBase, isValidEip55Address, toChecksumAddress } from '../../helpers/ethereum';
import { useBaseReleaseStatus, useReleaseTxHash } from '../../hooks/migration/useBaseReleaseStatus';
import { PendingMigration, useMigrationPallet } from '../../hooks/migration/useMigrationPallet';
import { TenantName } from '../../models/Tenant';
import { decimalToNative, nativeToDecimal } from '../../shared/parseNumbers/metric';
import { ToastMessage, showToast } from '../../shared/showToast';
import { useAccountBalance } from '../../shared/useAccountBalance';
import { MigrationFormValues, getMigrationValidationSchema } from './ValidationSchema';

function ReleaseStatusCard({
  migration,
  tenantName,
  tokenSymbol,
  tokenDecimals,
  onDone,
}: {
  migration: PendingMigration;
  tenantName: TenantName;
  tokenSymbol: string;
  tokenDecimals: number;
  onDone: () => void;
}) {
  const target = getMigrationTarget(tenantName);
  const { data: status } = useBaseReleaseStatus(migration, target);
  const { data: releaseTx } = useReleaseTxHash(migration, target, Boolean(status?.released));
  const checksummedRecipient = toChecksumAddress(migration.recipient);
  const amount = nativeToDecimal(migration.palletAmount.toString(), tokenDecimals).toString();

  return (
    <div className="card mt-4 bg-base-200 p-4">
      <h2 className="text-lg font-bold">Migration #{migration.nonce.toString()} submitted 🎉</h2>
      <p className="mt-2 text-sm">
        {amount} {tokenSymbol} were burned on {tenantName} and will be released to{' '}
        <span className="break-all font-mono">{checksummedRecipient}</span> on Base by the attestor set.
      </p>
      <div className="mt-3 text-sm">
        {!target ? (
          <span>Base status tracking is not configured; check your Base wallet in a few minutes.</span>
        ) : status?.released ? (
          <span className="font-semibold text-success">
            ✓ Released on Base —{' '}
            <a
              className="link"
              href={
                releaseTx
                  ? `${target.baseExplorerUrl}/tx/${releaseTx}`
                  : `${target.baseExplorerUrl}/address/${checksummedRecipient}`
              }
              target="_blank"
              rel="nofollow noreferrer"
            >
              {releaseTx ? 'view the release transaction on BaseScan' : 'view on BaseScan'}
            </a>
          </span>
        ) : status && status.approvals >= status.threshold ? (
          <span>
            Approved by the attestor set ({status.threshold}/{status.threshold}). The release is queued — the
            vault&rsquo;s daily release cap is exhausted or releases are paused — and completes automatically once
            capacity frees up. Nothing to do on your side; check back in a few hours.
          </span>
        ) : (
          <span>
            Waiting for attestor approvals (
            {status ? `${Math.min(status.approvals, status.threshold)}/${status.threshold}` : '…'}) — this normally
            completes within a few minutes of finality.
          </span>
        )}
      </div>
      <div className="mt-3">
        <Button size="sm" color="secondary" type="button" onClick={onDone}>
          Start another migration
        </Button>
      </div>
    </div>
  );
}

function Migration() {
  const { walletAccount, tenantName } = useGlobalState();
  const { api, tokenSymbol = 'PEN', tokenDecimals } = useNodeInfoState().state;
  const { palletAvailable, constants, paused, submitMigration } = useMigrationPallet();
  const { balances } = useAccountBalance(walletAccount?.address);

  const [submissionPending, setSubmissionPending] = useState(false);
  const [pendingMigration, setPendingMigration] = useState<PendingMigration | undefined>(undefined);
  // Each acknowledgement is stored together with the value it was given for,
  // so editing the address or the amount silently retires it.
  const [contractConfirmedFor, setContractConfirmedFor] = useState<string | undefined>(undefined);
  const [capConfirmedFor, setCapConfirmedFor] = useState<number | undefined>(undefined);

  // The destination and vault checks below all need the vault address, so a
  // build without a valid one shows no form instead of skipping them.
  const configuredTarget = getMigrationTarget(tenantName);
  const target = configuredTarget && isValidEip55Address(configuredTarget.vaultAddress) ? configuredTarget : undefined;
  const lockedBalance = Math.max(0, balances.total - balances.transferable);

  const schema = useMemo(
    () =>
      getMigrationValidationSchema({
        transferable: balances.transferable,
        total: balances.total,
        minimumMigrationAmount: constants?.minimumMigrationAmount ?? 1,
        existentialDeposit: constants?.existentialDeposit ?? 0,
        tokenSymbol,
        vaultAddress: target?.vaultAddress ?? '',
      }),
    [balances.transferable, balances.total, constants, tokenSymbol, target?.vaultAddress],
  );

  const { register, control, handleSubmit, setValue, watch, formState, reset } = useForm<MigrationFormValues>({
    resolver: yupResolver(schema),
    defaultValues: { confirmIrreversible: false },
  });

  const baseAddress = watch('baseAddress') ?? '';
  const addressIsValid = isValidEip55Address(baseAddress);
  const checksummedAddress = addressIsValid ? toChecksumAddress(baseAddress) : undefined;

  const contractQuery = useQuery(
    ['migration', 'isContract', checksummedAddress],
    () => isContractOnBase(target!.baseRpcUrl, checksummedAddress!),
    { enabled: Boolean(target && checksummedAddress), staleTime: 60_000 },
  );
  const destinationIsContract = contractQuery.data;
  // A failed or still-running read must not silently drop the warning: an
  // unverifiable destination needs the same explicit acknowledgement.
  const contractCheckFailed = contractQuery.isError;
  const contractCheckPending =
    Boolean(target && checksummedAddress) && contractQuery.data === undefined && !contractQuery.isError;
  const needsContractAck = Boolean(destinationIsContract) || contractCheckFailed;
  const contractConfirmed = contractConfirmedFor !== undefined && contractConfirmedFor === checksummedAddress;

  // The vault's per-release cap, in whole PEN. A migration above it is burned
  // but its release on Base is deferred until governance raises the cap, so we
  // warn and ask the user to split the amount (round-7 review observation C).
  const capQuery = useQuery(
    ['migration', 'perReleaseCap', target?.vaultAddress],
    () => getPerReleaseCap(target!.baseRpcUrl, target!.vaultAddress).then((cap) => Number(cap / 10n ** 12n) / 1e6),
    { enabled: Boolean(target), staleTime: 60_000 },
  );
  const perReleaseCapPen = capQuery.data;
  const capCheckFailed = capQuery.isError;
  const capCheckPending = Boolean(target) && capQuery.data === undefined && !capQuery.isError;
  const amountValue = Number(watch('amount'));
  const exceedsPerReleaseCap =
    perReleaseCapPen !== undefined &&
    perReleaseCapPen > 0 &&
    Number.isFinite(amountValue) &&
    amountValue > perReleaseCapPen;
  const needsCapAck = exceedsPerReleaseCap || capCheckFailed;
  const capConfirmed = capConfirmedFor !== undefined && capConfirmedFor === amountValue;
  const checksPending = contractCheckPending || capCheckPending;

  if (tenantName !== TenantName.Pendulum) {
    return (
      <div className="card mx-auto mt-8 w-full max-w-xl bg-base-200 p-6">
        <h1 className="text-2xl font-bold">Migrate to Base</h1>
        <p className="mt-2">The PEN token migration is only available on the Pendulum network.</p>
      </div>
    );
  }

  if (!target) {
    return (
      <div className="card mx-auto mt-8 w-full max-w-xl bg-base-200 p-6">
        <h1 className="text-2xl font-bold">Migrate to Base</h1>
        <p className="mt-2">
          The migration is unavailable: this portal build has no valid migration vault address on Base configured
          (VITE_MIGRATION_VAULT_ADDRESS), which the checks before the burn require.
        </p>
      </div>
    );
  }

  if (!api || !palletAvailable) {
    return (
      <div className="card mx-auto mt-8 w-full max-w-xl bg-base-200 p-6">
        <h1 className="text-2xl font-bold">Migrate to Base</h1>
        <p className="mt-2">
          {api ? 'The migration is not enabled on this chain yet. Please check back later.' : 'Connecting to the node…'}
        </p>
      </div>
    );
  }

  const onSubmit = async (values: MigrationFormValues) => {
    if (!walletAccount) {
      showToast(ToastMessage.NO_WALLET_SELECTED);
      return;
    }
    if (checksPending) {
      showToast(ToastMessage.WARNING, 'Still verifying the destination against Base — try again in a moment.');
      return;
    }
    if (needsContractAck && !contractConfirmed) {
      showToast(ToastMessage.WARNING, 'Please confirm the destination address first.');
      return;
    }
    if (needsCapAck && !capConfirmed) {
      showToast(ToastMessage.WARNING, 'Please confirm you understand the release may be delayed.');
      return;
    }
    setSubmissionPending(true);
    try {
      const amountNative = decimalToNative(values.amount, tokenDecimals).toString();
      const migration = await submitMigration(amountNative, toChecksumAddress(values.baseAddress), walletAccount);
      setPendingMigration(migration);
      reset();
      setContractConfirmedFor(undefined);
      setCapConfirmedFor(undefined);
    } catch (error) {
      showToast(ToastMessage.ERROR, error instanceof Error ? error.message : 'Migration failed');
    } finally {
      setSubmissionPending(false);
    }
  };

  return (
    <div className="mx-auto mt-4 w-full max-w-xl">
      <div className="card bg-base-200 p-6">
        <h1 className="text-2xl font-bold">Migrate {tokenSymbol} to Base</h1>
        <p className="mt-2 text-sm text-neutral-500">
          Lock in your migration: the amount is burned on Pendulum and released 1:1 to your address on Base by a 3-of-4
          attestor set after finality.{' '}
          <strong>This is irreversible — tokens sent to a wrong address cannot be recovered.</strong>
        </p>

        {paused && (
          <div className="alert alert-warning mt-4 text-sm">
            Migrations are currently paused. Submissions are disabled until they resume.
          </div>
        )}

        {!walletAccount ? (
          <div className="alert mt-4 text-sm">Connect your wallet to start the migration.</div>
        ) : (
          <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
            {/* A pasted comma is ambiguous (decimal in many locales, thousands
                separator in others) and the input strips it as a thousands
                separator — "500,5" would migrate 5005. Migrations are one-way,
                so refuse the paste instead of guessing. */}
            <div
              onPasteCapture={(e) => {
                if (!e.clipboardData.getData('text').includes(',')) return;
                e.preventDefault();
                e.stopPropagation();
                showToast(
                  ToastMessage.WARNING,
                  'Use a dot as the decimal separator (for example 500.5). Amounts containing a comma are not accepted.',
                );
              }}
            >
              <Amount
                control={control}
                name="amount"
                setValue={(n) => setValue('amount', n, { shouldValidate: true })}
                max={balances.transferable}
                error={formState.errors.amount?.message}
                assetSuffix={tokenSymbol}
                hideHalfButton
              />
            </div>
            {lockedBalance > 0.0001 && (
              <p className="mt-1 text-xs text-neutral-500">
                {lockedBalance.toFixed(4)} {tokenSymbol} of your balance is locked (staking, vesting or governance).
                Unlock it first to migrate it — note the unstaking delay applies.
              </p>
            )}

            {needsCapAck && (
              <div className="alert alert-warning mt-3 text-sm">
                <div>
                  {capCheckFailed ? (
                    <p>
                      We could not read the vault&rsquo;s <strong>per-release cap</strong> from Base right now, so we
                      cannot tell whether this amount will be released promptly or held until governance raises the cap.
                      Retry later, or continue only if a delayed release is acceptable to you.
                    </p>
                  ) : (
                    <p>
                      This is above the vault&rsquo;s <strong>per-release cap</strong> of{' '}
                      {perReleaseCapPen?.toLocaleString()} {tokenSymbol}. Your {tokenSymbol} would still be burned on
                      Pendulum, but the release on Base is <strong>held</strong> until governance raises the cap, which
                      can take a while. To receive your tokens without that delay, migrate in amounts of at most{' '}
                      {perReleaseCapPen?.toLocaleString()} {tokenSymbol} each.
                    </p>
                  )}
                  <label className="mt-2 flex cursor-pointer items-center gap-2">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-sm"
                      checked={capConfirmed}
                      onChange={(e) => setCapConfirmedFor(e.target.checked ? amountValue : undefined)}
                    />
                    <span>I understand this release may be delayed until governance raises the cap</span>
                  </label>
                </div>
              </div>
            )}

            <label className="label mt-3">
              <span className="label-text">Your Base (EVM) address</span>
            </label>
            <input
              className={`input input-bordered w-full font-mono text-sm ${
                baseAddress && !addressIsValid ? 'input-error' : ''
              }`}
              placeholder="0x…"
              autoComplete="off"
              spellCheck={false}
              {...register('baseAddress')}
            />
            {formState.errors.baseAddress?.message && (
              <label className="label">
                <span className="label-text text-red-400">{formState.errors.baseAddress.message}</span>
              </label>
            )}
            {checksummedAddress && checksummedAddress !== baseAddress && (
              <p className="mt-1 break-all text-xs text-neutral-500">
                Will be sent to <span className="font-mono">{checksummedAddress}</span>
              </p>
            )}

            {needsContractAck && (
              <div className="alert alert-warning mt-3 text-sm">
                <div>
                  {contractCheckFailed ? (
                    <p>
                      We could not verify on Base whether this address is a <strong>smart contract</strong> (the RPC
                      read failed). Tokens sent to a contract that cannot hold ERC-20s are lost forever. Retry later, or
                      continue only if you are certain this is a wallet you control.
                    </p>
                  ) : (
                    <p>
                      This address is a <strong>smart contract</strong> on Base. Only continue if you are certain it can
                      hold and move ERC-20 tokens (e.g. a Safe) — otherwise the tokens will be stuck forever.
                    </p>
                  )}
                  <label className="mt-2 flex cursor-pointer items-center gap-2">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-sm"
                      checked={contractConfirmed}
                      onChange={(e) => setContractConfirmedFor(e.target.checked ? checksummedAddress : undefined)}
                    />
                    <span>
                      {contractCheckFailed
                        ? 'I am certain this address is a wallet I control on Base'
                        : 'I verified this contract can receive ERC-20 tokens'}
                    </span>
                  </label>
                </div>
              </div>
            )}

            <label className="mt-4 flex cursor-pointer items-center gap-2">
              <input type="checkbox" className="checkbox checkbox-sm" {...register('confirmIrreversible')} />
              <span className="text-sm">
                I understand this migration is <strong>irreversible</strong> and my {tokenSymbol} on Pendulum will be
                burned.
              </span>
            </label>
            {formState.errors.confirmIrreversible?.message && (
              <label className="label">
                <span className="label-text text-red-400">{formState.errors.confirmIrreversible.message}</span>
              </label>
            )}

            <p className="mt-3 text-xs text-neutral-500">
              Tip for large amounts: do a small test migration first and confirm it arrives on Base.
            </p>

            <Button
              className="mt-4 w-full"
              color="primary"
              type="submit"
              disabled={paused || submissionPending || checksPending}
              loading={submissionPending}
            >
              {submissionPending
                ? 'Waiting for finalization…'
                : checksPending
                  ? 'Verifying destination…'
                  : `Migrate ${tokenSymbol} to Base`}
            </Button>
          </form>
        )}
      </div>

      {pendingMigration && (
        <ReleaseStatusCard
          migration={pendingMigration}
          tenantName={tenantName}
          tokenSymbol={tokenSymbol}
          tokenDecimals={tokenDecimals ?? 12}
          onDone={() => setPendingMigration(undefined)}
        />
      )}
    </div>
  );
}

export default Migration;
