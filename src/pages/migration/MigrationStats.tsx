import { ReactNode } from 'react';
import { ExternalIcon } from '../../assets/ExternalIcon';
import { MigrationTargetConfig } from '../../constants/migration';
import { toChecksumAddress } from '../../helpers/ethereum';
import { MigrationStats as Stats, useMigrationStats } from '../../hooks/migration/useMigrationStats';

const UNIT = 10n ** 18n;
const ZERO_ADDRESS = /^0x0{40}$/;

/** Whole tokens, e.g. "149,933,029". */
function whole(units: bigint) {
  return Number(units / UNIT).toLocaleString(undefined, { maximumFractionDigits: 0 });
}

/** The exact amount, shown on hover. */
function exact(units: bigint, symbol: string) {
  const fraction = (units % UNIT).toString().padStart(18, '0').replace(/0+$/, '');
  return `${(units / UNIT).toLocaleString()}${fraction ? `.${fraction}` : ''} ${symbol}`;
}

/** Share of all PEN that is on Base: tiny shares keep two significant digits. */
function shareOnBase(stats: Stats) {
  const total = stats.onPendulum + stats.onBase;
  const percent = total === 0n ? 0 : Number((stats.onBase * 10n ** 12n) / total) / 1e10;
  return percent === 0 || percent >= 0.01 ? percent.toFixed(2) : percent.toPrecision(2);
}

function status(stats: Stats) {
  if (stats.pendulumPaused) return { label: 'Paused on Pendulum', className: 'badge-warning' };
  if (stats.basePaused) return { label: 'Releases paused on Base', className: 'badge-warning' };
  return { label: 'Open', className: 'badge-success' };
}

function Row({ label, children, title }: { label: string; children: ReactNode; title?: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-1.5">
      <dt className="text-neutral-500">{label}</dt>
      <dd className="font-semibold tabular-nums" title={title}>
        {children}
      </dd>
    </div>
  );
}

function ExplorerLink({ label, href }: { label: string; href: string }) {
  return (
    <a
      className="btn btn-ghost btn-xs gap-1 border border-base-300 font-normal normal-case"
      href={href}
      target="_blank"
      rel="nofollow noreferrer"
    >
      {label}
      <ExternalIcon className="h-3 w-3" fill="currentColor" />
    </a>
  );
}

/**
 * Totals of the migration on both chains, for the side of the migration page;
 * no individual migrations are shown. `capacity` is rendered below the totals.
 */
export function MigrationStats({
  target,
  tokenSymbol,
  capacity,
}: {
  target: MigrationTargetConfig;
  tokenSymbol: string;
  capacity?: ReactNode;
}) {
  const { data: stats, isError } = useMigrationStats(target);
  const badge = stats && status(stats);
  const explorer = (kind: 'address' | 'token', address: string) =>
    `${target.baseExplorerUrl}/${kind}/${toChecksumAddress(address)}`;

  return (
    <div className="card bg-base-200 p-5">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">Migration overview</h2>
        {badge && <span className={`badge badge-sm ${badge.className}`}>{badge.label}</span>}
      </div>

      {isError && !stats ? (
        <p className="mt-3 text-sm">The migration figures could not be read right now. Please try again later.</p>
      ) : !stats ? (
        <p className="mt-3 text-sm">Loading the migration figures…</p>
      ) : (
        <>
          <div className="mt-3">
            <div className="text-3xl font-bold tabular-nums" title={exact(stats.onBase, tokenSymbol)}>
              {whole(stats.onBase)} <span className="text-base font-semibold">{tokenSymbol}</span>
            </div>
            <p className="text-sm text-neutral-500">
              migrated to Base, {shareOnBase(stats)} % of all {tokenSymbol}
            </p>
            <progress
              className="progress progress-primary mt-2 h-1.5 w-full"
              value={Number(stats.onBase / UNIT)}
              max={Number((stats.onPendulum + stats.onBase) / UNIT) || 1}
              aria-label={`Share of ${tokenSymbol} migrated to Base`}
            />
          </div>

          <dl className="mt-3 divide-y divide-base-300 text-sm">
            <Row label="On Pendulum" title={exact(stats.onPendulum, tokenSymbol)}>
              {whole(stats.onPendulum)}
            </Row>
            <Row label="On Base" title={exact(stats.onBase, tokenSymbol)}>
              {whole(stats.onBase)}
            </Row>
            <div className="py-1.5">
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-neutral-500">Treasury</dt>
                <dd
                  className="font-semibold tabular-nums"
                  title={exact(stats.treasuryOnPendulum + stats.treasuryOnBase, tokenSymbol)}
                >
                  {whole(stats.treasuryOnPendulum + stats.treasuryOnBase)}
                </dd>
              </div>
              <dd className="text-right text-xs text-neutral-500">
                {whole(stats.treasuryOnPendulum)} on Pendulum, {whole(stats.treasuryOnBase)} on Base
              </dd>
            </div>
            <Row label="In flight to Base">{whole(stats.inFlight)}</Row>
            <Row label="Migrations so far">{stats.migrations}</Row>
          </dl>
          <p className="mt-1 text-xs text-neutral-500">Amounts in {tokenSymbol}; both chains include the treasury.</p>
        </>
      )}

      {capacity}

      {stats && (
        <>
          <div className="mt-4 flex flex-wrap gap-2">
            {!ZERO_ADDRESS.test(stats.tokenAddress) && (
              <ExplorerLink label={`${tokenSymbol} token`} href={explorer('token', stats.tokenAddress)} />
            )}
            <ExplorerLink label="Migration vault" href={explorer('address', target.vaultAddress)} />
            {stats.treasuryAddress && (
              <ExplorerLink label="Treasury" href={explorer('address', stats.treasuryAddress)} />
            )}
          </div>
          <p className="mt-3 text-xs text-neutral-500">
            Pendulum block {stats.pendulumBlock.toLocaleString()} (finalized), Base block{' '}
            {stats.baseBlock.toLocaleString()}. Updated every minute.
          </p>
        </>
      )}
    </div>
  );
}
