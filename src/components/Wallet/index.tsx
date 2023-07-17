import { ArrowLeftOnRectangleIcon } from '@heroicons/react/20/solid';
import { WalletSelect } from '@talismn/connect-components';
import { Button, Dropdown } from 'react-daisyui';
import { useGlobalState } from '../../GlobalStateProvider';
import { useNodeInfoState } from '../../NodeInfoProvider';
import { getAddressForFormat, trimAddress } from '../../helpers/addressFormatter';
import { useAccountBalance } from '../../hooks/useAccountBalance';
import { Skeleton } from '../Skeleton';
import WalletConnect from './WalletConnect';

const OpenWallet = ({ dAppName }: { dAppName: string }): JSX.Element => {
  const { walletAccount, setWalletAccount, removeWalletAccount } = useGlobalState();
  const { wallet, address } = walletAccount || {};
  const { query, balance } = useAccountBalance();
  const { ss58Format, tokenSymbol } = useNodeInfoState().state;

  const trimmedAddress = address
    ? trimAddress(ss58Format ? getAddressForFormat(address, ss58Format) : address, 4)
    : undefined;
  return (
    <>
      {trimmedAddress ? (
        <Dropdown vertical="end" end>
          <Button
            size="sm"
            color="ghost"
            className="text-sm border-base-300 border-1 bg-base-200 min-h-[2.1rem] h-auto px-1 sm:px-3"
            title={wallet?.title}
          >
            {query.isLoading ? (
              <Skeleton className="bg-[rgba(0,0,0,.06)] px-2 py-1 mr-2 hidden sm:flex">10000.00 TKN</Skeleton>
            ) : (
              <span className="items-center bg-[rgba(0,0,0,.06)] px-2 py-0.5 mr-2 rounded-lg hidden sm:flex">
                {balance} {tokenSymbol}
              </span>
            )}
            {trimmedAddress}
            <img src={wallet?.logo?.src || ''} className="w-[20px] ml-2" alt={wallet?.logo?.alt || ''} />
          </Button>
          <Dropdown.Menu className="card card-compact bg-base-200 shadow-lg min-w-[240px] p-3">
            <div className="flex items-center gap-2 text-neutral-500">
              <strong>{trimmedAddress}</strong>
            </div>
            <p className="truncate my-6 text-center text-2xl font-bold" title={`${balance} ${tokenSymbol}`}>
              {balance} {tokenSymbol}
            </p>
            <Button className="bg-base-300" size="sm" onClick={removeWalletAccount}>
              <ArrowLeftOnRectangleIcon className="mr-2 w-5" />
              Disconnect
            </Button>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <>
          <WalletSelect
            dappName={dAppName}
            open={false}
            showAccountsList={true}
            triggerComponent={
              <Button size="sm" className={`text-sm min-h-[2.1rem] h-auto px-1 sm:px-3`} color="primary">
                Connect to Wallet
              </Button>
            }
            onAccountSelected={setWalletAccount}
            footer={<WalletConnect setWalletAccount={setWalletAccount} />}
          />
        </>
      )}
    </>
  );
};

export default OpenWallet;
