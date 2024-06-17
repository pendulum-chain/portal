import { useEffect, useState } from 'preact/hooks';
import { Wallet, WalletAccount, getWallets } from '@talismn/connect-wallets';
import { useMutation } from '@tanstack/react-query';
import { useGlobalState } from '../../GlobalStateProvider';
import { ToastMessage, showToast } from '../../shared/showToast';

export const useConnectWallet = () => {
  const [wallets, setWallets] = useState<Wallet[]>();
  const [selectedWallet, setSelectedWallet] = useState<Wallet | undefined>();

  const { dAppName } = useGlobalState();

  useEffect(() => {
    const installedWallets = getWallets().filter((wallet) => wallet.installed);
    setWallets(installedWallets);
  }, []);

  const {
    mutate: selectWallet,
    data: accounts,
    isLoading: loading,
  } = useMutation<WalletAccount[], unknown, Wallet | undefined, unknown>(async (wallet) => {
    setSelectedWallet(wallet);

    if (!wallet) return [];

    try {
      await wallet.enable(dAppName);

      return wallet.getAccounts();
    } catch {
      showToast(ToastMessage.WALLET_ALREADY_OPEN_PENDING_CONNECTION);
      return [];
    }
  });

  return { accounts, wallets, selectWallet, loading, selectedWallet };
};
