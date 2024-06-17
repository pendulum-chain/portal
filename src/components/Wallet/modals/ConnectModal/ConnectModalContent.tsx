import { Collapse, Loading } from 'react-daisyui';
import { ConnectModalWalletsList } from './ConnectModalList/ConnectModalWalletsList';
import { ConnectModalAccountsList } from './ConnectModalList/ConnectModalAccountsList';
import { useConnectWallet } from '../../../../hooks/useConnectWallet';

const ConnectModalLoading = () => (
  <article className="flex flex-col items-center justify-center">
    <Loading variant="dots" size="lg" />
    <h1 className="text-2xl">Connecting wallet</h1>
    <p className="mt-2.5 w-52 text-center text-sm">Please approve walletName and approve transaction.</p>
  </article>
);

export const ConnectModalContent = () => {
  const { wallets, accounts, selectWallet } = useConnectWallet();

  // if (loading) return <ConnectModalLoading />;

  return (
    <article className="flex flex-wrap gap-2">
      <Collapse defaultChecked icon="arrow" open name="wallets">
        <Collapse.Title>Select Wallet</Collapse.Title>
        <Collapse.Content>
          <ConnectModalWalletsList items={wallets} onClick={(wallet) => selectWallet(wallet)} />
          <p className="mt-3.5 text-center text-xs">
            Want to know more?
            <a href="#" className="ml-1 text-primary hover:underline">
              Learn more about wallets
            </a>
          </p>
        </Collapse.Content>
      </Collapse>
      <Collapse defaultChecked icon="arrow" open name="accounts">
        <Collapse.Title>Choose Account</Collapse.Title>
        <Collapse.Content>
          <ConnectModalAccountsList accounts={accounts || []} />
        </Collapse.Content>
      </Collapse>
    </article>
  );
};
