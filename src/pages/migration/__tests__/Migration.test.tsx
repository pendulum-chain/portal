import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MigrationTargetConfig } from '../../../constants/migration';
import { toChecksumAddress } from '../../../helpers/ethereum';
import { showToast } from '../../../shared/showToast';
import Migration from '..';

const VAULT = '0xB421bFBa72328Bc7F97755Eed236762a0c758C59';
const DESTINATION = '0x00000000000000000000000000000000deadbeef';

const mockSubmit = jest.fn();
let mockTarget: MigrationTargetConfig | undefined;
let mockWalletSource = 'polkadot-js';
let mockDestinationNonce = '0x5';
let mockReleaseStatus: { released: boolean; approvals: number; threshold: number } | undefined;

jest.mock('../../../GlobalStateProvider', () => ({
  useGlobalState: () => ({
    walletAccount: { address: '5Grw', source: mockWalletSource, signer: {} },
    tenantName: 'pendulum',
  }),
}));
jest.mock('../../../NodeInfoProvider', () => ({
  useNodeInfoState: () => ({
    state: {
      api: { tx: { tokenMigration: { migrate: { callIndex: new Uint8Array([102, 0]) } } } },
      tokenSymbol: 'PEN',
      tokenDecimals: 12,
    },
  }),
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
jest.mock('../../../constants/migration', () => {
  const { isValidEip55Address } = jest.requireActual('../../../helpers/ethereum');
  return {
    getMigrationTarget: () => mockTarget,
    getConfiguredMigrationTarget: () =>
      mockTarget && isValidEip55Address(mockTarget.vaultAddress) ? mockTarget : undefined,
  };
});
jest.mock('../../../hooks/migration/useBaseReleaseStatus', () => ({
  useBaseReleaseStatus: () => ({ data: mockReleaseStatus }),
  useReleaseTxHash: () => ({ data: undefined }),
}));
jest.mock('../../../shared/showToast', () => ({
  ToastMessage: { WARNING: 'WARNING', ERROR: 'ERROR', NO_WALLET_SELECTED: 'NO_WALLET_SELECTED' },
  showToast: jest.fn(),
}));

const TOKEN = '0x2222222222222222222222222222222222222222';
const word = (value: bigint) => `0x${value.toString(16).padStart(64, '0')}`;
const PEN = 10n ** 18n;

interface VaultFixture {
  paused: boolean;
  token: string;
  perReleaseCap: bigint;
  dailyCap: bigint;
  available: bigint;
  pending: bigint;
  balance: bigint;
  failReads?: boolean;
  chainId?: string;
}
const healthyVault: VaultFixture = {
  paused: false,
  token: TOKEN,
  perReleaseCap: 1_000_000n * PEN,
  dailyCap: 2_000_000n * PEN,
  available: 1_500_000n * PEN,
  pending: 250_000n * PEN,
  balance: 10n ** 8n * PEN,
};

// Fake Base RPC: the token is a contract, any other destination a regular
// account with mockDestinationNonce, and the vault answers with the given
// state. Any other call fails.
function mockBaseRpc(vault: VaultFixture) {
  const vaultWord = VAULT.slice(2).toLowerCase().padStart(64, '0');
  global.fetch = jest.fn(async (_url: unknown, init?: { body?: unknown }) => {
    const { method, params } = JSON.parse(String(init?.body));
    const { to, data } = params[0] ?? {};
    let result: string | undefined;
    if (method === 'eth_chainId') result = vault.chainId ?? '0x2105';
    if (method === 'eth_getCode') result = params[0] === vault.token ? '0x6080' : '0x';
    if (method === 'eth_getTransactionCount') result = mockDestinationNonce;
    if (method === 'eth_call' && to === VAULT && !vault.failReads) {
      result = {
        '0x5c975abb': word(vault.paused ? 1n : 0n),
        '0xfc0c546a': word(BigInt(vault.token)),
        '0x9937d635': word(vault.perReleaseCap),
        '0xeb339391': word(vault.dailyCap),
        '0xed5c5de4': word(vault.available),
        '0x3cc11b05': word(vault.pending),
      }[data as string];
    }
    if (method === 'eth_call' && to === vault.token && data === `0x70a08231${vaultWord}`) result = word(vault.balance);
    return { json: async () => (result ? { result } : { error: { message: 'unexpected call' } }) } as Response;
  }) as unknown as typeof fetch;
}

async function fillForm(amount: string) {
  await userEvent.type(screen.getByPlaceholderText('0.0'), amount);
  await userEvent.type(screen.getByPlaceholderText('0x…'), DESTINATION);
  await userEvent.click(screen.getByLabelText(/irreversible/));
}

function renderPage() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
    logger: { log: () => undefined, warn: () => undefined, error: () => undefined },
  });
  render(
    <QueryClientProvider client={queryClient}>
      <Migration />
    </QueryClientProvider>,
  );
  return queryClient;
}

