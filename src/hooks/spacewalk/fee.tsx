import { useEffect, useMemo, useState } from "preact/hooks";
import Big from "big.js";
import { SpacewalkPrimitivesCurrencyId } from "@polkadot/types/lookup";
import { useNodeInfoState } from "../../NodeInfoProvider";
import { SubmittableExtrinsic } from "@polkadot/api/promise/types";

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
      async getTransactionFee(extrinsic: SubmittableExtrinsic) {
        if (!api || !extrinsic.hasPaymentInfo) {
          return new Big(0);
        }

        // Can be any address because we don't care about executing it here
        const dummyAddress = "5D4tzEZy9XeNSwsAXgtZrRrs1bTfpPTWGqwb1PwCYjRTKYYS";
        const sender = dummyAddress;
        const info = await extrinsic.paymentInfo(sender);

        return new Big(info.partialFee.toString());
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
