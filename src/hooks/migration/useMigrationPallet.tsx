import { ApiPromise } from '@polkadot/api';
import { WalletAccount } from '@talismn/connect-wallets';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';
import { useNodeInfoState } from '../../NodeInfoProvider';
import { getErrors } from '../../helpers/substrate';
import { nativeToDecimal } from '../../shared/parseNumbers/metric';

export interface PendingMigration {
  nonce: bigint;
  recipient: string;
  /** Burned amount in native (pallet) units, i.e. 12 decimals. */
  palletAmount: bigint;
}

interface MigrationPalletConstants {
  /** Minimum migratable amount, in token units (decimal). */
  minimumMigrationAmount: number;
  /** Existential deposit, in token units (decimal). */
  existentialDeposit: number;
}

function extractMigrationInitiated(api: ApiPromise, events: { event: unknown }[]): PendingMigration | undefined {
  for (const record of events) {
    const event = record.event as { section: string; method: string; data: unknown[] };
    if (event.section === 'tokenMigration' && event.method === 'MigrationInitiated') {
      const [nonce, , baseAddress, amount] = event.data as [
        { toString(): string },
        unknown,
        { toHex(): string },
        { toString(): string },
      ];
      return {
        nonce: BigInt(nonce.toString()),
        recipient: baseAddress.toHex(),
        palletAmount: BigInt(amount.toString().replaceAll(',', '')),
      };
    }
  }
  return undefined;
}

export function useMigrationPallet() {
  const { api, tokenDecimals } = useNodeInfoState().state;

  const palletAvailable = Boolean(api && api.tx.tokenMigration?.migrate);

  const constants = useMemo<MigrationPalletConstants | undefined>(() => {
    if (!api || !palletAvailable) return undefined;
    return {
      minimumMigrationAmount: nativeToDecimal(
        api.consts.tokenMigration.minimumMigrationAmount.toString(),
        tokenDecimals,
      ).toNumber(),
      existentialDeposit: nativeToDecimal(api.consts.balances.existentialDeposit.toString(), tokenDecimals).toNumber(),
    };
  }, [api, palletAvailable, tokenDecimals]);

  const pausedQuery = useQuery<boolean>(
    ['tokenMigration', 'paused'],
    async () => {
      if (!api) return false;
      const paused = await api.query.tokenMigration.paused();
      return paused.toPrimitive() === true;
    },
    { enabled: Boolean(api && palletAvailable), refetchInterval: 30_000 },
  );

  /**
   * Signs and submits `tokenMigration.migrate(amount, baseAddress)`, resolving
   * once the transaction is FINALIZED with the emitted migration identifiers
   * needed to track the release on Base.
   */
  const submitMigration = useCallback(
    (amountNative: string, baseAddress: string, walletAccount: WalletAccount): Promise<PendingMigration> => {
      if (!api) return Promise.reject(new Error('API not ready'));
      const extrinsic = api.tx.tokenMigration.migrate(amountNative, baseAddress);

      return new Promise<PendingMigration>((resolve, reject) =>
        extrinsic
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .signAndSend(walletAccount.address, { signer: walletAccount.signer as any }, (result) => {
            const { status, events } = result;
            const errors = getErrors(events, api);

            if (status.isInBlock && errors.length > 0) {
              reject(new Error(`Transaction failed: ${errors.join('\n')}`));
            } else if (status.isFinalized) {
              if (errors.length > 0) {
                reject(new Error(`Transaction failed: ${errors.join('\n')}`));
                return;
              }
              const migration = extractMigrationInitiated(api, events);
              if (migration) {
                resolve(migration);
              } else {
                reject(new Error('MigrationInitiated event not found in finalized transaction'));
              }
            }
          })
          .catch((error: Error) => reject(error)),
      );
    },
    [api],
  );

  return {
    palletAvailable,
    constants,
    paused: pausedQuery.data === true,
    submitMigration,
  };
}
