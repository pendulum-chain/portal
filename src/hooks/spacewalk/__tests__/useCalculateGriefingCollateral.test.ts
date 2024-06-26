import { renderHook } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/preact';
import { Asset } from 'stellar-base';
import Big from 'big.js';
import { useFeePallet } from '../useFeePallet';
import { useCalculateGriefingCollateral } from '../useCalculateGriefingCollateral';

const STELLAR_ONE_WITH_DECIMALS = 1000000000000;
const VALID_ASSET = new Asset('code', 'GASOCNHNNLYFNMDJYQ3XFMI7BYHIOCFW3GJEOWRPEGK2TDPGTG2E5EDW');
// We assume that the price is the same for all assets
const PRICE = 1;

jest.mock('../../usePriceFetcher', () => ({
  usePriceFetcher: jest.fn().mockReturnValue({
    getTokenPriceForCurrency: jest.fn().mockReturnValue(Promise.resolve(PRICE)),
  }),
}));

jest.mock('../../../NodeInfoProvider', () => ({
  useNodeInfoState: jest.fn().mockReturnValue({
    state: { api: {} },
  }),
}));

jest.mock('../../../helpers/spacewalk', () => ({
  convertStellarAssetToCurrency: jest.fn().mockImplementation(() => 'convertedCurrency'),
}));

// useFeePallet mock is implemented in the describe() as we need to spy it during tests
jest.mock('../useFeePallet');

describe('useCalculateGriefingCollateral', () => {
  const mockGetFees = jest.fn().mockReturnValue({
    griefingCollateralCurrency: 'AUDD',
    issueGriefingCollateralFee: 0.05,
  });

  beforeEach(() => {
    (useFeePallet as jest.MockedFunction<typeof useFeePallet>).mockReturnValue({
      getFees: mockGetFees,
      getTransactionFee: jest.fn(),
    });

    jest.useFakeTimers();
  });

  it('should return 0 griefing collateral if amount is not valid', async () => {
    const { result } = renderHook(() => useCalculateGriefingCollateral(new Big(0), VALID_ASSET));

    const expectation = () => expect(result.current.eq(new Big(0))).toBeTruthy();

    expectation();
    await waitFor(expectation);
  });

  it('should return 0 griefing collateral if bridgedAsset is not valid', async () => {
    const { result } = renderHook(() => useCalculateGriefingCollateral(new Big(1000), undefined));

    const expectation = () => expect(result.current.eq(new Big(0))).toBeTruthy();

    expectation();
    await waitFor(expectation);
  });

  it('should return 0 griefing collateral if griefingCollateralCurrency is not valid', async () => {
    mockGetFees.mockReturnValueOnce({
      griefingCollateralCurrency: undefined,
      issueGriefingCollateralFee: 0.05,
    });

    const { result } = renderHook(() => useCalculateGriefingCollateral(new Big(1000), VALID_ASSET));

    const expectation = () => expect(result.current.eq(new Big(0))).toBeTruthy();

    expectation();
    await waitFor(expectation);
  });

  it('should calculate griefing collateral correctly', async () => {
    const amount = new Big(STELLAR_ONE_WITH_DECIMALS);
    const { result } = renderHook(() => useCalculateGriefingCollateral(amount, VALID_ASSET));

    // First returned value (before useEffect is fired)
    expect(result.current.eq(0)).toBeTruthy();

    const griefingFee = mockGetFees().issueGriefingCollateralFee;
    // Since we assume the same price for all assets, the decimal griefing collateral is the amount * griefingFee / decimals
    const griefingAmount = amount
      .times(griefingFee)
      .div(10 ** 12)
      .toNumber();

    await waitFor(() => expect(result.current.eq(griefingAmount)).toBeTruthy());
  });
});
