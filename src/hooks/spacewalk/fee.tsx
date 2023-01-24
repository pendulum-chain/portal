import { useEffect, useMemo, useState } from "preact/hooks";
import { useNodeInfoState } from "../../NodeInfoProvider";
import BigNumber from "bn.js";

export function useFeePallet() {
  const [issueFee, setIssueFee] = useState<BigNumber>(new BigNumber(0));
  const [redeemFee, setRedeemFee] = useState<BigNumber>(new BigNumber(0));
  const [punishmentFee, setPunishmentFee] = useState<BigNumber>(
    new BigNumber(0)
  );
  const [premiumRedeemFee, setPremiumRedeemFee] = useState<BigNumber>(
    new BigNumber(0)
  );
  const [issueGriefingCollateral, setIssueGriefingCollateral] =
    useState<BigNumber>(new BigNumber(0));
  const [replaceGriefingCollateral, setReplaceGriefingCollateral] =
    useState<BigNumber>(new BigNumber(0));

  const { api } = useNodeInfoState().state;

  useEffect(() => {
    if (!api) {
      return;
    }

    let unsubscribe: () => void = () => {};

    Promise.all([
      api.query.fee.issueFee((fee) => {
        setIssueFee(fee);
      }),
      api.query.fee.punishmentFee((fee) => {
        setPunishmentFee(fee);
      }),
      api.query.fee.redeemFee((fee) => {
        setRedeemFee(fee);
      }),
      api.query.fee.premiumRedeemFee((fee) => {
        setPremiumRedeemFee(fee);
      }),
      api.query.fee.issueGriefingCollateral((fee) => {
        setIssueGriefingCollateral(fee);
      }),
      api.query.fee.replaceGriefingCollateral((fee) => {
        setReplaceGriefingCollateral(fee);
      }),
    ]).then((unsubscribeFunctions) => {
      unsubscribe = () => {
        unsubscribeFunctions.forEach((u) => u());
      };
    });

    return unsubscribe;
  }, [api]);

  const memo = useMemo(() => {
    return {
      getFees() {
        return {
          issueFee,
          redeemFee,
          punishmentFee,
          premiumRedeemFee,
          issueGriefingCollateral,
          replaceGriefingCollateral,
        };
      },
    };
  }, []);
  return memo;
}
