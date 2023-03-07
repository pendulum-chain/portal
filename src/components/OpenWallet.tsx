import { ArrowTrendingUpIcon } from '@heroicons/react/24/outline';
import { WalletSelect } from '@talismn/connect-components';
import { WalletAccount } from '@talismn/connect-wallets';
import { useCallback, useMemo } from 'preact/hooks';
import { Button } from 'react-daisyui';
import { GlobalStateInterface } from '../GlobalStateProvider';
import addressFormatter from '../helpers/addressFormatter';
import { useAccountBalance } from '../hooks/useAccountBalance';
import { useNodeInfoState } from '../NodeInfoProvider';
import { Skeleton } from './Skeleton';

const OpenWallet = ({ networkName }: { networkName: string }): JSX.Element => {
  const { state: infoState } = useNodeInfoState();
  const { query, balance, globalState } = useAccountBalance();
  const { tokenSymbol } = infoState;
  const { state, setState } = globalState;
  const { address, wallet } = state.walletAccount || {};

  const updateGlobalAccount = useCallback(
    (account: WalletAccount) => {
      setState((prevState) => {
        const newState: Partial<GlobalStateInterface> = {
          ...prevState,
          ...{
            walletAccount: account,
          },
        };
        return newState;
      });
    },
    [setState],
  );

  const ConnectButton = useMemo(
    () =>
      address ? (
        <Button
          size="sm"
          className="text-sm h-10 border-1 border-gray-200 bg-white"
          title={wallet?.title}
          endIcon={
            <img
              src={wallet?.logo?.src || ''}
              style={{ width: 20 }}
              alt={wallet?.logo?.alt || ''}
            />
          }
        >
          {query.isLoading ? (
            <Skeleton className="bg-gray-100 px-2 py-1">10000.00 TKN</Skeleton>
          ) : (
            <span className="flex items-center bg-gray-100 px-2 py-1 rounded-lg">
              <ArrowTrendingUpIcon className="w-5 h-5 mr-1 text-primary" />{' '}
              {balance} {tokenSymbol}
            </span>
          )}
          {addressFormatter(address, 3)}
        </Button>
      ) : (
        <Button size="sm" color="primary">
          Connect to Wallet
        </Button>
      ),
    [address, balance, query.isLoading, tokenSymbol, wallet],
  );

  return (
    <WalletSelect
      dappName={networkName}
      open={false}
      showAccountsList={true}
      triggerComponent={ConnectButton}
      onAccountSelected={(account) => {
        updateGlobalAccount(account);
      }}
    />
  );
};

export default OpenWallet;