beforeAll(() => jest.spyOn(console, 'log').mockImplementation(() => undefined));
beforeEach(() => {
  mockWalletSource = 'polkadot-js';
  mockDestinationNonce = '0x5';
  mockReleaseStatus = undefined;
  mockSubmit.mockReset().mockResolvedValue({ nonce: 1n, recipient: DESTINATION, palletAmount: 500n * 10n ** 12n });
  mockTarget = {
    baseRpcUrl: 'https://base.example',
    vaultAddress: VAULT,
    baseChainId: '0x2105',
    baseExplorerUrl: 'https://basescan.org',
  };
  mockBaseRpc(healthyVault);
});

describe('migration vault configuration', () => {
  it.each([
    ['missing', undefined],
    ['malformed', '0x1234'],
    ['mixed case with a bad checksum', `0xb${VAULT.slice(3)}`],
    ['the zero address', '0x0000000000000000000000000000000000000000'],
  ])('shows a configuration error instead of the form when the vault address is %s', (_label, vaultAddress) => {
    mockTarget = vaultAddress === undefined ? undefined : { ...mockTarget!, vaultAddress };
    renderPage();
    expect(screen.getByText(/not open yet/)).toBeInTheDocument();
    expect(screen.queryByPlaceholderText('0x…')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Migrate/ })).not.toBeInTheDocument();
  });

  it('shows the form when the vault address is valid', async () => {
    renderPage();
    expect(screen.queryByText(/not open yet/)).not.toBeInTheDocument();
    await fillForm('500');
    await userEvent.click(await screen.findByRole('button', { name: 'Migrate PEN to Base' }));
    expect(mockSubmit).toHaveBeenCalledWith('500000000000000', toChecksumAddress(DESTINATION), expect.anything());
  });
});

