import { SubmittableExtrinsic } from '@polkadot/api/promise/types';
import { SpacewalkPrimitivesCurrencyId } from '@polkadot/types/lookup';
import Big from 'big.js';
import { useEffect, useMemo, useState } from 'preact/hooks';
import { useNodeInfoState } from '../../NodeInfoProvider';
import { fixedPointToDecimal } from '../../shared/parseNumbers/metric';

export function useFeePallet() {
  const [issueFee, setIssueFee] = useState<Big>(new Big(0));
  const [redeemFee, setRedeemFee] = useState<Big>(new Big(0));
  const [punishmentFee, setPunishmentFee] = useState<Big>(new Big(0));
  const [premiumRedeemFee, setPremiumRedeemFee] = useState<Big>(new Big(0));
  const [issueGriefingCollateralFee, setIssueGriefingCollateralFee] = useState<Big>(new Big(0));
  const [replaceGriefingCollateralFee, setReplaceGriefingCollateralFee] = useState<Big>(new Big(0));

  const [griefingCollateralCurrency, setGriefingCollateralCurrency] = useState<
    SpacewalkPrimitivesCurrencyId | undefined
  >(undefined);

  const { api } = useNodeInfoState().state;

  useEffect(() => {
    if (!api) {
      return;
    }

    // Check that the pallet is available
    if (!api.query.fee || !api.consts.vaultRegistry) {
      return;
    }

    let unsubscribe: () => void = () => undefined;

    setGriefingCollateralCurrency(api.consts.vaultRegistry?.getGriefingCollateralCurrencyId);

    Promise.all([
      api.query.fee.issueFee((fee) => {
        const decimal = Big(fixedPointToDecimal(fee.toString()));
        setIssueFee(decimal);
      }),
      api.query.fee.punishmentFee((fee) => {
        const decimal = Big(fixedPointToDecimal(fee.toString()));
        setPunishmentFee(decimal);
      }),
      api.query.fee.redeemFee((fee) => {
        const decimal = Big(fixedPointToDecimal(fee.toString()));
        setRedeemFee(decimal);
      }),
      api.query.fee.premiumRedeemFee((fee) => {
        const decimal = Big(fixedPointToDecimal(fee.toString()));
        setPremiumRedeemFee(decimal);
      }),
      api.query.fee.issueGriefingCollateral((fee: Big) => {
        const decimal = Big(fixedPointToDecimal(fee.toString()));
        setIssueGriefingCollateralFee(decimal);
      }),
      api.query.fee.replaceGriefingCollateral((fee: Big) => {
        const decimal = Big(fixedPointToDecimal(fee.toString()));
        setReplaceGriefingCollateralFee(decimal);
      }),
    ]).then((unsubscribeFunctions) => {
      unsubscribe = () => {
        unsubscribeFunctions.forEach((u) => (u as () => void)());
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
          issueGriefingCollateralFee,
          replaceGriefingCollateralFee,
          griefingCollateralCurrency,
        };
      },
      async getTransactionFee(extrinsic: SubmittableExtrinsic) {
        if (!api || !extrinsic.hasPaymentInfo) {
          return new Big(0);
        }

        // Can be any address because we don't care about executing it here
        const dummyAddress = '5D4tzEZy9XeNSwsAXgtZrRrs1bTfpPTWGqwb1PwCYjRTKYYS';
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
    issueGriefingCollateralFee,
    replaceGriefingCollateralFee,
    griefingCollateralCurrency,
  ]);

  return memo;
}
