import { yupResolver } from '@hookform/resolvers/yup';
import { u8aToHex } from '@polkadot/util';
import { useMemo, useState } from 'react';
import { Button } from 'react-daisyui';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';

import { useGlobalState } from '../../GlobalStateProvider';
import { useNodeInfoState } from '../../NodeInfoProvider';
import Amount from '../../components/Form/Amount';
import { getMigrationTarget } from '../../constants/migration';
import {
  VaultState,
  getVaultState,
  isContractOnBase,
  isValidEip55Address,
  toChecksumAddress,
} from '../../helpers/ethereum';
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

// In whole PEN (18-decimal token units).
const toPen = (units: bigint) => Number(units / 10n ** 12n) / 1e6;
const formatPen = (pen: number) => pen.toLocaleString(undefined, { maximumFractionDigits: 2 });

/**
 * How much the vault can release. A release must fit the per-release cap and
 * the rolling daily allowance, which refills linearly at the daily cap per day.
 * A release that does not fit is queued until the allowance has refilled or,
 * above the per-release cap, until that cap is raised.
 */
function ReleaseCapacityPanel({
  vaultState,
  readFailed,
  blocked,
  amount,
  tokenSymbol,
}: {
  vaultState: VaultState | undefined;
  readFailed: boolean;
  blocked: boolean;
  amount: number;
  tokenSymbol: string;
}) {
  const box = 'mt-4 rounded-lg bg-base-300 p-3 text-sm';
  if (readFailed) return <div className={box}>Release capacity on Base: could not be read.</div>;
  if (!vaultState) return <div className={box}>Release capacity on Base: loading…</div>;

  const dailyCap = toPen(vaultState.dailyCap);
  const available = toPen(vaultState.availableDailyAllowance);
  const perReleaseCap = toPen(vaultState.perReleaseCap);
  const refillPerHour = dailyCap / 24;
  const waitMinutes = Math.ceil(((amount - available) / refillPerHour) * 60);
  const wait =
    waitMinutes <= 60 ? `${waitMinutes} minute${waitMinutes === 1 ? '' : 's'}` : `${Math.ceil(waitMinutes / 60)} hours`;
  const hint =
    !(amount > 0) || blocked
      ? undefined
      : amount > perReleaseCap
        ? 'is above the per-release cap. The release would be held until that cap is raised; waiting does not release it.'
        : amount > toPen(vaultState.balance)
          ? 'is more than the vault holds. The release would be held until the vault is refilled.'
          : amount <= available
            ? 'fits the capacity available now.'
            : `waits for the daily allowance: roughly ${wait} at the current refill rate, if nothing else is queued.`;

  return (
    <div className={box}>
      <div className="flex flex-wrap justify-between gap-x-4">
        <span className="font-semibold">Release capacity on Base</span>
        <span>
          {formatPen(available)} of {formatPen(dailyCap)} {tokenSymbol} available now
        </span>
      </div>
      <progress
        className="progress progress-primary mt-2 w-full"
        value={available}
        max={dailyCap || 1}
        aria-label="Daily release allowance available now"
      />
      <dl className="mt-1 grid grid-cols-[auto_1fr] gap-x-4 text-neutral-500">
        <dt>Daily cap</dt>
        <dd>
          {formatPen(dailyCap)} {tokenSymbol}, refills at {formatPen(refillPerHour)} {tokenSymbol} per hour
        </dd>
        <dt>Per-release cap</dt>
        <dd>
          {formatPen(perReleaseCap)} {tokenSymbol}
        </dd>
        <dt>Queued for release</dt>
        <dd>
          {formatPen(toPen(vaultState.pendingApprovedAmount))} {tokenSymbol}
        </dd>
      </dl>
      {hint && (
        <p className="mt-2">
          {formatPen(amount)} {tokenSymbol} {hint}
        </p>
      )}
    </div>
  );
}

function getVaultBlocker(vaultState: VaultState | undefined, readFailed: boolean): string | undefined {
  return readFailed
    ? 'We could not read the state of the migration vault from Base, so we cannot tell whether releases are possible right now. Submissions are disabled until the read succeeds; please try again later.'
    : vaultState?.paused
      ? 'Releases on Base are currently paused. Submissions are disabled until they resume.'
      : vaultState && !vaultState.tokenSet
        ? 'The migration vault on Base is not set up yet. Submissions are disabled until it is.'
        : vaultState?.perReleaseCap === 0n
          ? 'Releases on Base are currently suspended. Submissions are disabled until they resume.'
          : undefined;
}

