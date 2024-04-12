import Big from 'big.js';

export function formatToSignificantDecimals(n: string): string {
  const num = Number(n);
  if (isNaN(num) || num <= 0) return '0';

  const scale = Math.pow(10, 2 - Math.ceil(Math.log10(Math.abs(num))));
  const result = Math.round(num * scale) / scale;

  return parseFloat(result.toFixed(20).replace(/\.?0+$/, '')).toString();
}

export function formatToFixedDecimals(n: number, decimals: number): string {
  return n.toFixed(decimals).replace(/\.?0+$/, '');
}

export function calculatePriceNativeForCurrentFromToken(
  nativeTokenPriceInSelectedToken: number,
  nativeTokenPrice: number,
  selectedFromTokenPriceUSD: number,
  decimals: number,
): string {
  if (nativeTokenPrice && selectedFromTokenPriceUSD && !isNaN(Number(nativeTokenPriceInSelectedToken))) {
    const nativeTokenPriceUSD = Big(selectedFromTokenPriceUSD).mul(nativeTokenPriceInSelectedToken);
    const native = nativeTokenPriceUSD.div(nativeTokenPrice);

    return formatToFixedDecimals(native.toNumber(), decimals);
  }
  return '0';
}

export function calculateForCurrentFromToken(
  native: number,
  nativeTokenPrice: number,
  selectedFromTokenPriceUSD: number,
  decimals: number,
): string {
  if (nativeTokenPrice && selectedFromTokenPriceUSD && !isNaN(Number(native)) && native) {
    const nativeTokenPriceUSD = Big(nativeTokenPrice).mul(native);
    const nativeTokenPriceInSelectedToken = nativeTokenPriceUSD.div(selectedFromTokenPriceUSD);

    return formatToFixedDecimals(nativeTokenPriceInSelectedToken.toNumber(), decimals);
  }

  return '0';
}
