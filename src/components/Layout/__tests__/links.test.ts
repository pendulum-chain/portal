import { TenantName } from '../../../models/Tenant';
import { createLinks } from '../links';

let mockVaultConfigured = false;

jest.mock('../../../constants/migration', () => ({
  getConfiguredMigrationTarget: () => (mockVaultConfigured ? {} : undefined),
}));
jest.mock('../../../app', () => ({
  PAGES_PATHS: {
    BRIDGE: 'bridge',
    DASHBOARD: 'dashboard',
    MIGRATION: 'migration',
    NABLA_BACKSTOP_POOLS: 'nabla/backstop-pools',
    NABLA_SWAP: 'nabla/swap',
    NABLA_SWAP_POOLS: 'nabla/swap-pools',
    STAKING: 'staking',
    TRANSACTIONS: 'transactions',
  },
  PATHS: { FUND_WALLET: 'fund-wallet', NABLA: 'nabla', SPACEWALK: 'spacewalk' },
}));
jest.mock('../../../config', () => ({ config: { faucetPage: '' } }));
jest.mock('../../../config/apps/nabla', () => ({ nablaConfig: { tenants: [] } }));
jest.mock('../spacewalkAnimation', () => ({
  getSpacewalkInterpolation: () => null,
  getSpacewalkText: () => 'Spacewalk',
}));

const migrationEntry = (tenant: TenantName) => createLinks(tenant).find((item) => item.title === 'Migrate to Base');

describe('migration navigation entry', () => {
  it('stays hidden while the build has no migration vault address', () => {
    mockVaultConfigured = false;
    expect(migrationEntry(TenantName.Pendulum)?.hidden).toBe(true);
  });

  it('shows on Pendulum once the vault address is configured', () => {
    mockVaultConfigured = true;
    expect(migrationEntry(TenantName.Pendulum)?.hidden).toBe(false);
  });

  it('stays hidden on other networks', () => {
    mockVaultConfigured = true;
    expect(migrationEntry(TenantName.Amplitude)?.hidden).toBe(true);
  });
});
