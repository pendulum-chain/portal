import type { SpacewalkPrimitivesIssueIssueRequest, SpacewalkPrimitivesVaultId } from '@polkadot/types/lookup';
import { useMemo } from 'preact/hooks';
import { useNodeInfoState } from '../../NodeInfoProvider';
import { H256 } from '@polkadot/types/interfaces';

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

        return api.tx.issue?.requestIssue(amount, vaultId);
      },
    };
  }, [api]);

  return memo;
}
