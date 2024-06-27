import { useMetamask } from './useMetamask';
import { useConnectWallet } from './useConnectWallet';

export function useWalletConnection() {
  const { wallets = [], accounts = [], selectWallet, loading, selectedWallet } = useConnectWallet();
  const { selectedWallet: metamaskSelectedWallet } = useMetamask();

  const allWallets = [...wallets, metamaskSelectedWallet];

  return { wallets: allWallets, accounts, selectWallet, loading, selectedWallet };
}
