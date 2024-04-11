import Big from 'big.js';

export function formatToSignificantDecimals(n: number): number {
  if (n === 0) return 0;
  const scale = Math.pow(10, 2 - Math.ceil(Math.log10(Math.abs(n))));
  const result = Math.round(n * scale) / scale;

  return parseFloat(result.toFixed(20).replace(/\.?0+$/, ''));
}

export function calculatePriceNativeForCurrentFromToken(
  nativeTokenPriceInSelectedToken: number,
  nativeTokenPrice: number,
  selectedFromTokenPriceUSD: number,
  decimals: number,
): number {
  if (nativeTokenPrice && selectedFromTokenPriceUSD && !isNaN(Number(nativeTokenPriceInSelectedToken))) {
    const nativeTokenPriceUSD = Big(selectedFromTokenPriceUSD).mul(nativeTokenPriceInSelectedToken);
    const native = nativeTokenPriceUSD.div(nativeTokenPrice);

    return Number(native.toFixed(decimals));
  }
  return 0;
}

export function calculateForCurrentFromToken(
  native: number,
  nativeTokenPrice: number,
  selectedFromTokenPriceUSD: number,
  decimals: number,
): number {
  if (nativeTokenPrice && selectedFromTokenPriceUSD && !isNaN(Number(native)) && native) {
    const nativeTokenPriceUSD = Big(nativeTokenPrice).mul(native);
    const nativeTokenPriceInSelectedToken = nativeTokenPriceUSD.div(selectedFromTokenPriceUSD);

    return Number(nativeTokenPriceInSelectedToken.toFixed(decimals));
  }

  return 0;
}
