import { Asset } from 'stellar-base';
import Big from 'big.js';
import { nativeStellarToDecimal } from '../../shared/parseNumbers/metric';
import { SpacewalkPrimitivesCurrencyId } from '@polkadot/types/lookup';

export function prioritizeXLMAsset(assets?: Asset[]): Asset[] {
  if (!assets) {
    return [];
  }

  return assets.sort((a, b) => (a.code === 'XLM' ? -1 : b.code === 'XLM' ? 1 : 0));
}

const isInvalid = (value: unknown) => {
  return !value;
};

export const calculateGriefingCollateral = async (
  amount: Big,
  wrappedCurrency: SpacewalkPrimitivesCurrencyId | null | undefined,
  griefingCollateralCurrency: SpacewalkPrimitivesCurrencyId | null | undefined,
  getTokenPriceForCurrency: (currency: SpacewalkPrimitivesCurrencyId) => Promise<number>,
  issueGriefingCollateralFee: Big,
) => {
  if (isInvalid(amount) || isInvalid(wrappedCurrency) || isInvalid(griefingCollateralCurrency)) return new Big(0);

  const assetUSDPrice = await getTokenPriceForCurrency(wrappedCurrency!);

  const amountUSD = nativeStellarToDecimal(amount).mul(assetUSDPrice);

  const griefingCollateralCurrencyUSD = await getTokenPriceForCurrency(griefingCollateralCurrency!);
  if (isInvalid(griefingCollateralCurrencyUSD)) return new Big(0);

  const griefingCollateralValue = amountUSD.mul(issueGriefingCollateralFee).div(griefingCollateralCurrencyUSD);
  return griefingCollateralValue;
};
