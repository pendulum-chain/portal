import { Collapse } from 'react-daisyui';
import { useConnectWallet } from '../../../../hooks/useConnectWallet';
import { Dialog } from '../../../../pages/collators/dialogs/Dialog';
import { ConnectModalWalletsList } from './ConnectModalList/ConnectModalWalletsList';
import { ConnectModalAccountsList } from './ConnectModalList/ConnectModalAccountsList';
import { ConnectModalDialogLoading } from './ConnectModalDialogLoading';
import { useMetamask } from '../../../../hooks/useMetamask';

interface ConnectModalDialogProps {
  visible: boolean;
  onClose: () => void;
}

export const ConnectModalDialog = ({ visible, onClose }: ConnectModalDialogProps) => {
  const { wallets, accounts, selectWallet, loading, selectedWallet } = useConnectWallet();

  const { accounts: metamaskAccounts, selectedWallet: metamaskSelectedWallet } = useMetamask();
  const allWallets = [...(wallets || []), metamaskSelectedWallet];
  const allAccounts = [...(accounts || []), ...metamaskAccounts];

  console.log('allWallets:', allWallets);

  const content = (
    <article className="flex flex-wrap gap-2">
      <Collapse defaultChecked icon="arrow" open name="wallets">
        <Collapse.Title>Select Wallet</Collapse.Title>
        <Collapse.Content>
          <ConnectModalWalletsList wallets={allWallets} onClick={(wallet) => selectWallet(wallet)} onClose={onClose} />
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
          <ConnectModalAccountsList accounts={allAccounts || []} />
        </Collapse.Content>
      </Collapse>
    </article>
  );

  return (
    <Dialog
      visible={visible}
      headerText={loading ? '' : 'Connect wallet'}
      onClose={() => {
        selectWallet(undefined);
        onClose();
      }}
      content={
        loading ? (
          <ConnectModalDialogLoading selectedWallet={selectedWallet?.title || selectedWallet?.extensionName || ''} />
        ) : (
          content
        )
      }
      actions={<></>}
    />
  );
};
