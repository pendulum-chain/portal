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
import { useBaseReleaseStatus } from '../../hooks/migration/useBaseReleaseStatus';
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
              href={`${target.baseExplorerUrl}/address/${checksummedRecipient}`}
              target="_blank"
              rel="nofollow noreferrer"
            >
              view on BaseScan
            </a>
          </span>
        ) : (
          <span>
            Waiting for attestor approvals ({status ? `${Math.min(status.approvals, status.threshold)}/${status.threshold}` : '…'})
            — this normally completes within a few minutes of finality.
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
  const [contractConfirmed, setContractConfirmed] = useState(false);
  const [capConfirmed, setCapConfirmed] = useState(false);

  const target = getMigrationTarget(tenantName);
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

  const { data: destinationIsContract } = useQuery(
    ['migration', 'isContract', checksummedAddress],
    () => isContractOnBase(target!.baseRpcUrl, checksummedAddress!),
    { enabled: Boolean(target && checksummedAddress), staleTime: 60_000 },
  );

  // The vault's per-release cap, in whole PEN. A migration above it is burned
  // but its release on Base is deferred until governance raises the cap, so we
  // warn and ask the user to split the amount (round-7 review observation C).
  const { data: perReleaseCapPen } = useQuery(
    ['migration', 'perReleaseCap', target?.vaultAddress],
    () => getPerReleaseCap(target!.baseRpcUrl, target!.vaultAddress).then((cap) => Number(cap / 10n ** 12n) / 1e6),
    { enabled: Boolean(target), staleTime: 60_000 },
  );
  const amountValue = Number(watch('amount'));
  const exceedsPerReleaseCap =
    perReleaseCapPen !== undefined &&
    perReleaseCapPen > 0 &&
    Number.isFinite(amountValue) &&
    amountValue > perReleaseCapPen;

  if (tenantName !== TenantName.Pendulum) {
    return (
      <div className="card mx-auto mt-8 w-full max-w-xl bg-base-200 p-6">
        <h1 className="text-2xl font-bold">Migrate to Base</h1>
        <p className="mt-2">The PEN token migration is only available on the Pendulum network.</p>
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
    if (destinationIsContract && !contractConfirmed) {
      showToast(ToastMessage.WARNING, 'Please confirm the smart-contract destination first.');
      return;
    }
    if (exceedsPerReleaseCap && !capConfirmed) {
      showToast(ToastMessage.WARNING, 'Please confirm you understand the release above the cap will be delayed.');
      return;
    }
    setSubmissionPending(true);
    try {
      const amountNative = decimalToNative(values.amount, tokenDecimals).toString();
      const migration = await submitMigration(amountNative, toChecksumAddress(values.baseAddress), walletAccount);
      setPendingMigration(migration);
      reset();
      setContractConfirmed(false);
      setCapConfirmed(false);
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
          Lock in your migration: the amount is burned on Pendulum and released 1:1 to your address on Base by a 3-of-5
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
            <Amount
              control={control}
              name="amount"
              setValue={(n) => setValue('amount', n, { shouldValidate: true })}
              max={balances.transferable}
              error={formState.errors.amount?.message}
              assetSuffix={tokenSymbol}
              hideHalfButton
            />
            {lockedBalance > 0.0001 && (
              <p className="mt-1 text-xs text-neutral-500">
                {lockedBalance.toFixed(4)} {tokenSymbol} of your balance is locked (staking, vesting or governance).
                Unlock it first to migrate it — note the unstaking delay applies.
              </p>
            )}

            {exceedsPerReleaseCap && (
              <div className="alert alert-warning mt-3 text-sm">
                <div>
                  <p>
                    This is above the vault&rsquo;s <strong>per-release cap</strong> of{' '}
                    {perReleaseCapPen?.toLocaleString()} {tokenSymbol}. Your {tokenSymbol} would still be burned on
                    Pendulum, but the release on Base is <strong>held</strong> until governance raises the cap, which can
                    take a while. To receive your tokens without that delay, migrate in amounts of at most{' '}
                    {perReleaseCapPen?.toLocaleString()} {tokenSymbol} each.
                  </p>
                  <label className="mt-2 flex cursor-pointer items-center gap-2">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-sm"
                      checked={capConfirmed}
                      onChange={(e) => setCapConfirmed(e.target.checked)}
                    />
                    <span>I understand this release will be delayed until governance raises the cap</span>
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

            {destinationIsContract && (
              <div className="alert alert-warning mt-3 text-sm">
                <div>
                  <p>
                    This address is a <strong>smart contract</strong> on Base. Only continue if you are certain it can
                    hold and move ERC-20 tokens (e.g. a Safe) — otherwise the tokens will be stuck forever.
                  </p>
                  <label className="mt-2 flex cursor-pointer items-center gap-2">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-sm"
                      checked={contractConfirmed}
                      onChange={(e) => setContractConfirmed(e.target.checked)}
                    />
                    <span>I verified this contract can receive ERC-20 tokens</span>
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
              disabled={paused || submissionPending}
              loading={submissionPending}
            >
              {submissionPending ? 'Waiting for finalization…' : `Migrate ${tokenSymbol} to Base`}
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
