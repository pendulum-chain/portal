import { Wallet } from '@talismn/connect-wallets';
import { ConnectModalListWalletsItem } from './ConnectModalWalletsListItem';

interface ConnectWalletListProps {
  items?: Wallet[];
  onClick: (wallet: Wallet) => void;
  makeInstallable?: boolean;
}

export function ConnectModalWalletsList({ items, onClick, makeInstallable }: ConnectWalletListProps) {
  if (!items) {
    return null;
  }

  return (
    <section className="grid grid-cols-2 gap-4">
      {items.map((wallet: Wallet) => (
        <ConnectModalListWalletsItem
          key={wallet.extensionName}
          wallet={wallet}
          onClick={onClick}
          makeInstallable={makeInstallable}
        />
      ))}
    </section>
  );
}
