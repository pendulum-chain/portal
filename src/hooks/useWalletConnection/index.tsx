import { useMetamask } from './useMetamask';
import { useConnectWallet } from './useConnectWallet';
import { useNova } from './useNova';

export function useWalletConnection() {
  const { wallets = [], accounts = [], selectWallet, loading, selectedWallet } = useConnectWallet();
  const { selectedWallet: metamaskSelectedWallet } = useMetamask();
  const { selectedWallet: novaSelectedWallet } = useNova()

  const allWallets = [...wallets, metamaskSelectedWallet, novaSelectedWallet];

  return { wallets: allWallets, accounts, selectWallet, loading, selectedWallet };
}
