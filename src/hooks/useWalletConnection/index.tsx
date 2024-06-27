import { useMetamask } from './useMetamask';
import { useConnectWallet } from './useConnectWallet';

export function useWalletConnection() {
  const { wallets = [], accounts = [], selectWallet, loading, selectedWallet } = useConnectWallet();
  const { accounts: metamaskAccounts, selectedWallet: metamaskSelectedWallet } = useMetamask();

  const allWallets = [...wallets, metamaskSelectedWallet];
  const allAccounts = [...accounts, ...metamaskAccounts];

  return { allWallets, allAccounts, selectWallet, loading, selectedWallet };
}
