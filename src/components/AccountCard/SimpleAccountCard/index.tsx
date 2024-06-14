import { WalletAccount } from '@talismn/connect-wallets';
import pendulumIcon from '../../../assets/pendulum-icon.svg';
import { trimAddress } from '../../../helpers/addressFormatter';
import { useGlobalState } from '../../../GlobalStateProvider';

interface AccountProps {
  account: WalletAccount;
}

export const SimpleAccountCard = ({ account }: AccountProps) => {
  const { setWalletAccount } = useGlobalState();
  return (
    <li className="w-full">
      <button
        aria-label={`Select ${account.address}`}
        className="flex w-full cursor-pointer items-center rounded border-l-2 border-transparent p-1.5 hover:border-primary hover:bg-base-100"
        onClick={() => setWalletAccount(account)}
      >
        <img src={pendulumIcon} width={32} height={32} />
        <p className="ml-2.5">{trimAddress(account.address)}</p>
      </button>
    </li>
  );
};
