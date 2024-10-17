import { Asset } from '@stellar/stellar-sdk';

const MYKOBO_EURC = new Asset('EURC', 'GAQRF3UGHBT6JYQZ7YSUYCIYWAF4T2SAA5237Q5LIQYJOHHFAWDXZ7NM');
const HIDDEN_SPACEWALK_ASSETS = [MYKOBO_EURC];

export function prioritizeXLMAsset(assets?: Asset[]): Asset[] {
  if (!assets) {
    return [];
  }

  return assets.sort((a, b) => (a.code === 'XLM' ? -1 : b.code === 'XLM' ? 1 : 0));
}

// Filter out hardcoded hidden assets
export function filterHiddenAssets(assets?: Asset[]): Asset[] {
  if (!assets) {
    return [];
  }

  return assets.filter((asset) => {
    const isHidden = Boolean(HIDDEN_SPACEWALK_ASSETS.find((hidden) => hidden.equals(asset)));
    return !isHidden;
  });
}
