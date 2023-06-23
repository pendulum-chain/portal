import { WalletConnectModal } from '@walletconnect/modal';
import UniversalProvider from '@walletconnect/universal-provider';
import { useCallback, useEffect, useState } from 'preact/compat';
import { toast } from 'react-toastify';
import { GlobalState } from '../../../GlobalStateProvider';
import logo from '../../../assets/wallet-connect.svg';
import { config } from '../../../config';
import { walletConnectConfig } from '../../../config/walletConnect';

export type WalletConnectProps = {
  setWalletAccount: GlobalState['setWalletAccount'];
};

const WalletConnect = ({ setWalletAccount }: WalletConnectProps) => {
  const [loading, setLoading] = useState(false);
  const [provider, setProvider] = useState<Promise<UniversalProvider> | undefined>();
  const [modal, setModal] = useState<WalletConnectModal | undefined>();

  const walletConnectClick = useCallback(async () => {
    setLoading(true);
    try {
      if (!provider) return;
      const wcProvider = await provider;
      const { uri, approval } = await wcProvider.client.connect(walletConnectConfig);
      // if there is a URI from the client connect step open the modal
      if (uri) {
        modal?.openModal({ uri, onclose: () => setLoading(false) });
      }
      // await session approval from the wallet app
      const wcSession = await approval();
      const wcAccounts = Object.values(wcSession.namespaces)
        .map((namespace) => namespace.accounts)
        .flat();
      // grab account addresses from CAIP account formatted accounts
      const accounts = wcAccounts.map((wcAccount) => {
        const address = wcAccount.split(':')[2];
        return address;
      });
      console.log('ACCOUNT', wcSession, wcAccounts, accounts);
      // TODO: set account and unify signature
      setWalletAccount({
        address: accounts[0],
        source: '',
        name: 'WalletConnect',
        signer: undefined,
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
          extension: null,
          signer: null,
          getAccounts: () => Promise.resolve([]),
          subscribeAccounts: () => undefined,
          transformError: () => new Error(),
        },
      });
      setLoading(false);
    } catch (error) {
      // TODO: handle error
      toast(error, { type: 'error' });
      setLoading(false);
    }
  }, [modal, provider, setWalletAccount]);

  useEffect(() => {
    if (provider) return;
    setProvider(
      UniversalProvider.init({
        projectId: config.walletConnect.projectId,
        relayUrl: config.walletConnect.url,
      }),
    );
    setModal(
      new WalletConnectModal({
        projectId: config.walletConnect.projectId,
        walletConnectVersion: 2,
      }),
    );
  }, [provider]);

  return (
    <div className="-mt-8">
      <button
        className={`flex items-center gap-4 p-4 rounded-xl text-left w-full bg-[var(--modal-control-background)] hover:bg-[var(--modal-active-background)]`}
        onClick={walletConnectClick}
        disabled={loading}
      >
        <img src={logo} width="32" height="32" alt="Wallet Connect" />
        {loading ? 'Loading...' : 'Wallet connect'}
      </button>
    </div>
  );
};
export default WalletConnect;
