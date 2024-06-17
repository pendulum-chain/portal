import { StateUpdater, useCallback, useEffect, useState } from 'preact/hooks';
import { Wallet, WalletAccount, getWallets } from '@talismn/connect-wallets';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useGlobalState } from '../../GlobalStateProvider';

export const useConnectWallet = () => {
  const [wallets, setWallets] = useState<Wallet[]>();
  const [selectedWallet, setSelectedWallet] = useState<Wallet>();

  const { dAppName } = useGlobalState();

  useEffect(() => {
    const installedWallets = getWallets().filter((wallet) => wallet.installed);
    setWallets(installedWallets);
  }, []);

  const { mutate: selectWallet, data: accounts } = useMutation(async (wallet: Wallet) => {
    setSelectedWallet(wallet);

    await wallet.enable(dAppName);

    return wallet.getAccounts();
  });

  return { accounts, wallets, selectWallet };
};
