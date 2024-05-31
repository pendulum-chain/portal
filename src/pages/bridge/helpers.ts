import { Asset } from 'stellar-base';
import Big from 'big.js';
import { nativeStellarToDecimal } from '../../shared/parseNumbers/metric';
import { SpacewalkPrimitivesCurrencyId } from '@polkadot/types/lookup';
import { usePriceFetcher } from '../../hooks/usePriceFetcher';
import { useFeePallet } from '../../hooks/spacewalk/useFeePallet';
import { useEffect, useState } from 'preact/compat';

export function prioritizeXLMAsset(assets?: Asset[]): Asset[] {
  if (!assets) {
    return [];
  }

  return assets.sort((a, b) => (a.code === 'XLM' ? -1 : b.code === 'XLM' ? 1 : 0));
}

const isInvalid = (value: unknown) => {
  return !value;
};

export const useCalculateGriefingCollateral = (
  amount: Big,
  wrappedCurrency: SpacewalkPrimitivesCurrencyId | null | undefined,
) => {
  const { getTokenPriceForCurrency } = usePriceFetcher();
  const { getFees } = useFeePallet();
  const [griefingCollateral, setGriefingCollateral] = useState<Big>(new Big(0));

  const { griefingCollateralCurrency, issueGriefingCollateralFee } = getFees();

  useEffect(() => {
    if (isInvalid(amount) || isInvalid(wrappedCurrency) || isInvalid(griefingCollateralCurrency)) return;

    getTokenPriceForCurrency(wrappedCurrency!).then((assetUSDPrice) => {
      const amountUSD = nativeStellarToDecimal(amount).mul(assetUSDPrice);

      getTokenPriceForCurrency(griefingCollateralCurrency!).then((griefingCollateralCurrencyUSD) => {
        if (isInvalid(griefingCollateralCurrencyUSD)) return;

        setGriefingCollateral(amountUSD.mul(issueGriefingCollateralFee).div(griefingCollateralCurrencyUSD));
      });
    });
  }, [amount, getTokenPriceForCurrency, griefingCollateralCurrency, issueGriefingCollateralFee, wrappedCurrency]);

  return griefingCollateral;
};
