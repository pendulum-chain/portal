import { calculateGriefingCollateral } from '../helpers';
import Big from 'big.js';

const STELLAR_ONE_WITH_DECIMALS = 1000000000000;

describe('calculateGriefingCollateral', () => {
  let mockGetTokenPrice: jest.Mock;

  beforeEach(() => {
    mockGetTokenPrice = jest.fn();
  });

  it('should set griefing collateral to 0 and return if amount is not valid', async () => {
    const result = await calculateGriefingCollateral(
      Big(0),
      'assetCode',
      'wrappedCurrencySuffix',
      mockGetTokenPrice,
      'griefingCollateralCurrency',
      Big(0.05),
    );

    expect(result.eq(Big(0))).toBeTruthy();
  });

  it('should set griefing collateral to 0 and return if assetCode is not valid', async () => {
    const result = await calculateGriefingCollateral(
      Big(STELLAR_ONE_WITH_DECIMALS),
      undefined,
      'wrappedCurrencySuffix',
      mockGetTokenPrice,
      'griefingCollateralCurrency',
      Big(0.05),
    );

    expect(result.eq(Big(0))).toBeTruthy();
  });

  it('should set griefing collateral to 0 and return if assetUSDPrice is not valid', async () => {
    mockGetTokenPrice.mockResolvedValueOnce(0);

    const result = await calculateGriefingCollateral(
      Big(STELLAR_ONE_WITH_DECIMALS),
      'assetCode',
      'wrappedCurrencySuffix',
      mockGetTokenPrice,
      'griefingCollateralCurrency',
      Big(0.05),
    );

    expect(result.eq(Big(0))).toBeTruthy();
  });

  it('should set griefing collateral to 0 and return if griefingCollateralCurrency is not valid', async () => {
    mockGetTokenPrice.mockResolvedValueOnce(1);

    const result = await calculateGriefingCollateral(
      Big(STELLAR_ONE_WITH_DECIMALS),
      'assetCode',
      'wrappedCurrencySuffix',
      mockGetTokenPrice,
      undefined,
      Big(0.05),
    );

    expect(result.eq(Big(0))).toBeTruthy();
  });

  it('should set griefing collateral to 0 and return if griefingCollateralCurrencyUSD is not valid', async () => {
    mockGetTokenPrice.mockResolvedValueOnce(1).mockResolvedValueOnce(0);

    const result = await calculateGriefingCollateral(
      Big(STELLAR_ONE_WITH_DECIMALS),
      'assetCode',
      'wrappedCurrencySuffix',
      mockGetTokenPrice,
      'griefingCollateralCurrency',
      Big(0.05),
    );

    expect(result.eq(Big(0))).toBeTruthy();
  });

  it('should calculate griefing collateral correctly', async () => {
    mockGetTokenPrice.mockResolvedValueOnce(1).mockResolvedValueOnce(1);

    const result = await calculateGriefingCollateral(
      Big(STELLAR_ONE_WITH_DECIMALS),
      'assetCode',
      'wrappedCurrencySuffix',
      mockGetTokenPrice,
      'griefingCollateralCurrency',
      Big(0.05),
    );

    expect(result.eq(Big(0.05))).toBeTruthy();
  });
});
