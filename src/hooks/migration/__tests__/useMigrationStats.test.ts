import { stringToU8a } from '@polkadot/util';
import { encodeAddress } from '@polkadot/util-crypto';
import { computeMigrationStats, treasuryAccountId } from '../useMigrationStats';

const PEN_NATIVE = 10n ** 12n;
const PEN = 10n ** 18n;

const pendulum = {
  blockNumber: 8_037_637,
  paused: false,
  totalIssuance: 149_933_029n * PEN_NATIVE,
  totalMigrated: 200n * PEN_NATIVE,
  nextNonce: 2,
  treasuryBalance: 33_532_116n * PEN_NATIVE,
};
const base = { blockNumber: 59_860_400n, paused: false, totalReleased: 200n * PEN, treasuryBalance: 100n * PEN };

describe('computeMigrationStats', () => {
  it('converts the 12-decimal Pendulum amounts to the 18 decimals of Base', () => {
    const stats = computeMigrationStats(pendulum, base, 12);
    expect(stats.onPendulum).toBe(149_933_029n * PEN);
    expect(stats.onBase).toBe(200n * PEN);
    expect(stats.treasuryOnPendulum).toBe(33_532_116n * PEN);
    expect(stats.treasuryOnBase).toBe(100n * PEN);
    expect(stats.migrations).toBe(2);
    expect([stats.pendulumBlock, stats.baseBlock]).toEqual([8_037_637, 59_860_400n]);
  });

  it('counts burned but not yet released PEN as in flight', () => {
    expect(computeMigrationStats(pendulum, base, 12).inFlight).toBe(0n);
    const burnedMore = { ...pendulum, totalMigrated: 350n * PEN_NATIVE };
    expect(computeMigrationStats(burnedMore, base, 12).inFlight).toBe(150n * PEN);
  });

  it('never shows a negative amount in flight', () => {
    const releasedMore = { ...base, totalReleased: 250n * PEN };
    expect(computeMigrationStats(pendulum, releasedMore, 12).inFlight).toBe(0n);
  });
});

describe('treasuryAccountId', () => {
  it('derives the Pendulum treasury account from its pallet id', () => {
    const palletId = stringToU8a('py/trsry');
    expect(encodeAddress(treasuryAccountId(palletId), 56)).toBe('6dZRnXfN7nnrAUDWykWc7gpHpByVBj9HTRpFNNQyENh11xjq');
  });
});
