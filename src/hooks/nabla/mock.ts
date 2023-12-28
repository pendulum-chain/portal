import { BackstopPool, NablaToken, SwapPool } from '../../../gql/graphql';

const common = {
  decimals: 18,
  derivedETH: '',
  pairBase: [],
  pairDayDataBase: [],
  pairDayDataQuote: [],
  pairQuote: [],
  tokenDayData: [],
  totalLiquidity: '1000000000',
  totalSupply: '10000000000',
  tradeVolume: '500000000',
  tradeVolumeUSD: '500000000',
  txCount: 1000,
  untrackedVolumeUSD: '',
};
export const mockTokens: NablaToken[] = [
  {
    id: '6iFkBQJ1C5rKeAc3Np6xAZBM9WfNuukLyjJffELK9HGkDjoa',
    name: 'Mock USD',
    symbol: 'mUSD',
    ...common,
  },
  {
    id: '6h4VmXd5MHBTyJbem7f68xsi7otXvqLUiKf8SdRH9n2nuYaP',
    name: 'Mock EUR',
    symbol: 'mEUR',
    ...common,
  },
  {
    id: '6nbACDpR3WCCy7qcTBb5MQZjpZZJCLzQ3g9sBH3RqXgWx4T4',
    name: 'Mock ETH',
    symbol: 'mETH',
    ...common,
  },
];

export const mockBackstopPools: BackstopPool[] = [
  {
    id: '6m6SUHd1XRpboq3GMsL73RigXCfz9iKZGWjoAzMnJJ9dJNgs',
    token: mockTokens[0],
    liabilities: '1200000000',
    paused: false,
    reserves: '1400000000',
    router: {
      id: '6mZ1nPRz2YhBH9GpmowSMdcLA28ZCPjRY3RJdGTj6z4hXLez',
      backstopPools: [],
      paused: false,
      swapPools: [],
    },
    ...common,
  },
];

export const mockSwapPools: SwapPool[] = [
  {
    id: '6nSUPH1Zubuipt1Knit352hkNEMKdSobaYGsZyo271mFd6fp',
    token: mockTokens[0],
    liabilities: '1200000000',
    paused: false,
    reserves: '1400000000',
    router: {
      id: '6mZ1nPRz2YhBH9GpmowSMdcLA28ZCPjRY3RJdGTj6z4hXLez',
      backstopPools: [],
      paused: false,
      swapPools: [],
    },
    backstop: mockBackstopPools[0],
    ...common,
  },
  {
    id: '6knNBRZ6L6KDdS9JxBUN92ffUdNGHnA4MiFFNbVfbYkKZSUv',
    token: mockTokens[1],
    liabilities: '1200000000',
    paused: false,
    reserves: '1400000000',
    router: {
      id: '6mZ1nPRz2YhBH9GpmowSMdcLA28ZCPjRY3RJdGTj6z4hXLez',
      backstopPools: [],
      paused: false,
      swapPools: [],
    },
    backstop: mockBackstopPools[0],
    ...common,
  },
  {
    id: '6hCd2N5PVhHEoRwg5Db1Ja11sdwNKEmsRd24i76CV2NmdH46',
    token: mockTokens[2],
    liabilities: '1200000000',
    paused: false,
    reserves: '1400000000',
    router: {
      id: '6mZ1nPRz2YhBH9GpmowSMdcLA28ZCPjRY3RJdGTj6z4hXLez',
      backstopPools: [],
      paused: false,
      swapPools: [],
    },
    backstop: mockBackstopPools[0],
    ...common,
  },
];
