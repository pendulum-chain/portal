import { Wallet } from '@talismn/connect-wallets';
import { ConnectModalListWalletsItem } from './ConnectModalWalletsListItem';
import WalletConnect from '../../../../wallets/WalletConnect';

interface ConnectWalletListProps {
  wallets?: Wallet[];
  onClick: (wallet: Wallet) => void;
  onClose: () => void;
  makeInstallable?: boolean;
}

export function ConnectModalWalletsList({ wallets, onClick, makeInstallable, onClose }: ConnectWalletListProps) {
  if (!wallets?.length) {
    return <p>No wallet installed</p>;
  }

  return (
    <section className="grid md:grid-cols-2 gap-4">
      {wallets.map((wallet: Wallet) => (
        <ConnectModalListWalletsItem
          key={wallet.extensionName}
          wallet={wallet}
          onClick={onClick}
          makeInstallable={makeInstallable}
        />
      ))}
      <WalletConnect onClick={onClose} />
    </section>
  );
}
