import { H256 } from '@polkadot/types/interfaces';
import type { SpacewalkPrimitivesRedeemRedeemRequest, SpacewalkPrimitivesVaultId } from '@polkadot/types/lookup';
import { useMemo } from 'react';
import { useNodeInfoState } from '../../NodeInfoProvider';
import { convertPublicKeyToRaw } from '../../helpers/stellar';

export interface RichRedeemRequest {
  id: H256;
  request: SpacewalkPrimitivesRedeemRedeemRequest;
}

export function useRedeemPallet() {
  const { api } = useNodeInfoState().state;

  const memo = useMemo(() => {
    return {
      async getRedeemRequests() {
        const entries = await api?.query.redeem.redeemRequests.entries();
        if (!entries) {
          return [];
        }

        return entries.map(([key, value]) => {
          const request = value.unwrap();

          const redeemRequest: RichRedeemRequest = {
            id: key.args[0] as H256,
            request,
          };

          return redeemRequest;
        });
      },
      async getRedeemRequest(redeemId: H256) {
        const request = await api?.query.redeem.redeemRequests(redeemId);
        if (request && request.isSome) {
          return {
            id: redeemId,
            request: request.unwrap(),
          };
        } else {
          return undefined;
        }
      },
      createRedeemRequestExtrinsic(amount: string, stellarAddress: string, vaultId: SpacewalkPrimitivesVaultId) {
        if (!api) {
          return undefined;
        }

        const publicKeyRaw = convertPublicKeyToRaw(stellarAddress);

        return api.tx.redeem?.requestRedeem(amount, publicKeyRaw, vaultId);
      },
    };
  }, [api]);

  return memo;
}
