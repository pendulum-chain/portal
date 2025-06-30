import { Wallet, WalletAccount } from '@talismn/connect-wallets';
import { UseQueryResult } from '@tanstack/react-query';
import { FrameSystemAccountInfo } from '@polkadot/types/lookup';
import { ArrowLeftEndOnRectangleIcon } from '@heroicons/react/20/solid';
import { Button, Dropdown } from 'react-daisyui';

import { getAddressForFormat } from '../../../../helpers/addressFormatter';
import { useNodeInfoState } from '../../../../NodeInfoProvider';
import { useAccountBalance } from '../../../../shared/useAccountBalance';
import { useGlobalState } from '../../../../GlobalStateProvider';
import { CopyablePublicKey } from '../../../PublicKey/CopyablePublicKey';
import { Skeleton } from '../../../Skeleton';
import { prettyNumbers } from '../../../../shared/parseNumbers/metric';

interface WalletButtonProps {
  wallet?: Wallet;
  query: UseQueryResult<FrameSystemAccountInfo | undefined, unknown>;
  balance?: number;
  tokenSymbol?: string;
  walletAccount?: WalletAccount;
}

const WalletButton = ({ wallet, query, balance, tokenSymbol, walletAccount }: WalletButtonProps) => (
  <Button
    size="sm"
    color="ghost"
    className="border-1 ellipsis max-w36 h-auto min-h-[2.1rem] overflow-hidden border-base-300 bg-base-200 px-5 text-sm sm:max-w-fit sm:px-3"
    title={wallet?.title}
    type="button"
  >
    {query.isLoading ? (
      <Skeleton className="mr-2 hidden bg-[rgba(0,0,0,.06)] px-2 py-1 sm:flex">10000.00 TKN</Skeleton>
    ) : (
      <span className="mr-2 hidden items-center rounded-lg bg-[rgba(0,0,0,.06)] px-2 py-0.5 sm:flex">
        {balance && prettyNumbers(balance)} {tokenSymbol}
      </span>
    )}
    <p className="hidden truncate sm:block">{walletAccount?.name}</p>
    <img src={wallet?.logo?.src || ''} className="w-[20px] sm:ml-2" alt={wallet?.logo?.alt || ''} />
  </Button>
);

interface WalletDropdownMenuProps {
  address: string;
  balance?: number;
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
  <Dropdown.Menu className="right-0 mt-2 min-w-[240px] border border-base-300 bg-base-200 p-3 text-center shadow-lg">
    <div className="text-sm text-neutral-400">{walletAccount?.name}</div>
    <div className="text-neutral-500">
      <CopyablePublicKey publicKey={getAddressForFormat(address, ss58Format)} variant="short" inline={true} />
    </div>
    <p className="my-6 truncate text-center text-2xl font-bold" title={`${balance} ${tokenSymbol}`}>
      {balance && prettyNumbers(balance)} {tokenSymbol}
    </p>
    <Button className="bg-base-300" size="sm" onClick={removeWalletAccount}>
      <ArrowLeftEndOnRectangleIcon className="mr-2 w-5" />
      Disconnect
    </Button>
  </Dropdown.Menu>
);

export const DisconnectModal = () => {
  const { walletAccount, removeWalletAccount } = useGlobalState();
  const { ss58Format, tokenSymbol } = useNodeInfoState().state;
  const { wallet, address } = walletAccount || {};

  const { query, balances } = useAccountBalance();
  const { transferable: transferableBalance } = balances;

  if (!address) return <></>;

  return (
    <Dropdown vertical="bottom">
      <WalletButton
        wallet={wallet}
        query={query}
        balance={transferableBalance}
        tokenSymbol={tokenSymbol}
        walletAccount={walletAccount}
      />
      <WalletDropdownMenu
        walletAccount={walletAccount}
        ss58Format={ss58Format}
        address={address}
        balance={transferableBalance}
        tokenSymbol={tokenSymbol}
        removeWalletAccount={removeWalletAccount}
      />
    </Dropdown>
  );
};