describe('vault state on Base', () => {
  it.each([
    ['the vault is paused', { ...healthyVault, paused: true }, /Releases on Base are currently paused/],
    ['no token is set', { ...healthyVault, token: '0x0000000000000000000000000000000000000000' }, /not set up yet/],
    ['the per-release cap is 0', { ...healthyVault, perReleaseCap: 0n }, /currently suspended/],
    ['the vault state cannot be read', { ...healthyVault, failReads: true }, /could not read the state/],
    ['the Base RPC is on another chain', { ...healthyVault, chainId: '0x14a34' }, /could not read the state/],
  ])('refuses submission when %s', async (_label, vault, banner) => {
    mockBaseRpc(vault);
    renderPage();
    expect(await screen.findByText(banner)).toBeInTheDocument();
    await fillForm('500');
    const button = await screen.findByRole('button', { name: 'Migrate PEN to Base' });
    expect(button).toBeDisabled();
    expect(screen.queryByLabelText(/may be delayed/)).not.toBeInTheDocument();
    expect(screen.queryByText(/500 PEN/)).not.toBeInTheDocument();
    await userEvent.click(button);
    expect(mockSubmit).not.toHaveBeenCalled();
  });

  it.each([
    ['the vault was paused', { ...healthyVault, paused: true }, /Releases on Base are currently paused/],
    ['the vault state cannot be read', { ...healthyVault, failReads: true }, /could not read the state/],
    ['the Base RPC is on another chain', { ...healthyVault, chainId: '0x1' }, /could not read the state/],
  ])('re-reads the vault state before the burn and refuses it when %s', async (_label, vault, banner) => {
    renderPage();
    await fillForm('500');
    const button = await screen.findByRole('button', { name: 'Migrate PEN to Base' });
    expect(button).toBeEnabled();
    mockBaseRpc(vault);
    await userEvent.click(button);
    expect(mockSubmit).not.toHaveBeenCalled();
    expect(showToast).toHaveBeenCalledWith('WARNING', expect.stringMatching(banner));
    expect(await screen.findByText(banner)).toBeInTheDocument();
  });

  it('refuses the burn when the re-read before it ends without the vault state', async () => {
    const queryClient = renderPage();
    await fillForm('500');
    const button = await screen.findByRole('button', { name: 'Migrate PEN to Base' });
    global.fetch = jest.fn(() => new Promise(() => undefined)) as unknown as typeof fetch;
    await userEvent.click(button);
    // A reset while the re-read is in flight leaves it with neither data nor an error.
    act(() => {
      void queryClient.resetQueries(['migration', 'vaultState']);
    });
    await waitFor(() =>
      expect(showToast).toHaveBeenCalledWith('WARNING', expect.stringMatching(/could not read the state/)),
    );
    expect(mockSubmit).not.toHaveBeenCalled();
  });

  it('asks for the acknowledgement when the re-read before the burn lowers the per-release cap', async () => {
    renderPage();
    await fillForm('500');
    const button = await screen.findByRole('button', { name: 'Migrate PEN to Base' });
    expect(screen.queryByLabelText(/may be delayed/)).not.toBeInTheDocument();
    mockBaseRpc({ ...healthyVault, perReleaseCap: 200n * PEN });
    await userEvent.click(button);
    expect(mockSubmit).not.toHaveBeenCalled();
    expect(showToast).toHaveBeenCalledWith('WARNING', expect.stringMatching(/vault state on Base changed/));
    await userEvent.click(await screen.findByLabelText(/may be delayed/));
    await userEvent.click(screen.getByRole('button', { name: 'Migrate PEN to Base' }));
    expect(mockSubmit).toHaveBeenCalledWith('500000000000000', toChecksumAddress(DESTINATION), expect.anything());
  });

  it('accepts the expected chain id in decimal', async () => {
    mockTarget = { ...mockTarget!, baseChainId: '8453' };
    renderPage();
    await fillForm('500');
    await userEvent.click(await screen.findByRole('button', { name: 'Migrate PEN to Base' }));
    expect(mockSubmit).toHaveBeenCalled();
  });

  it('keeps submission disabled while the vault state is loading', async () => {
    global.fetch = jest.fn(() => new Promise(() => undefined)) as unknown as typeof fetch;
    renderPage();
    await fillForm('500');
    const button = screen.getByRole('button', { name: /Verifying/ });
    expect(button).toBeDisabled();
    await userEvent.click(button);
    expect(mockSubmit).not.toHaveBeenCalled();
  });

  it('asks for an acknowledgement when the vault holds less than the amount', async () => {
    mockBaseRpc({ ...healthyVault, balance: 200n * PEN });
    renderPage();
    await fillForm('500');
    expect(await screen.findByText(/more than the migration vault on Base currently holds/)).toBeInTheDocument();
    await userEvent.click(await screen.findByRole('button', { name: 'Migrate PEN to Base' }));
    expect(mockSubmit).not.toHaveBeenCalled();
    await userEvent.click(screen.getByLabelText(/may be delayed/));
    await userEvent.click(screen.getByRole('button', { name: 'Migrate PEN to Base' }));
    expect(mockSubmit).toHaveBeenCalledWith('500000000000000', toChecksumAddress(DESTINATION), expect.anything());
  });

  it('asks for an acknowledgement above the per-release cap', async () => {
    mockBaseRpc({ ...healthyVault, perReleaseCap: 200n * PEN });
    renderPage();
    await fillForm('500');
    expect(await screen.findByText(/above the vault.s/)).toBeInTheDocument();
    await userEvent.click(await screen.findByRole('button', { name: 'Migrate PEN to Base' }));
    expect(mockSubmit).not.toHaveBeenCalled();
  });

  it('asks again when a re-read of the vault adds a reason for the delay', async () => {
    mockBaseRpc({ ...healthyVault, perReleaseCap: 200n * PEN });
    const queryClient = renderPage();
    await fillForm('500');
    await userEvent.click(await screen.findByLabelText(/may be delayed/));
    expect(screen.getByLabelText(/may be delayed/)).toBeChecked();

    mockBaseRpc({ ...healthyVault, perReleaseCap: 200n * PEN, balance: 200n * PEN });
    await act(() => queryClient.refetchQueries(['migration', 'vaultState']));
    expect(await screen.findByText(/more than the migration vault on Base currently holds/)).toBeInTheDocument();
    expect(screen.getByLabelText(/may be delayed/)).not.toBeChecked();
    await userEvent.click(screen.getByRole('button', { name: 'Migrate PEN to Base' }));
    expect(mockSubmit).not.toHaveBeenCalled();
  });
});

