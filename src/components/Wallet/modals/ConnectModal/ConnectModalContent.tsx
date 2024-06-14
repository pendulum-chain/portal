import { StateUpdater, useCallback, useEffect, useState } from 'preact/hooks';
import { Wallet, WalletAccount, getWallets } from '@talismn/connect-wallets';
import { Collapse } from 'react-daisyui';
import { ConnectModalWalletsList } from './ConnectModalList/ConnectModalWalletsList';
import { useGlobalState } from '../../../../GlobalStateProvider';
import { ConnectModalAccountsList } from './ConnectModalList/ConnectModalAccountsList';

export const ConnectModalContent = () => {
  const [wallets, setWallets] = useState<Wallet[]>();
  const [selectedWallet, setSelectedWallet] = useState<Wallet>();
  const [accounts, setAccounts] = useState<WalletAccount[]>([]);

  const { dAppName, walletAccount } = useGlobalState();
  const [unsubscribe, setUnsubscribe] = useState<StateUpdater<Record<string, () => unknown>>>();

  useEffect(() => {
    const wallets = getWallets();
    const installedWallets = wallets.filter((wallet) => wallet.installed);
    setWallets(installedWallets || wallets);

    return () => {
      setSelectedWallet(undefined);
    };
  }, []);

  const onWalletListSelected = useCallback(
    async (wallet: Wallet) => {
      setSelectedWallet(wallet);

      try {
        await wallet.enable(dAppName);

        await wallet.subscribeAccounts((walletAccounts) => {
          if (walletAccounts) {
            setAccounts(walletAccounts);
          }
        });
      } catch (err) {
        console.warn(err);
      }
    },
    [dAppName],
  );

  return (
    <article className="flex flex-wrap gap-2">
      <Collapse defaultChecked icon="arrow" open name="wallets">
        <Collapse.Title>Select Wallet</Collapse.Title>
        <Collapse.Content>
          <ConnectModalWalletsList items={wallets} onClick={(wallet) => onWalletListSelected(wallet)} />
          <p className="text-center text-xs mt-3.5">
            Want to know more?
            <a href="#" className="text-primary hover:underline ml-1">
              Learn more about wallets
            </a>
          </p>
        </Collapse.Content>
      </Collapse>
      <Collapse defaultChecked icon="arrow" open name="accounts">
        <Collapse.Title>Choose Account</Collapse.Title>
        <Collapse.Content>
          <ConnectModalAccountsList accounts={accounts} />
        </Collapse.Content>
      </Collapse>
    </article>
  );
};
