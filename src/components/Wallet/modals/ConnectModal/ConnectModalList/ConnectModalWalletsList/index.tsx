import { Wallet } from '@talismn/connect-wallets';
import { ConnectModalListWalletsItem } from './ConnectModalWalletsListItem';
import WalletConnect from '../../../../wallets/WalletConnect';

interface ConnectWalletListProps {
  wallets?: Wallet[];
  onClick: (wallet: Wallet) => void;
  onClose: () => void;
}

export function ConnectModalWalletsList({ wallets, onClick, onClose }: ConnectWalletListProps) {
  if (!wallets?.length) {
    return <p>No wallet installed</p>;
  }

  return (
    <section className="grid gap-4 md:grid-cols-2">
      {wallets.map((wallet: Wallet) => (
        <ConnectModalListWalletsItem key={wallet.extensionName} wallet={wallet} onClick={onClick} />
      ))}
      <WalletConnect onClick={onClose} />
    </section>
  );
}