describe('release capacity panel', () => {
  it('shows the daily allowance, the caps and what is queued', async () => {
    renderPage();
    expect(screen.getByText(/Release capacity on Base: loading/)).toBeInTheDocument();
    expect(await screen.findByText('1,500,000 of 2,000,000 PEN available now')).toBeInTheDocument();
    const bar = screen.getByRole('progressbar', { name: /available now/ });
    expect(bar).toHaveAttribute('value', '1500000');
    expect(bar).toHaveAttribute('max', '2000000');
    expect(screen.getByText(/refills at 83,333.33 PEN per hour/)).toBeInTheDocument();
    expect(screen.getByText('Per-release cap').nextSibling).toHaveTextContent('1,000,000 PEN');
    expect(screen.getByText('Queued for release').nextSibling).toHaveTextContent('250,000 PEN');
  });

  it('says when the capacity cannot be read', async () => {
    mockBaseRpc({ ...healthyVault, failReads: true });
    renderPage();
    expect(await screen.findByText(/Release capacity on Base: could not be read/)).toBeInTheDocument();
  });

  it.each([
    ['fits now', healthyVault, '500', /500 PEN fits the capacity available now/],
    [
      'waits for the allowance',
      { ...healthyVault, perReleaseCap: 1_200n * PEN, dailyCap: 2_400n * PEN, available: 200n * PEN },
      '500',
      /500 PEN waits for the daily allowance: roughly 3 hours at the current refill rate, if nothing else is queued/,
    ],
    [
      'is above the per-release cap',
      { ...healthyVault, perReleaseCap: 200n * PEN },
      '500',
      /500 PEN is above the per-release cap.*waiting does not release it/,
    ],
    [
      'is more than the vault holds',
      { ...healthyVault, balance: 200n * PEN },
      '500',
      /500 PEN is more than the vault holds/,
    ],
  ])('tells whether the entered amount %s', async (_label, vault, amount, hint) => {
    mockBaseRpc(vault);
    renderPage();
    await fillForm(amount);
    expect(await screen.findByText(hint)).toBeInTheDocument();
  });
});

