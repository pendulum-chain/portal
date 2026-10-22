import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MigrationTargetConfig } from '../../../constants/migration';
import { toChecksumAddress } from '../../../helpers/ethereum';
import Migration from '..';

const VAULT = '0xB421bFBa72328Bc7F97755Eed236762a0c758C59';
const DESTINATION = '0x00000000000000000000000000000000deadbeef';

const mockSubmit = jest.fn();
let mockTarget: MigrationTargetConfig | undefined;

jest.mock('../../../GlobalStateProvider', () => ({
  useGlobalState: () => ({ walletAccount: { address: '5Grw', signer: {} }, tenantName: 'pendulum' }),
}));
jest.mock('../../../NodeInfoProvider', () => ({
  useNodeInfoState: () => ({ state: { api: {}, tokenSymbol: 'PEN', tokenDecimals: 12 } }),
}));
jest.mock('../../../hooks/migration/useMigrationPallet', () => ({
  useMigrationPallet: () => ({
    palletAvailable: true,
    constants: { minimumMigrationAmount: 100, existentialDeposit: 0.001 },
    paused: false,
    submitMigration: (...args: unknown[]) => mockSubmit(...args),
  }),
}));
jest.mock('../../../shared/useAccountBalance', () => ({
  useAccountBalance: () => ({ balances: { total: 10_000, transferable: 10_000 } }),
}));
jest.mock('../../../constants/migration', () => ({ getMigrationTarget: () => mockTarget }));
jest.mock('../../../hooks/migration/useBaseReleaseStatus', () => ({
  useBaseReleaseStatus: () => ({ data: undefined }),
  useReleaseTxHash: () => ({ data: undefined }),
}));
jest.mock('../../../shared/showToast', () => ({
  ToastMessage: { WARNING: 'WARNING', ERROR: 'ERROR', NO_WALLET_SELECTED: 'NO_WALLET_SELECTED' },
  showToast: jest.fn(),
}));

const word = (value: bigint) => `0x${value.toString(16).padStart(64, '0')}`;
const PEN = 10n ** 18n;

// Fake Base RPC: the destination is a regular account and the vault answers
// with the state below.
function mockBaseRpc(state: { perReleaseCap: bigint }) {
  global.fetch = jest.fn(async (_url: unknown, init?: { body?: unknown }) => {
    const { method, params } = JSON.parse(String(init?.body));
    let result: string | undefined;
    if (method === 'eth_getCode') result = '0x';
    if (method === 'eth_call' && params[0].to === VAULT && params[0].data === '0x9937d635') {
      result = word(state.perReleaseCap);
    }
    return { json: async () => (result ? { result } : { error: { message: 'unexpected call' } }) } as Response;
  }) as unknown as typeof fetch;
}

function renderPage() {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  render(
    <QueryClientProvider client={queryClient}>
      <Migration />
    </QueryClientProvider>,
  );
}

beforeAll(() => jest.spyOn(console, 'log').mockImplementation(() => undefined));
beforeEach(() => {
  mockSubmit.mockReset().mockResolvedValue({ nonce: 1n, recipient: DESTINATION, palletAmount: 500n * 10n ** 12n });
  mockTarget = { baseRpcUrl: 'https://base.example', vaultAddress: VAULT, baseExplorerUrl: 'https://basescan.org' };
  mockBaseRpc({ perReleaseCap: 1_000_000n * PEN });
});

describe('migration vault configuration', () => {
  it.each([
    ['missing', undefined],
    ['malformed', '0x1234'],
    ['the zero address', '0x0000000000000000000000000000000000000000'],
  ])('shows a configuration error instead of the form when the vault address is %s', (_label, vaultAddress) => {
    mockTarget = vaultAddress === undefined ? undefined : { ...mockTarget!, vaultAddress };
    renderPage();
    expect(screen.getByText(/no valid migration vault address/)).toBeInTheDocument();
    expect(screen.queryByPlaceholderText('0x…')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Migrate/ })).not.toBeInTheDocument();
  });

  it('shows the form when the vault address is valid', async () => {
    renderPage();
    expect(screen.queryByText(/no valid migration vault address/)).not.toBeInTheDocument();
    await userEvent.type(screen.getByPlaceholderText('0.0'), '500');
    await userEvent.type(screen.getByPlaceholderText('0x…'), DESTINATION);
    await userEvent.click(screen.getByLabelText(/irreversible/));
    await userEvent.click(await screen.findByRole('button', { name: 'Migrate PEN to Base' }));
    expect(mockSubmit).toHaveBeenCalledWith('500000000000000', toChecksumAddress(DESTINATION), expect.anything());
  });
});
