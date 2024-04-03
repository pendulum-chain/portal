import { Button } from 'react-daisyui';
import OpenWallet from '../../components/Wallet';
import { useGlobalState } from '../../GlobalStateProvider';
import { useNodeInfoState } from '../../NodeInfoProvider';

export const SubmitButton = ({ loading }: { loading?: boolean }) => {
  const { walletAccount, dAppName } = useGlobalState();
  const { tokenSymbol } = useNodeInfoState().state;

  return (
    <>
      {walletAccount ? (
        <Button className="w-full text-black text-base" color="primary" type="submit" loading={!tokenSymbol || loading}>
          {tokenSymbol && !loading ? `Get ${tokenSymbol}` : ''}
        </Button>
      ) : (
        <OpenWallet dAppName={dAppName} />
      )}
    </>
  );
};
