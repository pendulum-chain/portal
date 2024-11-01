import { useGlobalState } from '../../../GlobalStateProvider';
import { Wallet } from '@talismn/connect-wallets';
import { useMemo } from 'react';
import { METAMASK_EXTENSION_NAME, initiateMetamaskInjectedAccount } from '../../../services/metamask';
import logo from '../../../assets/metamask-wallet.png';

export const useMetamask = () => {
  const { tenantName } = useGlobalState();

  const selectedWallet: Wallet = useMemo(
    () => ({
      extensionName: METAMASK_EXTENSION_NAME,
      title: 'Metamask',
      installUrl: 'https://metamask.io/',
      logo: {
        src: logo,
        alt: 'Metamask Wallet',
      },
      installed: Boolean(window.ethereum),
      extension: window.ethereum,

      signer: undefined,
      getAccounts: () => initiateMetamaskInjectedAccount(tenantName), // we use polkadot-snap, getAccounts gets a polkadot-snap account linked to the user's metamask wallet
      subscribeAccounts: () => undefined, // we use polkadot-snap, subscribeAccounts is not needed
      enable: () => undefined, // we use polkadot-snap, enable is not needed
      transformError: (err: Error) => new Error(err.message),
    }),

    [tenantName],
  );

  return { selectedWallet };
};
