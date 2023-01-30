import type {
  SpacewalkPrimitivesIssueIssueRequest,
  SpacewalkPrimitivesVaultId,
} from "@polkadot/types/lookup";
import { useEffect, useMemo, useState } from "preact/hooks";
import { useNodeInfoState } from "../../NodeInfoProvider";
import { H256 } from "@polkadot/types/interfaces";

export interface RichIssueRequest {
  id: H256;
  request: SpacewalkPrimitivesIssueIssueRequest;
}

export function useIssuePallet() {
  const [issueRequests, setIssueRequests] = useState<RichIssueRequest[]>([]);

  const { api } = useNodeInfoState().state;

  useEffect(() => {
    if (!api) {
      return;
    }

    let unsubscribe: () => void;

    api.query.issue.issueRequests.entries().then((entries) => {
      console.log("updating issue requests", entries)
      const richEntries = entries.map(([key, value]) => {
        const request = value.unwrap();

        const issueRequest: RichIssueRequest = {
          id: key.args[0] as H256,
          request,
        };

        return issueRequest;
      });

      setIssueRequests(richEntries);
    });

    return () => unsubscribe && unsubscribe();
  }, [api, setIssueRequests]);

  const memo = useMemo(() => {
    return {
      getIssueRequests() {
        return issueRequests;
      },
      getIssueRequest(issueId: H256) {
        return issueRequests.find((issueRequest) =>
          issueRequest.id.eq(issueId)
        );
      },
      getIssueRequestsForRequester(accountId: string) {
        return issueRequests.filter((issueRequest) => {
          return issueRequest.request.requester.toString() === accountId;
        });
      },
      getIssueRequestsForVault(vaultId: SpacewalkPrimitivesVaultId) {
        return issueRequests.filter((issueRequest) => {
          return issueRequest.request.vault === vaultId;
        });
      },
      createIssueRequestExtrinsic(
        amount: string,
        vaultId: SpacewalkPrimitivesVaultId
      ) {
        if (!api) {
          return undefined;
        }

        return api.tx.issue.requestIssue(amount, vaultId);
      },
    };
  }, [api, issueRequests]);

  return memo;
}
