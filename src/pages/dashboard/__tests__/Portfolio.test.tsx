jest.mock('../../../components/Table/styles.css', () => ({}), { virtual: true });

import React from 'react';
import { render } from '@testing-library/react';

import useBalances from '../../../hooks/useBalances';
import { useGlobalState } from '../../../GlobalStateProvider';
import { TenantName } from '../../../models/Tenant';
import Portfolio from '../Portfolio';

jest.mock('../../../hooks/useBalances');
jest.mock('../../../GlobalStateProvider', () => ({
  useGlobalState: jest.fn(),
  GlobalStateProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

const MOCKED_GLOBAL_STATE = {
  walletAccount: {
    address: 'test-wallet-address',
    source: 'test-source',
  },
  dAppName: 'test-dapp',
  tenantName: TenantName.Pendulum,
  setWalletAccount: jest.fn(),
  removeWalletAccount: jest.fn(),
  getThemeName: jest.fn(),
};

describe('Portfolio Component', () => {
  const mockUseGlobalState = useGlobalState as jest.MockedFunction<typeof useGlobalState>;
  const mockUseBalances = useBalances as jest.MockedFunction<typeof useBalances>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly when wallet is connected with balances', () => {
    mockUseGlobalState.mockReturnValue(MOCKED_GLOBAL_STATE);

    mockUseBalances.mockReturnValue({
      balances: [
        { token: 'PEN', price: 50000, amount: 0.5, usdValue: 25000 },
        { token: 'USDC.axl', price: 3000, amount: 2, usdValue: 6000 },
      ],
      accountTotalBalance: 31000,
    });

    const { container, getByText } = render(<Portfolio />);
    expect(container).toMatchSnapshot();
    expect(container.textContent).not.toContain('e+');
    expect(getByText('$ 31,000.00')).toBeInTheDocument();
  });

  it('renders correctly when wallet is connected but no balances', () => {
    mockUseGlobalState.mockReturnValue(MOCKED_GLOBAL_STATE);

    mockUseBalances.mockReturnValue({
      balances: [],
      accountTotalBalance: 0,
    });

    const { container } = render(<Portfolio />);
    expect(container).toMatchSnapshot();
  });
  it('renders correctly when balances are loading', () => {
    mockUseGlobalState.mockReturnValue(MOCKED_GLOBAL_STATE);

    mockUseBalances.mockReturnValue({
      balances: undefined,
      accountTotalBalance: 0,
    });

    const { container } = render(<Portfolio />);
    expect(container).toMatchSnapshot();
  });

  it('renders exponential balance in standard notation', () => {
    mockUseGlobalState.mockReturnValue(MOCKED_GLOBAL_STATE);

    mockUseBalances.mockReturnValue({
      balances: [{ token: 'PEN', price: 1, amount: 250000, usdValue: 250000 }],
      accountTotalBalance: 250000,
    });

    const { container, getByText } = render(<Portfolio />);
    expect(container).toMatchSnapshot();
    expect(getByText('$ 250,000.00')).toBeInTheDocument();
    expect(container.textContent).not.toContain('e+');
  });
});
