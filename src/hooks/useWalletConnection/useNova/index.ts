import { web3Accounts, web3Enable, web3FromAddress } from '@polkadot/extension-dapp';
import { Wallet, WalletAccount } from '@talismn/connect-wallets';
import { useMemo } from 'preact/hooks';
import logo from '../../../assets/nova-wallet.png';

declare global {
  interface Window {
    injectedWeb3?: {
      'polkadot-js'?: boolean;
      [key: string]: unknown;
    };
    walletExtension?: {
      isNovaWallet?: boolean;
      [key: string]: unknown;
    };
  }
}

function isNovaInstalled() {
  const injectedExtension = window?.injectedWeb3?.['polkadot-js'];
  const isNovaWallet = window?.walletExtension?.isNovaWallet;

  return !!(injectedExtension && isNovaWallet);
}

async function getAccounts(): Promise<WalletAccount[]> {
  const _ = await web3Enable('Pendulum Chain Portal');
  const accounts = await web3Accounts();

  const walletAccounts = Promise.all(
    accounts
      .filter(({ meta: { source } }) => source === 'polkadot-js')
      .map(async ({ address, meta }) => {
        const signer = await web3FromAddress(address);

        const account: WalletAccount = {
          address,
          name: meta.name,
          source: meta.source,
          signer,
          wallet: undefined,
        };

        return account;
      }),
  );

  return await walletAccounts;
}

export const useNova = () => {
  const selectedWallet: Wallet = useMemo(
    () => ({
      extensionName: 'polkadot-js',
      title: 'Nova Wallet',
      installUrl: 'https://novawallet.io/',
      logo: {
        src: logo,
        alt: 'Nova Wallet',
      },
      installed: isNovaInstalled(),

      extension: undefined,
      signer: undefined,
      getAccounts,
      subscribeAccounts: () => undefined, // Unused
      enable: () => undefined,
      transformError: (err: Error) => new Error(err.message),
    }),

    [],
  );

  return { selectedWallet };
};
