import { useEffect, useMemo, useState } from "preact/hooks";
import Big from "big.js";
import { SpacewalkPrimitivesCurrencyId } from "@polkadot/types/lookup";
import { useNodeInfoState } from "../../NodeInfoProvider";

export function useFeePallet() {
  const [issueFee, setIssueFee] = useState<Big>(new Big(0));
  const [redeemFee, setRedeemFee] = useState<Big>(new Big(0));
  const [punishmentFee, setPunishmentFee] = useState<Big>(new Big(0));
  const [premiumRedeemFee, setPremiumRedeemFee] = useState<Big>(new Big(0));
  const [issueGriefingCollateral, setIssueGriefingCollateral] = useState<Big>(
    new Big(0)
  );
  const [replaceGriefingCollateral, setReplaceGriefingCollateral] =
    useState<Big>(new Big(0));

  const [griefingCollateralCurrency, setGriefingCollateralCurrency] = useState<
    SpacewalkPrimitivesCurrencyId | undefined
  >(undefined);

  const { api } = useNodeInfoState().state;

  useEffect(() => {
    if (!api) {
      return;
    }

    let unsubscribe: () => void = () => {};

    setGriefingCollateralCurrency(
      api.consts.vaultRegistry.getGriefingCollateralCurrencyId
    );

    Promise.all([
      api.query.fee.issueFee((fee) => {
        setIssueFee(Big(fee.toString()));
      }),
      api.query.fee.punishmentFee((fee) => {
        setPunishmentFee(Big(fee.toString()));
      }),
      api.query.fee.redeemFee((fee) => {
        setRedeemFee(Big(fee.toString()));
      }),
      api.query.fee.premiumRedeemFee((fee) => {
        setPremiumRedeemFee(Big(fee.toString()));
      }),
      api.query.fee.issueGriefingCollateral((fee) => {
        setIssueGriefingCollateral(Big(fee.toString()));
      }),
      api.query.fee.replaceGriefingCollateral((fee) => {
        setReplaceGriefingCollateral(Big(fee.toString()));
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
          griefingCollateralCurrency,
        };
      },
      async getTransactionFee() {
        if (!api) {
          return new Big(0);
        }
        const extrinsicData = api.tx.issue.requestIssue.data;
        console.log("extrinsicData", extrinsicData);
        if (!extrinsicData) {
          return new Big(0);
        }
        const fee = await api.rpc.payment.queryFeeDetails(extrinsicData);

        console.log("fee", fee);
        let inclusionFee = fee.inclusionFee.isSome
          ? fee.inclusionFee.unwrap()
          : null;
        let totalFee = inclusionFee
          ? Big(
              inclusionFee.baseFee
                .add(inclusionFee.lenFee)
                .add(inclusionFee.adjustedWeightFee)
                .toString()
            )
          : null;

        return totalFee ? totalFee : new Big(0);
      },
    };
  }, [
    api,
    issueFee,
    redeemFee,
    punishmentFee,
    premiumRedeemFee,
    issueGriefingCollateral,
    replaceGriefingCollateral,
    griefingCollateralCurrency,
  ]);

  return memo;
}
