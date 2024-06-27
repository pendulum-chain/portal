import { useEffect, useState } from 'preact/compat';
import { Button } from 'react-daisyui';
import { useGlobalState } from '../../../../GlobalStateProvider';
import logo from '../../../../assets/metamask-wallet.png';
import { ExtensionAccount, buildWalletAccount } from '../../../../services/metamask';
import { PublicKey } from '../../../PublicKey';
import { Dialog } from '../../../../pages/collators/dialogs/Dialog';

const MetamaskWallet = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedAccount, setSelectedAccount] = useState<ExtensionAccount>();
  const { setWalletAccount } = useGlobalState();

  useEffect(() => {
    if (selectedAccount) {
      const account = buildWalletAccount(selectedAccount);
      setWalletAccount(account);
      setOpenModal(false);
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
              <PublicKey publicKey={a.address} />
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
