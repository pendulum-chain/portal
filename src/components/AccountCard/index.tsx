import { WalletAccount } from '@talismn/connect-wallets';
import pendulumIcon from '../../assets/pendulum-icon.svg';
import { trimAddress } from '../../helpers/addressFormatter';
import { useGlobalState } from '../../GlobalStateProvider';

interface AccountProps {
  account: WalletAccount;
}

export const Account = ({ account }: AccountProps) => {
  const { setWalletAccount } = useGlobalState();
  return (
    <li className="w-full">
      <button
        aria-label={`Select ${account.address}`}
        className="flex hover:border-l-2 hover:border-primary px-1.5 py-3 text-ellipsis rounded hover:bg-base-100 cursor-pointer w-full"
        onClick={() => setWalletAccount(account)}
      >
        <img src={pendulumIcon} width={32} height={32} />
        <p className="ml-2.5">{trimAddress(account.address)}</p>
      </button>
    </li>
  );
};
