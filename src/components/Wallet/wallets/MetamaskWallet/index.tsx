import { useCallback, useEffect, useState } from 'preact/compat';
import { Button, Modal } from 'react-daisyui';
import { useGlobalState } from '../../../../GlobalStateProvider';
import logo from '../../../../assets/metamask-wallet.png';
import {
  ExtensionAccount,
  buildWalletAccount,
  initiateMetamaskInjectedAccount,
} from '../../../../services/metamask/metamask';
import { CloseButton } from '../../../CloseButton';
import { PublicKey } from '../../../PublicKey';
import { Dialog } from '../../../../pages/collators/dialogs/Dialog';

const MetamaskWallet = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [accounts, setAccounts] = useState<ExtensionAccount[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<ExtensionAccount>();
  const { tenantName, setWalletAccount } = useGlobalState();

  const onClick = useCallback(async () => {
    const injectedMetamaskAccount = (await initiateMetamaskInjectedAccount(tenantName)) as ExtensionAccount;
    if (injectedMetamaskAccount) {
      setAccounts([injectedMetamaskAccount]);
      setOpenModal(true);
    } else {
      console.error('Something went wrong, snap not found.');
      setOpenModal(false);
    }
  }, [setOpenModal, tenantName]);

  useEffect(() => {
    if (selectedAccount) {
      buildWalletAccount(selectedAccount)
        .then((account) => setWalletAccount(account))
        .then(() => {
          setOpenModal(false);
        })
        .catch((error) => console.error(error));
    }
  }, [selectedAccount, setWalletAccount]);

  const content = (
    <>
      {accounts.map((a, i) => (
        <button
          key={i}
          className={`flex w-full items-center gap-4 rounded-xl bg-[var(--modal-control-background)] p-4 text-left hover:bg-[var(--modal-active-background)]`}
          onClick={() => setSelectedAccount(a)}
        >
          <img src={logo} width="32" height="32" alt="Metamask Wallet" />
          <div>
            <div className="text-sm">{a.name}</div>
            <div className="text-xs text-neutral-500">
              <PublicKey publicKey={a.address} variant="shorter" />{' '}
            </div>
          </div>
        </button>
      ))}
    </>
  );

  return (
    <>
      <Dialog
        content={content}
        headerText="Metamask Snap Polkadot account:"
        onClose={() => setOpenModal(false)}
        actions={<></>}
        visible={openModal}
      />
      <Button className="flex outline-primary" onClick={onClick}>
        <img src={logo} alt="Metamask Wallet" width={32} height={32} />
        <p className="ml-2">Metamask</p>
      </Button>
    </>
  );
};

export default MetamaskWallet;
