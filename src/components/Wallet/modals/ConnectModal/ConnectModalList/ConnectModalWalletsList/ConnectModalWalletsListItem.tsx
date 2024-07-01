import { Wallet } from '@talismn/connect-wallets';
import { Button } from 'react-daisyui';

interface WalletButtonProps {
  wallet: Wallet;
  onClick: (wallet: Wallet) => void;
  makeInstallable?: boolean;
}

function buttonOnClick(props: WalletButtonProps) {
  const { wallet, onClick, makeInstallable } = props;

  return wallet.installed
    ? onClick?.(wallet)
    : (!wallet.installed && wallet.extensionName === 'talisman') || makeInstallable
      ? window.open(wallet.installUrl, '_blank', 'noopener,noreferrer')
      : null;
}

export const ConnectModalListWalletsItem = (props: WalletButtonProps) => (
  <Button
    key={props.wallet.extensionName}
    className="w-full flex justify-center md:justify-start outline-primary"
    onClick={() => buttonOnClick(props)}
  >
    <img src={props.wallet.logo.src} alt={props.wallet.logo.alt} width={32} height={32} />
    <p className="ml-2">{props.wallet.title}</p>
  </Button>
);