import { ArrowTrendingUpIcon } from '@heroicons/react/20/solid';
import { WalletSelect } from '@talismn/connect-components';
import { Button, Dropdown } from 'react-daisyui';
import { useGlobalState } from '../GlobalStateProvider';
import { useNodeInfoState } from '../NodeInfoProvider';
import { getAddressForFormat, trimAddress } from '../helpers/addressFormatter';
import { useAccountBalance } from '../hooks/useAccountBalance';
import { Skeleton } from './Skeleton';

const OpenWallet = ({ networkName }: { networkName: string }): JSX.Element => {
  const { walletAccount, setWalletAccount, removeWalletAccount } = useGlobalState();
  const { wallet, address } = walletAccount || {};
  const { query, balance } = useAccountBalance();
  const { ss58Format, tokenSymbol } = useNodeInfoState().state;

  return (
    <>
      {address ? (
        <Dropdown vertical="end">
          <Button
            size="sm"
            color="ghost"
            className="text-sm border-1 border-gray-300 bg-white h-9"
            title={wallet?.title}
          >
            {query.isLoading ? (
              <Skeleton className="bg-[rgba(0,0,0,.05)] px-1 py-1 mr-2">10000.00 TKN</Skeleton>
            ) : (
              <span className="flex items-center bg-[rgba(0,0,0,.05)] px-1 py-0.5 mr-2 rounded-lg">
                <ArrowTrendingUpIcon className="w-5 h-5 mr-1 text-primary" /> {balance} {tokenSymbol}
              </span>
            )}
            {trimAddress(ss58Format ? getAddressForFormat(address, ss58Format) : address, 4)}
            <img src={wallet?.logo?.src || ''} className="w-[20px] ml-2" alt={wallet?.logo?.alt || ''} />
          </Button>
          <Dropdown.Menu className="w-40 p-1">
            <Dropdown.Item onClick={removeWalletAccount}>Disconnect</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <WalletSelect
          dappName={networkName}
          open={false}
          showAccountsList={true}
          triggerComponent={
            <Button size="sm" color="primary">
              Connect to Wallet
            </Button>
          }
          onAccountSelected={setWalletAccount}
        />
      )}
    </>
  );
};

export default OpenWallet;
