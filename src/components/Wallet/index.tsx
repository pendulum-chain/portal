import { Disconnect } from './Disconnect';
import { useGlobalState } from '../../GlobalStateProvider';
import { Connect, ConnectProps } from './Connect';

const OpenWallet = (props: ConnectProps): JSX.Element => {
  const { walletAccount } = useGlobalState();
  const { address } = walletAccount || {};

  return address ? <Disconnect /> : <Connect {...props} />;
};

export default OpenWallet;