describe('release status after the burn', () => {
  it.each([
    ['fits the caps', healthyVault, /completes automatically once capacity frees up/],
    [
      'is above the per-release cap',
      { ...healthyVault, perReleaseCap: 200n * PEN },
      /held: the amount is above the vault.s per-release cap.*Waiting alone does not release it/,
    ],
    ['is above the vault balance', { ...healthyVault, balance: 200n * PEN }, /held until the migration vault on Base/],
  ])('describes an approved but unreleased migration that %s', async (_label, vault, text) => {
    mockReleaseStatus = { released: false, approvals: 3, threshold: 3 };
    const queryClient = renderPage();
    await fillForm('500');
    await userEvent.click(await screen.findByRole('button', { name: 'Migrate PEN to Base' }));
    expect(await screen.findByText(/Migration #1 submitted/)).toBeInTheDocument();
    mockBaseRpc(vault);
    await act(() => queryClient.refetchQueries(['migration', 'vaultState']));
    expect(await screen.findByText(text)).toBeInTheDocument();
  });
});

describe('form during submission', () => {
  // Holds every Base RPC call until the returned function is called.
  function holdBaseRpc() {
    const fetchNow = global.fetch as jest.Mock;
    let release: () => void = () => undefined;
    const gate = new Promise<void>((resolve) => (release = resolve));
    global.fetch = jest.fn(async (url: unknown, init?: unknown) => {
      await gate;
      return fetchNow(url, init);
    }) as unknown as typeof fetch;
    return release;
  }

  it('locks the inputs until the submission has ended', async () => {
    renderPage();
    await fillForm('500');
    const button = await screen.findByRole('button', { name: 'Migrate PEN to Base' });
    const release = holdBaseRpc();
    await userEvent.click(button);
    expect(screen.getByPlaceholderText('0x…')).toBeDisabled();
    expect(screen.getByPlaceholderText('0.0')).toBeDisabled();
    expect(screen.getByLabelText(/irreversible/)).toBeDisabled();
    release();
    expect(await screen.findByText(/Migration #1 submitted/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('0x…')).toBeEnabled();
  });

  it.each([
    ['address', '0x…', '0x00000000000000000000000000000000cafebabe'],
    ['amount', '0.0', '5000'],
  ])('refuses the burn when the %s changed after the click', async (_label, placeholder, value) => {
    renderPage();
    await fillForm('500');
    const button = await screen.findByRole('button', { name: 'Migrate PEN to Base' });
    const release = holdBaseRpc();
    await userEvent.click(button);
    // The inputs are locked; this stands for a change that bypasses the lock.
    fireEvent.change(screen.getByPlaceholderText(placeholder), { target: { value } });
    release();
    await waitFor(() =>
      expect(showToast).toHaveBeenCalledWith('WARNING', expect.stringMatching(/changed after you clicked/)),
    );
    expect(mockSubmit).not.toHaveBeenCalled();
  });
});

describe('destination check before signing', () => {
  it('refuses the PEN token contract even after the contract warning is ticked', async () => {
    renderPage();
    await userEvent.type(screen.getByPlaceholderText('0.0'), '500');
    await userEvent.type(screen.getByPlaceholderText('0x…'), TOKEN);
    await userEvent.click(screen.getByLabelText(/irreversible/));
    await userEvent.click(await screen.findByLabelText(/can receive ERC-20 tokens/));
    await userEvent.click(await screen.findByRole('button', { name: 'Migrate PEN to Base' }));
    expect(await screen.findByText(/That is the PEN token contract/)).toBeInTheDocument();
    expect(mockSubmit).not.toHaveBeenCalled();
  });

  it('reminds the user to check a destination that was never used on Base', async () => {
    mockDestinationNonce = '0x0';
    renderPage();
    await userEvent.type(screen.getByPlaceholderText('0x…'), DESTINATION);
    expect(await screen.findByText(/never sent a transaction on Base/)).toHaveTextContent(
      /If it is a Safe or another smart wallet, make sure it exists on Base and that you control it there/,
    );
  });

  it('offers no migration with the MetaMask Polkadot snap', async () => {
    mockWalletSource = 'metamask';
    renderPage();
    expect(screen.getByText(/does not show the call it signs/)).toBeInTheDocument();
    expect(screen.queryByPlaceholderText('0x…')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Migrate/ })).not.toBeInTheDocument();
  });

  it('shows the exact destination and how to check it in the wallet', async () => {
    renderPage();
    expect(screen.queryByText(/Your wallet will ask you to sign/)).not.toBeInTheDocument();
    await userEvent.type(screen.getByPlaceholderText('0x…'), DESTINATION);
    expect(screen.getByText(toChecksumAddress(DESTINATION))).toBeInTheDocument();
    expect(screen.getByText(/Your wallet will ask you to sign/)).toHaveTextContent(
      /check that base_address \(or baseAddress\) is your own Base address as shown in your Base wallet, not only on this page.*must start with 0x6600 and end with your Base address.*00000000000000000000000000000000deadbeef/,
    );
  });
});
