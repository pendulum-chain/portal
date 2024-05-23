import { H256 } from '@polkadot/types/interfaces';
import type { SpacewalkPrimitivesIssueIssueRequest, SpacewalkPrimitivesVaultId } from '@polkadot/types/lookup';
import { useMemo } from 'preact/hooks';
import { useNodeInfoState } from '../../NodeInfoProvider';
import { Compact, u128 } from '@polkadot/types-codec';
import Big from 'big.js';
import { isU128 } from '../../shared/parseNumbers/isU128';

export interface RichIssueRequest {
  id: H256;
  request: SpacewalkPrimitivesIssueIssueRequest;
}

export function useIssuePallet() {
  const { api } = useNodeInfoState().state;

  const memo = useMemo(() => {
    return {
      async getIssueRequests() {
        const entries = await api?.query.issue.issueRequests.entries();
        if (!entries) {
          return [];
        }

        return entries.map(([key, value]) => {
          const request = value.unwrap();

          const issueRequest: RichIssueRequest = {
            id: key.args[0] as H256,
            request,
          };

          return issueRequest;
        });
      },
      async getIssueRequest(issueId: H256) {
        const request = await api?.query.issue.issueRequests(issueId);
        if (request && request.isSome) {
          return {
            id: issueId,
            request: request.unwrap(),
          };
        } else {
          return undefined;
        }
      },
      createIssueRequestExtrinsic(amount: string, vaultId: SpacewalkPrimitivesVaultId) {
        if (!api) {
          return undefined;
        }

        const u128Amount = Big(amount)

        if(!isU128(u128Amount)) return;

        const compactAmount: Compact<u128> =  api.createType('Compact<u128>', u128Amount.toString());

        return api.tx.issue?.requestIssue(compactAmount, vaultId);
      },
    };
  }, [api]);

  return memo;
}
