import { TenantName } from '../models/Tenant';

export interface MigrationTargetConfig {
  /** Base JSON-RPC endpoint used for read-only status polling. */
  baseRpcUrl: string;
  /** MigrationVault contract address on Base. Empty until deployment. */
  vaultAddress: string;
  baseExplorerUrl: string;
}

/**
 * Base-side deployment targets for the PEN migration. The migration page only
 * shows Base release tracking when the vault address for the current tenant
 * is configured (set at deployment, PRD rollout phase 3/4).
 */
export const migrationTargets: Partial<Record<TenantName, MigrationTargetConfig>> = {
  [TenantName.Pendulum]: {
    baseRpcUrl: (import.meta.env.VITE_BASE_RPC_URL as string | undefined) ?? 'https://mainnet.base.org',
    vaultAddress: (import.meta.env.VITE_MIGRATION_VAULT_ADDRESS as string | undefined) ?? '',
    baseExplorerUrl: 'https://basescan.org',
  },
};

export function getMigrationTarget(tenantName: TenantName): MigrationTargetConfig | undefined {
  const target = migrationTargets[tenantName];
  return target?.vaultAddress ? target : undefined;
}
