import { renderHook } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/preact';
import { Asset } from 'stellar-base';
import Big from 'big.js';
import { useFeePallet } from '../useFeePallet';
import { useCalculateGriefingCollateral } from '../useCalculateGriefingCollateral';

const STELLAR_ONE_WITH_DECIMALS = 1000000000000;
const VALID_ASSET = new Asset('code', 'GASOCNHNNLYFNMDJYQ3XFMI7BYHIOCFW3GJEOWRPEGK2TDPGTG2E5EDW');

jest.mock('../../usePriceFetcher', () => ({
  usePriceFetcher: jest.fn().mockReturnValue({
    getTokenPriceForCurrency: jest.fn().mockReturnValue(Promise.resolve(1)),
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

  it('should return 0 griefing collateral if amount is not valid', () => {
    const { result } = renderHook(() => useCalculateGriefingCollateral(new Big(0), undefined));

    expect(result.current.eq(new Big(0))).toBeTruthy();
  });

  it('should return 0 griefing collateral if bridgedAsset is not valid', () => {
    const { result } = renderHook(() => useCalculateGriefingCollateral(new Big(1000), undefined));

    expect(result.current.eq(new Big(0))).toBeTruthy();
  });

  it('should return 0 griefing collateral if griefingCollateralCurrency is not valid', () => {
    mockGetFees.mockReturnValueOnce({
      griefingCollateralCurrency: undefined,
      issueGriefingCollateralFee: 0.05,
    });

    const { result } = renderHook(() => useCalculateGriefingCollateral(new Big(1000), VALID_ASSET));

    expect(result.current.eq(new Big(0))).toBeTruthy();
  });

  it('should calculate griefing collateral correctly', async () => {
    const { result } = renderHook(() =>
      useCalculateGriefingCollateral(new Big(STELLAR_ONE_WITH_DECIMALS), VALID_ASSET),
    );

    // First retuned value (before useEffect is fired)
    expect(result.current.eq(0)).toBeTruthy();

    await waitFor(() => expect(result.current.eq(0.05)).toBeTruthy());
  });
});
