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
  setGriefingCollateral: (value: Big) => void,
) => {
  const checkInvalid = (value: unknown) => {
    if (!value) {
      setGriefingCollateral(Big(0));
      return false;
    }
    return true;
  };

  if (!checkInvalid(amount)) return;

  if (!checkInvalid(assetCode)) return;

  const assetUSDPrice = await getTokenPrice(`${assetCode}${wrappedCurrencySuffix}`);
  if (!checkInvalid(assetUSDPrice)) return;

  const amountUSD = nativeStellarToDecimal(amount).mul(assetUSDPrice);
  if (!griefingCollateralCurrency || typeof griefingCollateralCurrency !== 'string') {
    setGriefingCollateral(Big(0));
    return;
  }

  const griefingCollateralCurrencyUSD = await getTokenPrice(griefingCollateralCurrency);
  if (!checkInvalid(griefingCollateralCurrencyUSD)) return;

  const griefingCollateralValue = amountUSD.mul(0.05).div(griefingCollateralCurrencyUSD);
  setGriefingCollateral(griefingCollateralValue);
};
