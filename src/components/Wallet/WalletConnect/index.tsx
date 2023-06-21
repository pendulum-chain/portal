import { WalletConnectModal } from '@walletconnect/modal';
import UniversalProvider from '@walletconnect/universal-provider';
import { useCallback, useEffect, useState } from 'preact/compat';
import { config } from '../../../config';
import logo from './wallet-connect.svg';

const wcParams = {
  requiredNamespaces: {
    polkadot: {
      methods: ['polkadot_signTransaction', 'polkadot_signMessage'],
      chains: [
        'polkadot:91b171bb158e2d3848fa23a9f1c25182', // polkadot
      ],
      events: ['chainChanged", "accountsChanged'],
    },
  },
};

const WalletConnect = () => {
  const [loading, setLoading] = useState(false);
  const [provider, setProvider] = useState<Promise<UniversalProvider> | undefined>();
  const [modal, setModal] = useState<WalletConnectModal | undefined>();

  const walletConnectClick = useCallback(async () => {
    setLoading(true);
    try {
      if (!provider) return;
      const wcProvider = await provider;
      const { uri, approval } = await wcProvider.client.connect(wcParams);
      setLoading(false);
      // if there is a URI from the client connect step open the modal
      if (uri) {
        modal?.openModal({ uri });
      }
      // await session approval from the wallet app
      const wcSession = await approval();
      console.log('APPROVAL', wcSession);
      const wcAccount = Object.values(wcSession.namespaces)
        .map((namespace) => namespace.accounts)
        .flat();
      console.log('ACCOUNT', wcSession, wcAccount);
      // grab account addresses from CAIP account formatted accounts
      /* const accounts = wcAccounts.map(wcAccount => {
          const address = wcAccount.split(':')[2]
          return address */
      // TODO: set storage values, set account
    } catch (error) {
      // TODO: handle error
      console.error(error);
      setLoading(false);
    }
  }, [modal, provider]);

  useEffect(() => {
    if (provider) return;
    setProvider(
      UniversalProvider.init({
        projectId: config.walletConnect.projectId,
        relayUrl: config.walletConnect.url,
        logger: 'debug',
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
