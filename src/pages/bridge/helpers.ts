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

export const calculateGriefingCollateral = async (
  amount: Big,
  assetCode: string | undefined,
  wrappedCurrencySuffix: string,
  getTokenPriceForCurrency: (currency: SpacewalkPrimitivesCurrencyId) => Promise<number>,
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

  const assetUSDPrice = await getTokenPriceForCurrency(
    `${assetCode}${wrappedCurrencySuffix}` as unknown as SpacewalkPrimitivesCurrencyId,
  );
  if (isInvalid(assetUSDPrice)) return new Big(0);

  const amountUSD = nativeStellarToDecimal(amount).mul(assetUSDPrice);
  if (!griefingCollateralCurrency || typeof griefingCollateralCurrency !== 'string') {
    return new Big(0);
  }

  const griefingCollateralCurrencyUSD = await getTokenPriceForCurrency(
    griefingCollateralCurrency as unknown as SpacewalkPrimitivesCurrencyId,
  );
  if (isInvalid(griefingCollateralCurrencyUSD)) return new Big(0);

  const griefingCollateralValue = amountUSD.mul(issueGriefingCollateralFee).div(griefingCollateralCurrencyUSD);
  return griefingCollateralValue;
};
