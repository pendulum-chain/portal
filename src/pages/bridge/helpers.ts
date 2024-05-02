import { Asset } from 'stellar-base';
import Big from 'big.js';
import { nativeStellarToDecimal } from '../../shared/parseNumbers/metric';

export function prioritizeXLMAsset(assets?: Asset[]): Asset[] {
  if (!assets) {
    return [];
  }

  return assets.sort((a, b) => (a.code === 'XLM' ? -1 : b.code === 'XLM' ? 1 : 0));
}

export const calculateGriefingCollateral = async (
  amount: Big,
  assetCode: string | undefined,
  wrappedCurrencySuffix: string,
  getTokenPrice: (currency: string) => Promise<number>,
  griefingCollateralCurrency: string | undefined,
  issueGriefingCollateralFee: Big,
) => {
  const isInvalid = (value: unknown) => {
    if (!value) {
      return true;
    }
    return false;
  };

  if (isInvalid(amount)) return new Big(0);

  if (isInvalid(assetCode)) return new Big(0);

  const assetUSDPrice = await getTokenPrice(`${assetCode}${wrappedCurrencySuffix}`);
  if (isInvalid(assetUSDPrice)) return new Big(0);

  const amountUSD = nativeStellarToDecimal(amount).mul(assetUSDPrice);
  if (!griefingCollateralCurrency || typeof griefingCollateralCurrency !== 'string') {
    return new Big(0);
  }

  const griefingCollateralCurrencyUSD = await getTokenPrice(griefingCollateralCurrency);
  if (isInvalid(griefingCollateralCurrencyUSD)) return new Big(0);

  const griefingCollateralValue = amountUSD.mul(issueGriefingCollateralFee).div(griefingCollateralCurrencyUSD);
  return griefingCollateralValue;
};