function Migration() {
  const { walletAccount, tenantName } = useGlobalState();
  const { api, tokenSymbol = 'PEN', tokenDecimals } = useNodeInfoState().state;
  const { palletAvailable, constants, paused, submitMigration } = useMigrationPallet();
  const { balances } = useAccountBalance(walletAccount?.address);

  const [submissionPending, setSubmissionPending] = useState(false);
  const [pendingMigration, setPendingMigration] = useState<PendingMigration | undefined>(undefined);
  // Each acknowledgement is stored together with what it was given for, so
  // editing the address or the amount, or a new reason for the delay warning,
  // silently retires it.
  const [contractConfirmedFor, setContractConfirmedFor] = useState<string | undefined>(undefined);
  const [capConfirmedFor, setCapConfirmedFor] = useState<string | undefined>(undefined);

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

  // The vault's state on Base. The burn on Pendulum goes through whatever it
  // is, but while the vault is paused, has no token or a per-release cap of 0
  // every release is deferred, so submission is refused; a failed read counts
  // as not ready. Above the per-release cap or the vault's balance only this
  // release is held, so we warn and ask for an explicit acknowledgement.
  const vaultQuery = useQuery(
    ['migration', 'vaultState', target?.vaultAddress],
    () => getVaultState(target!.baseRpcUrl, target!.vaultAddress, target!.baseChainId),
    { enabled: Boolean(target), staleTime: 60_000, refetchInterval: 60_000 },
  );
  const vaultState = vaultQuery.data;
  const vaultCheckPending = Boolean(target) && vaultState === undefined && !vaultQuery.isError;
  const vaultBlocker = getVaultBlocker(vaultState, vaultQuery.isError);
  const perReleaseCapPen = vaultState && toPen(vaultState.perReleaseCap);
  const vaultBalancePen = vaultState && toPen(vaultState.balance);
  const amountValue = Number(watch('amount'));
  const exceedsPerReleaseCap =
    perReleaseCapPen !== undefined && Number.isFinite(amountValue) && amountValue > perReleaseCapPen;
  const exceedsVaultBalance =
    vaultBalancePen !== undefined && Number.isFinite(amountValue) && amountValue > vaultBalancePen;
  // A blocked vault already refuses submission; a delay to acknowledge would contradict that.
  const needsCapAck = !vaultBlocker && (exceedsPerReleaseCap || exceedsVaultBalance);
  const capAckKey = `${amountValue}:${exceedsPerReleaseCap}:${exceedsVaultBalance}`;
  const capConfirmed = capConfirmedFor === capAckKey;
  const checksPending = contractCheckPending || vaultCheckPending;

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

  // The raw method data of tokenMigration.migrate starts with this.
  const migrateCallPrefix = u8aToHex(api.tx.tokenMigration.migrate.callIndex);

  const onSubmit = async (values: MigrationFormValues) => {
    if (!walletAccount) {
      showToast(ToastMessage.NO_WALLET_SELECTED);
      return;
    }
    if (vaultBlocker) {
      showToast(ToastMessage.WARNING, vaultBlocker);
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
      // The state shown can be a minute old; re-read it so a pause since then still stops the burn.
      const fresh = await vaultQuery.refetch();
      const freshBlocker = getVaultBlocker(fresh.data, fresh.isError);
      if (freshBlocker) {
        showToast(ToastMessage.WARNING, freshBlocker);
        return;
      }
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

        <ReleaseCapacityPanel
          vaultState={vaultState}
          readFailed={vaultQuery.isError}
          blocked={Boolean(vaultBlocker)}
          amount={amountValue}
          tokenSymbol={tokenSymbol}
        />

        {paused && (
          <div className="alert alert-warning mt-4 text-sm">
            Migrations are currently paused. Submissions are disabled until they resume.
          </div>
        )}

        {vaultBlocker && <div className="alert alert-warning mt-4 text-sm">{vaultBlocker}</div>}

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
                  {exceedsPerReleaseCap && (
                    <p>
                      This is above the vault&rsquo;s <strong>per-release cap</strong> of{' '}
                      {perReleaseCapPen?.toLocaleString()} {tokenSymbol}. Your {tokenSymbol} would still be burned on
                      Pendulum, but the release on Base is <strong>held</strong> until governance raises the cap, which
                      can take a while. To receive your tokens without that delay, migrate in amounts of at most{' '}
                      {perReleaseCapPen?.toLocaleString()} {tokenSymbol} each.
                    </p>
                  )}
                  {exceedsVaultBalance && (
                    <p>
                      This is more than the migration vault on Base currently holds ({vaultBalancePen?.toLocaleString()}{' '}
                      {tokenSymbol}). Your {tokenSymbol} would still be burned on Pendulum, but the release on Base is{' '}
                      <strong>held</strong> until the vault is refilled.
                    </p>
                  )}
                  <label className="mt-2 flex cursor-pointer items-center gap-2">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-sm"
                      checked={capConfirmed}
                      onChange={(e) => setCapConfirmedFor(e.target.checked ? capAckKey : undefined)}
                    />
                    <span>I understand this release may be delayed</span>
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

            {/* The wallet prompt is the one place the destination can be
                checked independently of this page, so point the user to it
                and have them compare it with their own Base wallet. The call
                index pins raw data to tokenMigration.migrate, whose last
                argument is the address. */}
            {checksummedAddress && (
              <div className="alert mt-4 text-sm">
                <div className="min-w-0">
                  <p>
                    The burned {tokenSymbol} will be released on Base to{' '}
                    <span className="break-all font-mono font-semibold">{checksummedAddress}</span>
                  </p>
                  <p className="mt-2">
                    Your wallet will ask you to sign <span className="font-mono">tokenMigration.migrate</span>. Before
                    you approve, open the call details and check that <span className="font-mono">base_address</span> is
                    your own Base address as shown in your Base wallet, not only on this page, all 40 characters
                    (wallets usually show it in lower case). If your wallet shows only raw method data, it must start
                    with <span className="font-mono">{migrateCallPrefix}</span> and end with your Base address in lower
                    case without the 0x (for the address above:{' '}
                    <span className="break-all font-mono">{checksummedAddress.slice(2).toLowerCase()}</span>). Do not
                    approve if your wallet shows anything else, and check again for every migration.
                  </p>
                </div>
              </div>
            )}

            <p className="mt-3 text-xs text-neutral-500">
              Tip for large amounts: do a small test migration first and confirm it arrives on Base.
            </p>

            <Button
              className="mt-4 w-full"
              color="primary"
              type="submit"
              disabled={paused || Boolean(vaultBlocker) || submissionPending || checksPending}
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
