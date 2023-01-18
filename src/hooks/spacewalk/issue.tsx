import { useNodeInfoState } from "../../NodeInfoProvider";
import { H256 } from "@polkadot/types/interfaces";
import type { SpacewalkPrimitivesIssueIssueRequest } from "@polkadot/types/lookup";

export function useIssuePallet() {
  const { state } = useNodeInfoState();
  const { api } = state;

  if (!api) {
    return null;
  }

  const getIssueRequests = () => {
    return api.query.issue.issueRequests.entries();
  };

  const getIssueRequestsForAccount = (accountId: string) => {
    // api.query.issue.issueRequests(accountId, (issueRequest) => {
    //   console.log("issueRequests", issueRequests);
    //   return issueRequests;
    // }
    return [];
  };

  const getVaultIssueRequests: (vaultId: string) => H256[] = (
    vaultId: string
  ) => {
    api.consts.vaultRegistry.getGriefingCollateralCurrencyId;
    return [];
  };

  const getIssueRequestById = async (issueId: string) => {
    let result = await api.query.issue.issueRequests(issueId);

    let issueRequest =
      result.toJSON() as unknown as SpacewalkPrimitivesIssueIssueRequest;

    console.log(issueRequest);
    return issueRequest;
  };

  return {
    getIssueRequests,
    getIssueRequestsForAccount,
    getVaultIssueRequests,
    getIssueRequestById,
  };
}
