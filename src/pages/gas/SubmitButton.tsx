import { Button } from 'react-daisyui';
import OpenWallet from '../../components/Wallet';
import { useGlobalState } from '../../GlobalStateProvider';
import { useNodeInfoState } from '../../NodeInfoProvider';

export const SubmitButton = ({ loading, disabled }: { loading?: boolean; disabled?: boolean }) => {
  const { walletAccount } = useGlobalState();
  const { tokenSymbol } = useNodeInfoState().state;

  return (
    <>
      {walletAccount ? (
        <Button
          className="w-full text-base text-neutral"
          color="primary"
          type="submit"
          loading={!tokenSymbol || loading}
          disabled={disabled}
        >
          {tokenSymbol && !loading ? `Get ${tokenSymbol}` : ''}
        </Button>
      ) : (
        <OpenWallet />
      )}
    </>
  );
};
