import { useGlobalState } from './GlobalStateProvider';
import { useNodeInfoState } from './NodeInfoProvider';
import { SharedStateProvider } from './shared/Provider';

const SharedProvider = ({ children }: { children: JSX.Element }) => {
  const { api } = useNodeInfoState().state;
  const { signer, address } = useGlobalState().walletAccount || {};

  return (
    <SharedStateProvider api={api} signer={signer} address={address}>
      {children}
    </SharedStateProvider>
  );
};

export default SharedProvider;
