import { Button } from 'react-daisyui';
import OpenWallet from '../../components/Wallet';
import { useGlobalState } from '../../GlobalStateProvider';

export const SubmitButton = () => {
  const { walletAccount, dAppName } = useGlobalState();

  return (
    <>
      {walletAccount ? (
        <Button className="w-full text-black text-base" color="primary" type="submit">
          Get AMPE
        </Button>
      ) : (
        <OpenWallet dAppName={dAppName} />
      )}
    </>
  );
};
