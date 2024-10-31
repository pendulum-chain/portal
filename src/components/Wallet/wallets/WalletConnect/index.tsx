import { WalletConnectModal } from '@walletconnect/modal';
import UniversalProvider from '@walletconnect/universal-provider';
import { SessionTypes } from '@walletconnect/types';
import { Button } from 'react-daisyui';
import { useCallback, useEffect, useState } from 'react';
import logo from '../../../../assets/wallet-connect.svg';
import { config } from '../../../../config';
import { chainIds, walletConnectConfig } from '../../../../config/walletConnect';
import { useGlobalState } from '../../../../GlobalStateProvider';
import { walletConnectService } from '../../../../services/walletConnect';
import { ToastMessage, showToast } from '../../../../shared/showToast';

interface WalletConnectProps {
  onClick: () => void;
}

const WalletConnect = ({ onClick }: WalletConnectProps) => {
  const [loading, setLoading] = useState(false);
  const [provider, setProvider] = useState<Promise<UniversalProvider> | undefined>();
  const [modal, setModal] = useState<WalletConnectModal | undefined>();
  const { tenantName, setWalletAccount, removeWalletAccount } = useGlobalState();

  const setupClientDisconnectListener = useCallback(
    async (provider: Promise<UniversalProvider>) => {
      (await provider).client.on('session_delete', () => {
        removeWalletAccount();
      });
    },
    [removeWalletAccount],
  );

  const handleModal = useCallback(
    (uri?: string) => {
      if (uri) {
        modal?.openModal({ uri, onclose: () => setLoading(false) });
      }
    },
    [modal],
  );

  const handleSession = useCallback(
    async (approval: () => Promise<SessionTypes.Struct>, chainId: string) => {
      const session = await approval();
      setWalletAccount(await walletConnectService.init(session, chainId));
      modal?.closeModal();
    },
    [setWalletAccount, modal],
  );

  const handleConnect = useCallback(async () => {
    const chainId = chainIds[tenantName];
    if (!provider || !chainId) return;

    const wcProvider = await provider;
    const { uri, approval } = await wcProvider.client.connect(walletConnectConfig);

    handleModal(uri);
    handleSession(approval, chainId);
    await setupClientDisconnectListener(provider);
  }, [provider, tenantName, setupClientDisconnectListener, handleModal, handleSession]);

  const walletConnectClick = useCallback(async () => {
    setLoading(true);
    try {
      await handleConnect();
    } catch (error: unknown) {
      showToast(ToastMessage.ERROR, error as string);
    } finally {
      setLoading(false);
      onClick();
    }
  }, [handleConnect, onClick]);

  useEffect(() => {
    if (provider) return;
    setProvider(walletConnectService.getProvider());
    setModal(
      new WalletConnectModal({
        projectId: config.walletConnect.projectId,
      }),
    );
  }, [provider]);

  return (
    <Button
      className="flex w-full justify-center outline-primary md:justify-start"
      onClick={walletConnectClick}
      disabled={loading}
    >
      <img src={logo} alt="WalletConnect connect button" width={32} height={32} />
      <p className="ml-2">{loading ? 'Loading...' : 'Wallet Connect'}</p>
    </Button>
  );
};
export default WalletConnect;
