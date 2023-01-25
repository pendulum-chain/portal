import type {
  SpacewalkPrimitivesIssueIssueRequest,
  SpacewalkPrimitivesVaultId,
} from "@polkadot/types/lookup";
import { useEffect, useMemo, useState } from "preact/hooks";
import { useNodeInfoState } from "../../NodeInfoProvider";
import { H256 } from "@polkadot/types/interfaces";

interface IssueRequest {
  id: H256;
  request: SpacewalkPrimitivesIssueIssueRequest;
}

export function useIssuePallet() {
  const [issueRequests, setIssueRequests] = useState<IssueRequest[]>([]);

  const { api } = useNodeInfoState().state;

  useEffect(() => {
    if (!api) {
      return;
    }

    let unsubscribe: () => void;

    api.query.issue.issueRequests.entries().then((entries) => {
      let richEntries = entries.map(([key, value]) => {
        const request = value.unwrap();

        const issueRequest: IssueRequest = {
          id: key.args[0] as H256,
          request,
        };

        return issueRequest;
      });

      setIssueRequests(richEntries);
    });

    return () => unsubscribe && unsubscribe();
  }, [api]);

  const memo = useMemo(() => {
    return {
      getIssueRequests() {
        return issueRequests;
      },
      getIssueRequest(vaultId: SpacewalkPrimitivesVaultId) {
        return issueRequests.find((issueRequest) =>
          issueRequest.request.vault.eq(vaultId)
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
