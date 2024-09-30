import { isMobile } from 'react-device-detect';
import { useMetamask } from './useMetamask';
import { useConnectWallet } from './useConnectWallet';
import { useNova } from './useNova';

export function useWalletConnection() {
  const { wallets = [], accounts = [], selectWallet, loading, selectedWallet } = useConnectWallet();
  const { selectedWallet: metamaskSelectedWallet } = useMetamask();
  const { selectedWallet: novaSelectedWallet } = useNova();

  const MOBILE_WALLETS = [novaSelectedWallet];

  const allWallets = [...wallets, metamaskSelectedWallet];

  if (isMobile) {
    allWallets.push(...MOBILE_WALLETS);
  }

  return { wallets: allWallets, accounts, selectWallet, loading, selectedWallet };
}
