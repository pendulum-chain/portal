import { isValidEip55Address } from '../helpers/ethereum';
import { TenantName } from '../models/Tenant';

export interface MigrationTargetConfig {
  /** Base JSON-RPC endpoint used for read-only status polling. */
  baseRpcUrl: string;
  /** MigrationVault contract address on Base. Without a valid one the migration page shows no form. */
  vaultAddress: string;
  /** Chain id the Base RPC must report (hex or decimal); the vault reads fail otherwise. */
  baseChainId: string;
  baseExplorerUrl: string;
}

/**
 * Base-side deployment targets for the PEN migration. The migration page shows
 * its form only when the vault address for the current tenant is a valid
 * address (set at deployment, PRD rollout phase 3/4).
 */
export const migrationTargets: Partial<Record<TenantName, MigrationTargetConfig>> = {
  [TenantName.Pendulum]: {
    baseRpcUrl: (import.meta.env.VITE_BASE_RPC_URL as string | undefined) ?? 'https://mainnet.base.org',
    vaultAddress: (import.meta.env.VITE_MIGRATION_VAULT_ADDRESS as string | undefined) ?? '',
    baseChainId: (import.meta.env.VITE_BASE_CHAIN_ID as string | undefined) || '0x2105',
    baseExplorerUrl: 'https://basescan.org',
  },
};

export function getMigrationTarget(tenantName: TenantName): MigrationTargetConfig | undefined {
  const target = migrationTargets[tenantName];
  return target?.vaultAddress ? target : undefined;
}

/** The target only when its vault address is a valid address: without one the migration is not open in this build. */
export function getConfiguredMigrationTarget(tenantName: TenantName): MigrationTargetConfig | undefined {
  const target = getMigrationTarget(tenantName);
  return target && isValidEip55Address(target.vaultAddress) ? target : undefined;
}
