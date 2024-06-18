import { DisconnectModal } from './modals/DisconnectModal';
import { useGlobalState } from '../../GlobalStateProvider';
import { ConnectModal, ConnectProps } from './modals/ConnectModal';

const OpenWallet = (props: ConnectProps): JSX.Element => {
  const { walletAccount } = useGlobalState();
  const { address } = walletAccount || {};

  return address ? <DisconnectModal /> : <ConnectModal {...props} />;
};

export default OpenWallet;
