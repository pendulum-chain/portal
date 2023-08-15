import { useCallback, useState } from 'preact/compat';
import { isMobile } from 'react-device-detect';
import { GlobalState, useGlobalState } from '../../../GlobalStateProvider';
import logo from '../../../assets/nova-wallet.png';

export type NovaWalletProps = {
  setWalletAccount: GlobalState['setWalletAccount'];
};

const NovaWallet = ({ setWalletAccount }: NovaWalletProps) => {
  const [loading, setLoading] = useState(false);
  const { tenantName } = useGlobalState();

  if (isMobile) {
  }

  const onClick = useCallback(async () => {
    // TODO to be implemented
  }, [setWalletAccount, tenantName]);

  return (
    <div className="-mt-8">
      <button
        className={`flex items-center gap-4 p-4 rounded-xl text-left w-full bg-[var(--modal-control-background)] hover:bg-[var(--modal-active-background)]`}
        onClick={onClick}
        disabled={loading}
      >
        <img src={logo} width="32" height="32" alt="Nova Wallet" />
        {loading ? 'Loading...' : 'Nova Wallet'}
      </button>
    </div>
  );
};

export default NovaWallet;
