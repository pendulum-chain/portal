import { Collapse } from 'react-daisyui';
import { Dialog } from '../../../../pages/collators/dialogs/Dialog';
import { ConnectModalWalletsList } from './ConnectModalList/ConnectModalWalletsList';
import { ConnectModalAccountsList } from './ConnectModalList/ConnectModalAccountsList';
import { ConnectModalDialogLoading } from './ConnectModalDialogLoading';
import { useWalletConnection } from '../../../../hooks/useWalletConnection';
import { METAMASK_EXTENSION_NAME } from '../../../../services/metamask';

interface ConnectModalDialogProps {
  visible: boolean;
  onClose: () => void;
}

export const ConnectModalDialog = ({ visible, onClose }: ConnectModalDialogProps) => {
  const { accounts, wallets, selectWallet, loading, selectedWallet } = useWalletConnection();
  const content = (
    <article className="flex flex-wrap gap-2">
      <Collapse defaultChecked icon="arrow" open name="wallets">
        <Collapse.Title>Select Wallet</Collapse.Title>
        <Collapse.Content>
          <ConnectModalWalletsList wallets={wallets} onClick={selectWallet} onClose={onClose} />
        </Collapse.Content>
      </Collapse>
      <Collapse defaultChecked icon="arrow" open name="accounts">
        <Collapse.Title>Choose Account</Collapse.Title>
        <Collapse.Content>
          <ConnectModalAccountsList accounts={accounts || []} />
          {selectedWallet?.extensionName === METAMASK_EXTENSION_NAME ? (
            <p className="text-xs text-center mt-3">
              For Metamask connection we use Polkadot-Snap which creates only one Polkadot account for your Metamask
              Wallet.
            </p>
          ) : (
            <></>
          )}
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
