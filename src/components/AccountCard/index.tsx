import { WalletAccount } from '@talismn/connect-wallets';
import { trimAddress } from '../../helpers/addressFormatter';
import { useGlobalState } from '../../GlobalStateProvider';
import ChainLogo from '../../assets/ChainLogo';

interface AccountProps {
  account: WalletAccount;
}

export const AccountCard = ({ account }: AccountProps) => {
  const { setWalletAccount } = useGlobalState();

  return (
    <li className="w-full">
      <button
        aria-label={`Select ${account.address}`}
        className="flex w-full cursor-pointer items-center rounded border-l-2 border-transparent p-1.5 hover:border-primary hover:bg-base-100"
        onClick={() => setWalletAccount(account)}
      >
        <ChainLogo className="h-8 w-8" />
        <p className="ml-2.5">
          {account.name} | {trimAddress(account.address)}
        </p>
      </button>
    </li>
  );
};
