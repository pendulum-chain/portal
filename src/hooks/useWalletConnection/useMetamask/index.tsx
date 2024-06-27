import { useGlobalState } from '../../../GlobalStateProvider';
import { Wallet } from '@talismn/connect-wallets';
import { useMemo, useState } from 'preact/hooks';
import { ExtensionAccount, initiateMetamaskInjectedAccount } from '../../../services/metamask/metamask';
import logo from '../../../assets/metamask-wallet.png';

export const useMetamask = () => {
  const { tenantName } = useGlobalState();
  const [accounts, setAccounts] = useState<ExtensionAccount[]>([]);

  async function selectWallet() {
    const injectedMetamaskAccount = (await initiateMetamaskInjectedAccount(tenantName)) as ExtensionAccount;
    if (injectedMetamaskAccount) {
      setAccounts([injectedMetamaskAccount]);
    }
  }

  const selectedWallet: Wallet = useMemo(
    () => ({
      enable: () => undefined,
      extensionName: 'metamask',
      title: 'Metamask',
      installUrl: 'https://metamask.io/',
      logo: {
        src: logo,
        alt: 'Metamask Wallet',
      },
      installed: Boolean(window.ethereum),
      extension: window.ethereum,

      signer: undefined,
      getAccounts: () => initiateMetamaskInjectedAccount(tenantName),
      subscribeAccounts: () => undefined,
      transformError: (err: Error) => new Error(err.message),
    }),

    [tenantName],
  );

  return { selectedWallet, accounts, selectWallet };
};
