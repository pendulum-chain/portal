import { Collapse } from 'react-daisyui';
import { Dialog } from '../../../../pages/staking/dialogs/Dialog';
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

  const accountsContent = (
    <Collapse defaultChecked icon="arrow" open name="accounts">
      <Collapse.Title>Choose Account</Collapse.Title>
      <Collapse.Content>
        <ConnectModalAccountsList accounts={accounts || []} />
        {selectedWallet?.extensionName === METAMASK_EXTENSION_NAME ? (
          <p className="mt-3 text-xs text-center">
            For Metamask connection we use Polkadot-Snap which creates only one Polkadot address for your Metamask
            Wallet.
          </p>
        ) : (
          <></>
        )}
      </Collapse.Content>
    </Collapse>
  );

  const walletsContent = (
    <Collapse defaultChecked icon="arrow" open name="wallets">
      <Collapse.Title>Select Wallet</Collapse.Title>
      <Collapse.Content>
        <ConnectModalWalletsList wallets={wallets} onClick={selectWallet} onClose={onClose} />
      </Collapse.Content>
    </Collapse>
  );

  const content = (
    <article className="flex flex-wrap gap-2">
      {walletsContent}
      {accounts.length ? accountsContent : <></>}
    </article>
  );

  return loading ? (
    <Dialog
      visible={visible}
      content={
        <ConnectModalDialogLoading selectedWallet={selectedWallet?.title || selectedWallet?.extensionName || ''} />
      }
      onClose={() => {
        selectWallet(undefined);
        onClose();
      }}
    />
  ) : (
    <Dialog
      visible={visible}
      headerText="Connect wallet"
      onClose={() => {
        selectWallet(undefined);
        onClose();
      }}
      content={content}
    />
  );
};
