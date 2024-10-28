import { Collapse } from 'react-daisyui';
import { useState } from 'react';
import { useWalletConnection } from '../../../../hooks/useWalletConnection';
import { METAMASK_EXTENSION_NAME } from '../../../../services/metamask';
import { Dialog } from '../../../Dialog';
import { ConnectModalWalletsList } from './ConnectModalList/ConnectModalWalletsList';
import { ConnectModalAccountsList } from './ConnectModalList/ConnectModalAccountsList';
import { ConnectModalDialogLoading } from './ConnectModalDialogLoading';
import { Wallet } from '@talismn/connect-wallets';

interface ConnectModalDialogProps {
  visible: boolean;
  onClose: () => void;
}

export const ConnectModalDialog = ({ visible, onClose }: ConnectModalDialogProps) => {
  const { accounts, wallets, selectWallet, loading, selectedWallet } = useWalletConnection();
  const [isAccountsCollapseOpen, setIsAccountsCollapseOpen] = useState(false);

  const accountsContent = (
    <Collapse defaultChecked icon="arrow" open={isAccountsCollapseOpen} name="accounts">
      <Collapse.Title onClick={() => setIsAccountsCollapseOpen((state) => !state)}>Choose Account</Collapse.Title>
      <Collapse.Content>
        <ConnectModalAccountsList accounts={accounts || []} />
        {selectedWallet?.extensionName === METAMASK_EXTENSION_NAME ? (
          <p className="mt-3 text-center text-xs">
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
    <Collapse defaultChecked open name="wallets">
      <Collapse.Title>Select Wallet</Collapse.Title>
      <Collapse.Content>
        <ConnectModalWalletsList
          wallets={wallets}
          onClick={(wallet: Wallet) => {
            setIsAccountsCollapseOpen(true);
            selectWallet(wallet);
          }}
          onClose={onClose}
        />
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
