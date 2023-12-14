import { Signer } from '@polkadot/api/types';
import { SignerPayloadJSON, SignerPayloadRaw, SignerResult } from '@polkadot/types/types';
import { WalletAccount } from '@talismn/connect-wallets';
import { useCallback, useEffect, useState } from 'preact/compat';
import { Modal } from 'react-daisyui';
import { GlobalState, useGlobalState } from '../../../GlobalStateProvider';
import logo from '../../../assets/metamask-wallet.png';
import { initiatePolkadotSnap, installPolkadotSnap, tenantToSnapNetwork } from '../../../services/metamask/metamask';
import { PublicKey } from '../../PublicKey';

export type MetamaskWalletProps = {
  setWalletAccount: GlobalState['setWalletAccount'];
};

interface ExtensionAccount {
  address: string;
  name: string;
  source: string;
  signer: Signer;
}

const MetamaskWallet = ({ setWalletAccount }: MetamaskWalletProps) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [accounts, setAccounts] = useState<ExtensionAccount[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<ExtensionAccount>();
  const { tenantName } = useGlobalState();

  const onClick = useCallback(async () => {
    const provider = await initiatePolkadotSnap(tenantToSnapNetwork(tenantName));
    if (!provider.isSnapInstalled) {
      const installResult = await installPolkadotSnap(tenantToSnapNetwork(tenantName));
      if (!installResult) {
        console.error('Something went wrong, snap could not be installed.');
        setOpenModal(false);
        return;
      }
    }
    if (provider.snap) {
      const api = provider.snap.getMetamaskSnapApi();
      const injectedMetamaskAccount: ExtensionAccount = {
        address: await api.getAddress(),
        name: 'Metamask Snap',
        source: 'metamask',
        signer: {
          signPayload: async (payload: SignerPayloadJSON) => {
            const stringResult = await api.signPayloadJSON(payload);
            // Metamask snap doesn't provide a request Id, but just the hex string, so
            // adding id: 1 to be compliant with SignerResult
            return { id: 1, signature: stringResult } as SignerResult;
          },
          signRaw: async (raw: SignerPayloadRaw) => {
            const stringResult = await api.signPayloadRaw(raw);
            // Metamask snap doesn't provide a request Id, but just the hex string, so
            // adding id: 1 to be compliant with SignerResult
            return { id: 1, signature: stringResult } as SignerResult;
          },
          update: (id, status) => {
            console.log('Status update for Id %d: %s', id, status.toHuman());
          },
        },
      };
      setAccounts([injectedMetamaskAccount]);
      setOpenModal(true);
    } else {
      console.error('Something went wrong, snap not found.');
      setOpenModal(false);
    }
  }, [setOpenModal]);

  useEffect(() => {
    async function buildWalletAccount(extAcc: ExtensionAccount) {
      return {
        address: extAcc.address,
        source: extAcc.source,
        name: extAcc.name,
        signer: extAcc.signer as WalletAccount['signer'],
        wallet: {
          enable: () => undefined,
          extensionName: 'polkadot-js',
          title: 'Metamask Wallet',
          installUrl: 'https://metamask.io/',
          logo: {
            src: logo,
            alt: 'Metamask Wallet',
          },
          installed: true,
          extension: undefined,
          signer: extAcc.signer,
          /**
           * The following methods are tagged as 'Unused' since they are only required by the @talisman package,
           * which we are not using to handle this wallet connection.
           */
          getAccounts: () => Promise.resolve([]), // Unused
          subscribeAccounts: () => undefined, // Unused
          transformError: (err: Error) => err, // Unused
        },
      };
    }
    if (selectedAccount) {
      buildWalletAccount(selectedAccount)
        .then((account) => setWalletAccount(account))
        .then(() => {
          setOpenModal(false);
        })
        .catch((error) => console.error(error));
    }
  }, [selectedAccount, setWalletAccount]);

  return (
    <div className="-mt-8">
      <Modal open={openModal} responsive={true}>
        <h1 className="text-lg">Metamask Snap Polkadot account: </h1>
        <div>
          {accounts.map((a, i) => (
            <button
              key={i}
              className={`flex items-center gap-4 p-4 rounded-xl text-left w-full bg-[var(--modal-control-background)] hover:bg-[var(--modal-active-background)]`}
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
        </div>
      </Modal>
      <button
        className={`flex items-center gap-4 p-4 rounded-xl text-left w-full bg-[var(--modal-control-background)] hover:bg-[var(--modal-active-background)]`}
        onClick={onClick}
      >
        <img src={logo} width="32" height="32" alt="Metamask Wallet" />
        Metamask Wallet
      </button>
    </div>
  );
};

export default MetamaskWallet;
