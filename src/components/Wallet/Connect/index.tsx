import { WalletSelect } from '@talismn/connect-components';
import { Button, Divider } from 'react-daisyui';
import { isMobile } from 'react-device-detect';
import { useGlobalState } from '../../../GlobalStateProvider';
import MetamaskWallet from '../MetamaskWallet';
import NovaWallet from '../NovaWallet';
import WalletConnect from '../WalletConnect';

export interface ConnectProps {
  isHeader?: boolean;
}

export const Connect = ({ isHeader }: ConnectProps) => {
  const { dAppName, setWalletAccount } = useGlobalState();

  return (
    <>
      <WalletSelect
        dappName={dAppName}
        open={false}
        showAccountsList={true}
        triggerComponent={
          <Button
            size={isHeader ? 'sm' : undefined}
            className={isHeader ? 'text-sm min-h-[2.1rem] h-auto px-1 sm:px-3 ' : 'w-full'}
            color="primary"
            type="button"
          >
            Connect Wallet
          </Button>
        }
        onAccountSelected={setWalletAccount}
        footer={
          <>
            {isMobile && (
              <>
                <NovaWallet setWalletAccount={setWalletAccount} />
                <Divider className="before:bg-transparent after:bg-transparent h-2" />
              </>
            )}
            <MetamaskWallet setWalletAccount={setWalletAccount} />
            <Divider className="before:bg-transparent after:bg-transparent h-2" />
            <WalletConnect />
          </>
        }
      />
    </>
  );
};
