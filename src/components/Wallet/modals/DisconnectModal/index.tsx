import { Wallet, WalletAccount } from '@talismn/connect-wallets';
import { UseQueryResult } from '@tanstack/react-query';
import { FrameSystemAccountInfo } from '@polkadot/types/lookup';
import { ArrowLeftEndOnRectangleIcon } from '@heroicons/react/20/solid';
import { Button, Dropdown } from 'react-daisyui';

import { getAddressForFormat } from '../../../../helpers/addressFormatter';
import { useNodeInfoState } from '../../../../NodeInfoProvider';
import { useAccountBalance } from '../../../../shared/useAccountBalance';
import { useGlobalState } from '../../../../GlobalStateProvider';
import { CopyableAddress } from '../../../PublicKey';
import { Skeleton } from '../../../Skeleton';

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
    className="text-sm border-base-300 border-1 bg-base-200 min-h-[2.1rem] h-auto px-5 sm:px-3 overflow-hidden ellipsis max-w36 sm:max-w-fit"
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
    <p className="hidden sm:block truncate">{walletAccount?.name}</p>
    <img src={wallet?.logo?.src || ''} className="w-[20px] sm:ml-2" alt={wallet?.logo?.alt || ''} />
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
  <Dropdown.Menu className="text-center border border-base-300 bg-base-200 shadow-lg min-w-[240px] p-3 mt-2 right-0">
    <div className="text-sm text-neutral-400">{walletAccount?.name}</div>
    <div className="text-neutral-500">
      <CopyableAddress
        publicKey={ss58Format ? getAddressForFormat(address, ss58Format) : address}
        variant="short"
        inline={true}
      />
    </div>
    <p className="my-6 text-2xl font-bold text-center truncate" title={`${balance} ${tokenSymbol}`}>
      {balance} {tokenSymbol}
    </p>
    <Button className="bg-base-300" size="sm" onClick={removeWalletAccount}>
      <ArrowLeftEndOnRectangleIcon className="w-5 mr-2" />
      Disconnect
    </Button>
  </Dropdown.Menu>
);

export const DisconnectModal = () => {
  const { walletAccount, removeWalletAccount } = useGlobalState();
  const { query, balances } = useAccountBalance();
  const { ss58Format, tokenSymbol } = useNodeInfoState().state;
  const { wallet, address } = walletAccount || {};
  const { total: balance } = balances;

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
