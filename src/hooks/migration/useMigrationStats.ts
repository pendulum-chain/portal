import { ApiPromise } from '@polkadot/api';
import { stringToU8a, u8aConcat } from '@polkadot/util';
import { useQuery } from '@tanstack/react-query';
import { useNodeInfoState } from '../../NodeInfoProvider';
import { MigrationTargetConfig } from '../../constants/migration';
import { BaseMigrationSnapshot, getBaseMigrationSnapshot } from '../../helpers/ethereum';

/** The pallet's totals, all read at one finalized Pendulum block, in native (12-decimal) units. */
export interface PendulumMigrationSnapshot {
  blockNumber: number;
  paused: boolean;
  totalIssuance: bigint;
  totalMigrated: bigint;
  nextNonce: number;
  treasuryBalance: bigint;
}

/** Overview figures, every amount in 18-decimal token units so they can be added up. */
export interface MigrationStats {
  onPendulum: bigint;
  onBase: bigint;
  /** Burned on Pendulum but not released on Base yet. */
  inFlight: bigint;
  treasuryOnPendulum: bigint;
  treasuryOnBase: bigint;
  migrations: number;
  pendulumPaused: boolean;
  basePaused: boolean;
  pendulumBlock: number;
  baseBlock: bigint;
}

/** The treasury's account: "modl" + its 8-byte pallet id, zero-padded to 32 bytes. */
export function treasuryAccountId(palletId: Uint8Array): Uint8Array {
  return u8aConcat(stringToU8a('modl'), palletId, new Uint8Array(32)).subarray(0, 32);
}

export function computeMigrationStats(
  pendulum: PendulumMigrationSnapshot,
  base: BaseMigrationSnapshot,
  pendulumDecimals: number,
): MigrationStats {
  const toBaseUnits = (native: bigint) => native * 10n ** BigInt(18 - pendulumDecimals);
  const migrated = toBaseUnits(pendulum.totalMigrated);
  return {
    onPendulum: toBaseUnits(pendulum.totalIssuance),
    onBase: base.totalReleased,
    inFlight: migrated > base.totalReleased ? migrated - base.totalReleased : 0n,
    treasuryOnPendulum: toBaseUnits(pendulum.treasuryBalance),
    treasuryOnBase: base.treasuryBalance,
    migrations: pendulum.nextNonce,
    pendulumPaused: pendulum.paused,
    basePaused: base.paused,
    pendulumBlock: pendulum.blockNumber,
    baseBlock: base.blockNumber,
  };
}

async function getPendulumSnapshot(api: ApiPromise): Promise<PendulumMigrationSnapshot> {
  const hash = await api.rpc.chain.getFinalizedHead();
  const [header, at] = await Promise.all([api.rpc.chain.getHeader(hash), api.at(hash)]);
  const treasury = treasuryAccountId(api.consts.treasury.palletId.toU8a());
  const [totalIssuance, totalMigrated, nextNonce, paused, account] = await Promise.all([
    at.query.balances.totalIssuance(),
    at.query.tokenMigration.totalMigrated(),
    at.query.tokenMigration.nextNonce(),
    at.query.tokenMigration.paused(),
    at.query.system.account(treasury),
  ]);
  return {
    blockNumber: header.number.toNumber(),
    paused: paused.toPrimitive() === true,
    totalIssuance: BigInt(totalIssuance.toString()),
    totalMigrated: BigInt(totalMigrated.toString()),
    nextNonce: Number(nextNonce.toString()),
    treasuryBalance: BigInt(account.data.free.toString()),
  };
}

/**
 * Totals of the migration on both chains, refreshed every minute. Base is read
 * before Pendulum: a release only follows a finalized burn, so this order
 * never shows more released than burned.
 */
export function useMigrationStats(target: MigrationTargetConfig | undefined) {
  const { api } = useNodeInfoState().state;
  return useQuery<MigrationStats>(
    ['migration', 'stats', target?.vaultAddress],
    async () => {
      if (!api || !target) throw new Error('not enabled');
      // Set once by the council and never changed, so it needs no snapshot.
      const destination = (await api.query.tokenMigration.treasuryDestination()).toJSON() as string | null;
      const base = await getBaseMigrationSnapshot(
        target.baseRpcUrl,
        target.vaultAddress,
        destination ?? undefined,
        target.baseChainId,
      );
      const pendulum = await getPendulumSnapshot(api);
      return computeMigrationStats(pendulum, base, api.registry.chainDecimals[0]);
    },
    { enabled: Boolean(api && target), staleTime: 30_000, refetchInterval: 60_000, retry: 2 },
  );
}
