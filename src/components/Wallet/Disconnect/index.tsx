import { Wallet, WalletAccount } from '@talismn/connect-wallets';
import { UseQueryResult } from '@tanstack/react-query';
import { FrameSystemAccountInfo } from '@polkadot/types/lookup';

import { ArrowLeftEndOnRectangleIcon } from '@heroicons/react/20/solid';
import { Button, Dropdown } from 'react-daisyui';
import { getAddressForFormat } from '../../../helpers/addressFormatter';
import { useNodeInfoState } from '../../../NodeInfoProvider';
import { useAccountBalance } from '../../../shared/useAccountBalance';
import { useGlobalState } from '../../../GlobalStateProvider';
import { CopyableAddress } from '../../PublicKey';
import { Skeleton } from '../../Skeleton';

interface WalletButtonProps {
  wallet?: Wallet;
  query: UseQueryResult<FrameSystemAccountInfo | undefined, unknown>;
  balance?: string;
  tokenSymbol?: string;
  walletAccount?: WalletAccount;
}

const WalletButton = ({ wallet, query, balance, tokenSymbol, walletAccount }: WalletButtonProps) => (
  <Button
    size="sm"
    color="ghost"
    className="text-sm border-base-300 border-1 bg-base-200 min-h-[2.1rem] h-auto px-1 sm:px-3"
    title={wallet?.title}
    type="button"
  >
    {query.isLoading ? (
      <Skeleton className="bg-[rgba(0,0,0,.06)] px-2 py-1 mr-2 hidden sm:flex">10000.00 TKN</Skeleton>
    ) : (
      <span className="items-center bg-[rgba(0,0,0,.06)] px-2 py-0.5 mr-2 rounded-lg hidden sm:flex">
        {balance} {tokenSymbol}
      </span>
    )}
    {walletAccount?.name}
    <img src={wallet?.logo?.src || ''} className="w-[20px] ml-2" alt={wallet?.logo?.alt || ''} />
  </Button>
);

interface WalletDropdownMenuProps {
  address: string;
  balance?: string;
  tokenSymbol?: string;
  walletAccount?: WalletAccount;
  ss58Format?: number;
  removeWalletAccount: () => void;
}

const WalletDropdownMenu = ({
  walletAccount,
  ss58Format,
  address,
  balance,
  tokenSymbol,
  removeWalletAccount,
}: WalletDropdownMenuProps) => (
  <Dropdown.Menu className="text-center border border-base-300 bg-base-200 shadow-lg min-w-[240px] p-3 mt-2">
    <div className="text-sm text-neutral-400">{walletAccount?.name}</div>
    <div className="text-neutral-500">
      <CopyableAddress
        publicKey={ss58Format ? getAddressForFormat(address, ss58Format) : address}
        variant="short"
        inline={true}
      />
    </div>
    <p className="truncate my-6 text-center text-2xl font-bold" title={`${balance} ${tokenSymbol}`}>
      {balance} {tokenSymbol}
    </p>
    <Button className="bg-base-300" size="sm" onClick={removeWalletAccount}>
      <ArrowLeftEndOnRectangleIcon className="mr-2 w-5" />
      Disconnect
    </Button>
  </Dropdown.Menu>
);

export const Disconnect = () => {
  const { walletAccount, removeWalletAccount } = useGlobalState();
  const { query, balance } = useAccountBalance();
  const { ss58Format, tokenSymbol } = useNodeInfoState().state;
  const { wallet, address } = walletAccount || {};

  if (!address) return <></>;

  return (
    <Dropdown vertical="bottom">
      <WalletButton
        wallet={wallet}
        query={query}
        balance={balance}
        tokenSymbol={tokenSymbol}
        walletAccount={walletAccount}
      />
      <WalletDropdownMenu
        walletAccount={walletAccount}
        ss58Format={ss58Format}
        address={address}
        balance={balance}
        tokenSymbol={tokenSymbol}
        removeWalletAccount={removeWalletAccount}
      />
    </Dropdown>
  );
};
