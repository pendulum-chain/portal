import { Wallet } from '@talismn/connect-wallets';
import { useMetamask } from './useMetamask';
import { useConnectWallet } from './useConnectWallet';

export function useWalletConnection() {
  const { wallets = [], accounts = [], selectWallet, loading, selectedWallet } = useConnectWallet();
  const {
    accounts: metamaskAccounts,
    selectedWallet: metamaskSelectedWallet,
    selectWallet: metamaskSelectWallet,
  } = useMetamask();

  const selectWalletHandlers = [
    { condition: (wallet?: Wallet) => wallet && wallet.extensionName === 'metamask', caller: metamaskSelectWallet },
  ];

  const allWallets = [...wallets, metamaskSelectedWallet];
  const allAccounts = [...accounts, ...metamaskAccounts];

  function handleSelectWallet(wallet?: Wallet) {
    const handler = selectWalletHandlers.find((handler) => handler.condition(wallet));
    handler ? handler.caller() : selectWallet(wallet);
  }

  return { allWallets, allAccounts, handleSelectWallet, loading, selectedWallet };
}
