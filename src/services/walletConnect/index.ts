import { WalletAccount } from '@talismn/connect-wallets';
import type { SessionTypes } from '@walletconnect/types/dist/types/sign-client/session';
import UniversalProvider from '@walletconnect/universal-provider';
import logo from '../../assets/wallet-connect.svg';

type Config = {
  chainId?: string;
};

// TODO: improve this
export const walletConnectService = {
  config: {} as Config,
  init: (session: SessionTypes.Struct, client: UniversalProvider['client'], chainId: string): WalletAccount => {
    const wcAccounts = Object.values(session.namespaces)
      .map((namespace) => namespace.accounts)
      .flat();
    // grab account addresses from CAIP account formatted accounts
    const accounts = wcAccounts.map((wcAccount) => {
      const address = wcAccount.split(':')[2];
      return address;
    });
    const signer = {
      sign: async (address: string, transactionPayload: string) => {
        await client.request({
          chainId,
          topic: session.topic,
          request: {
            method: 'polkadot_signTransaction',
            params: {
              address,
              transactionPayload,
            },
          },
        });
      },
    };
    return {
      address: accounts[0],
      source: 'walletConnect',
      name: 'WalletConnect',
      signer,
      wallet: {
        enable: () => undefined,
        extensionName: 'WalletConnect',
        title: 'Wallet Connect',
        installUrl: 'https://walletconnect.com/',
        logo: {
          src: logo,
          alt: 'WalletConnect',
        },
        installed: true,
        extension: undefined,
        signer,
        getAccounts: () => Promise.resolve([]), // TODO
        subscribeAccounts: () => undefined, // TODO
        transformError: (err) => err, // TODO
      },
    };
  },
};
