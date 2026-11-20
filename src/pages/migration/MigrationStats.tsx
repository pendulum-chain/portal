import { MigrationTargetConfig } from '../../constants/migration';
import { toChecksumAddress } from '../../helpers/ethereum';
import { MigrationStats as Stats, useMigrationStats } from '../../hooks/migration/useMigrationStats';

const UNIT = 10n ** 18n;

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

function Figure({ title, units, symbol, desc }: { title: string; units: bigint; symbol: string; desc?: string }) {
  return (
    <div className="stat px-4 py-3">
      <div className="stat-title">{title}</div>
      <div className="stat-value whitespace-normal text-lg" title={exact(units, symbol)}>
        {whole(units)} {symbol}
      </div>
      {desc && <div className="stat-desc whitespace-normal">{desc}</div>}
    </div>
  );
}

const ZERO_ADDRESS = /^0x0{40}$/;

/** A contract on Base, linked to the explorer so anyone can check the figures themselves. */
function ContractLink({ label, address, href }: { label: string; address: string; href: string }) {
  const checksummed = toChecksumAddress(address);
  return (
    <li>
      {label}:{' '}
      <a className="link break-all font-mono" href={href} target="_blank" rel="nofollow noreferrer">
        {checksummed}
      </a>
    </li>
  );
}

/** Totals of the migration on both chains; no individual migrations are shown. */
export function MigrationStats({ target, tokenSymbol }: { target: MigrationTargetConfig; tokenSymbol: string }) {
  const { data: stats, isError } = useMigrationStats(target);
  const badge = stats && status(stats);

  return (
    <div className="card mb-4 bg-base-200 p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-lg font-bold">{tokenSymbol} migration</h2>
        {badge && <span className={`badge ${badge.className}`}>{badge.label}</span>}
      </div>

      {isError && !stats ? (
        <p className="mt-2 text-sm">The migration figures could not be read right now. Please try again later.</p>
      ) : !stats ? (
        <p className="mt-2 text-sm">Loading the migration figures…</p>
      ) : (
        <>
          <p className="mt-3 text-sm">
            Migrated to Base:{' '}
            <strong title={exact(stats.onBase, tokenSymbol)}>
              {whole(stats.onBase)} {tokenSymbol}
            </strong>
            , {shareOnBase(stats)} % of all {tokenSymbol}
          </p>
          <progress
            className="progress progress-primary mt-1 w-full"
            value={Number(stats.onBase / UNIT)}
            max={Number((stats.onPendulum + stats.onBase) / UNIT) || 1}
            aria-label={`Share of ${tokenSymbol} migrated to Base`}
          />

          <div className="stats stats-vertical mt-3 w-full bg-base-300 sm:stats-horizontal">
            <Figure title="On Pendulum" units={stats.onPendulum} symbol={tokenSymbol} desc="including the treasury" />
            <Figure title="On Base" units={stats.onBase} symbol={tokenSymbol} desc="including the treasury" />
            <Figure
              title="Treasury"
              units={stats.treasuryOnPendulum + stats.treasuryOnBase}
              symbol={tokenSymbol}
              desc={`${whole(stats.treasuryOnPendulum)} on Pendulum, ${whole(stats.treasuryOnBase)} on Base`}
            />
          </div>

          <p className="mt-3 text-sm">
            In flight to Base: {whole(stats.inFlight)} {tokenSymbol} · Migrations so far: {stats.migrations}
          </p>
          <div className="mt-3 text-xs">
            <span className="font-semibold">Contracts on Base</span>
            <ul className="mt-1 space-y-1">
              {!ZERO_ADDRESS.test(stats.tokenAddress) && (
                <ContractLink
                  label={`${tokenSymbol} token`}
                  address={stats.tokenAddress}
                  href={`${target.baseExplorerUrl}/token/${toChecksumAddress(stats.tokenAddress)}`}
                />
              )}
              <ContractLink
                label="Migration vault"
                address={target.vaultAddress}
                href={`${target.baseExplorerUrl}/address/${toChecksumAddress(target.vaultAddress)}`}
              />
              {stats.treasuryAddress && (
                <ContractLink
                  label="Treasury (governance timelock)"
                  address={stats.treasuryAddress}
                  href={`${target.baseExplorerUrl}/address/${toChecksumAddress(stats.treasuryAddress)}`}
                />
              )}
            </ul>
          </div>
          <p className="mt-3 text-xs text-neutral-500">
            As of Pendulum block {stats.pendulumBlock.toLocaleString()} (finalized) and Base block{' '}
            {stats.baseBlock.toLocaleString()}. Updated every minute.
          </p>
        </>
      )}
    </div>
  );
}
