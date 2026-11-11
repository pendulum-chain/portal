import { renderHook } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { WalletAccount } from '@talismn/connect-wallets';
import { useMigrationPallet } from '../useMigrationPallet';

const RECIPIENT = '0x1111111111111111111111111111111111111111';

const signAndSend = jest.fn();
const migrate = jest.fn(() => ({ signAndSend }));

jest.mock('../../../NodeInfoProvider', () => ({
  useNodeInfoState: () => ({
    state: {
      tokenDecimals: 12,
      api: {
        tx: { tokenMigration: { migrate } },
        consts: {
          tokenMigration: { minimumMigrationAmount: { toString: () => '100000000000000' } },
          balances: { existentialDeposit: { toString: () => '1000000000' } },
        },
        query: { tokenMigration: { paused: jest.fn().mockResolvedValue({ toPrimitive: () => false }) } },
      },
    },
  }),
}));

jest.mock('../../../helpers/substrate', () => ({ getErrors: () => [] }));

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={new QueryClient()}>{children}</QueryClientProvider>
);

describe('useMigrationPallet', () => {
  it('lets the wallet return the signed transaction and resolves with the finalized migration', async () => {
    const signer = { signPayload: jest.fn() };
    signAndSend.mockImplementation((_address, _options, callback) => {
      callback({
        status: { isInBlock: false, isFinalized: true },
        events: [
          {
            event: {
              section: 'tokenMigration',
              method: 'MigrationInitiated',
              data: [
                { toString: () => '7' },
                'sender',
                { toHex: () => RECIPIENT },
                { toString: () => '150000000000000' },
              ],
            },
          },
        ],
      });
      return Promise.resolve(() => undefined);
    });

    const { result } = renderHook(() => useMigrationPallet(), { wrapper });
    const migration = await result.current.submitMigration('150000000000000', RECIPIENT, {
      address: '6abc',
      signer,
    } as unknown as WalletAccount);

    expect(migrate).toHaveBeenCalledWith('150000000000000', RECIPIENT);
    expect(signAndSend).toHaveBeenCalledWith('6abc', { signer, withSignedTransaction: true }, expect.any(Function));
    expect(migration).toEqual({ nonce: 7n, recipient: RECIPIENT, palletAmount: 150000000000000n });
  });
});
