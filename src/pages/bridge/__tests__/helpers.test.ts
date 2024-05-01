import { calculateGriefingCollateral } from '../helpers';
import Big from 'big.js';

describe('calculateGriefingCollateral', () => {
  let mockGetTokenPrice: jest.Mock;
  let mockSetGriefingCollateral: jest.Mock;

  beforeEach(() => {
    mockGetTokenPrice = jest.fn();
    mockSetGriefingCollateral = jest.fn();
  });

  it('should set griefing collateral to 0 and return if amount is not valid', async () => {
    await calculateGriefingCollateral(
      Big(0),
      'assetCode',
      'wrappedCurrencySuffix',
      mockGetTokenPrice,
      'griefingCollateralCurrency',
      mockSetGriefingCollateral,
    );

    expect(mockSetGriefingCollateral).toHaveBeenCalledWith(Big(0));
  });

  it('should set griefing collateral to 0 and return if assetCode is not valid', async () => {
    await calculateGriefingCollateral(
      Big(1),
      undefined,
      'wrappedCurrencySuffix',
      mockGetTokenPrice,
      'griefingCollateralCurrency',
      mockSetGriefingCollateral,
    );

    expect(mockSetGriefingCollateral).toHaveBeenCalledWith(Big(0));
  });

  it('should set griefing collateral to 0 and return if assetUSDPrice is not valid', async () => {
    mockGetTokenPrice.mockResolvedValueOnce(0);

    await calculateGriefingCollateral(
      Big(1),
      'assetCode',
      'wrappedCurrencySuffix',
      mockGetTokenPrice,
      'griefingCollateralCurrency',
      mockSetGriefingCollateral,
    );

    expect(mockSetGriefingCollateral).toHaveBeenCalledWith(Big(0));
  });

  it('should set griefing collateral to 0 and return if griefingCollateralCurrency is not valid', async () => {
    mockGetTokenPrice.mockResolvedValueOnce(1);

    await calculateGriefingCollateral(
      Big(1),
      'assetCode',
      'wrappedCurrencySuffix',
      mockGetTokenPrice,
      undefined,
      mockSetGriefingCollateral,
    );

    expect(mockSetGriefingCollateral).toHaveBeenCalledWith(Big(0));
  });

  it('should set griefing collateral to 0 and return if griefingCollateralCurrencyUSD is not valid', async () => {
    mockGetTokenPrice.mockResolvedValueOnce(1).mockResolvedValueOnce(0);

    await calculateGriefingCollateral(
      Big(1),
      'assetCode',
      'wrappedCurrencySuffix',
      mockGetTokenPrice,
      'griefingCollateralCurrency',
      mockSetGriefingCollateral,
    );

    expect(mockSetGriefingCollateral).toHaveBeenCalledWith(Big(0));
  });
});
