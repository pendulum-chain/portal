import { useQuery } from '@tanstack/react-query';
import { MigrationTargetConfig } from '../../constants/migration';
import {
  getActiveApprovals,
  getApprovalThreshold,
  isNonceConsumed,
  migrationPayloadHash,
} from '../../helpers/ethereum';
import { PendingMigration } from './useMigrationPallet';

export interface BaseReleaseStatus {
  released: boolean;
  approvals: number;
  threshold: number;
}

/**
 * Polls the MigrationVault on Base for the release status of a finalized
 * migration: how many active attestor approvals the exact
 * (nonce, recipient, amount) tuple has, and whether the nonce was consumed
 * (= tokens released). Polling stops once released.
 */
export function useBaseReleaseStatus(migration: PendingMigration | undefined, target: MigrationTargetConfig | undefined) {
  return useQuery<BaseReleaseStatus>(
    ['migration', 'baseStatus', migration?.nonce.toString()],
    async () => {
      if (!migration || !target) throw new Error('not enabled');
      const payload = migrationPayloadHash(migration.nonce, migration.recipient, migration.palletAmount);
      const [released, approvals, threshold] = await Promise.all([
        isNonceConsumed(target.baseRpcUrl, target.vaultAddress, migration.nonce),
        getActiveApprovals(target.baseRpcUrl, target.vaultAddress, payload),
        getApprovalThreshold(target.baseRpcUrl, target.vaultAddress),
      ]);
      return { released, approvals, threshold };
    },
    {
      enabled: Boolean(migration && target),
      refetchInterval: (data) => (data?.released ? false : 10_000),
      retry: 3,
    },
  );
}
