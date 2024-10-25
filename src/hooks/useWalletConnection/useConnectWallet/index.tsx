import { useState } from 'preact/hooks';
import { Wallet, WalletAccount, getWallets } from '@talismn/connect-wallets';
import { useMutation } from '@tanstack/react-query';
import { useGlobalState } from '../../../GlobalStateProvider';
import { ToastMessage, showToast } from '../../../shared/showToast';
import { storageService } from '../../../services/storage/local';
import { LocalStorageKeys } from '../../useLocalStorage';

const alwaysShowWallets = ['talisman', 'subwallet-js', 'polkadot-js'];

export const useConnectWallet = () => {
  const [selectedWallet, setSelectedWallet] = useState<Wallet | undefined>();
  const { dAppName } = useGlobalState();

  const wallets = getWallets().filter((wallet) => alwaysShowWallets.includes(wallet.extensionName) || wallet.installed);

  const {
    mutate: selectWallet,
    data: accounts,
    isLoading: loading,
  } = useMutation<WalletAccount[], unknown, Wallet | undefined, unknown>(async (wallet) => {
    setSelectedWallet(wallet);
    if (!wallet) return [];
    try {
      await wallet.enable(dAppName);

      // Save selected wallet name to local storage
      if (wallet.installed) {
        storageService.set(LocalStorageKeys.SELECTED_WALLET_NAME, wallet.extensionName);
      }

      return wallet.getAccounts();
    } catch {
      showToast(ToastMessage.WALLET_ALREADY_OPEN_PENDING_CONNECTION);
      return [];
    }
  });

  return { accounts, wallets, selectWallet, loading, selectedWallet };
};
