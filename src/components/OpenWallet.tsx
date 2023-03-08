import { WalletSelect } from '@talismn/connect-components';
import { useMemo } from 'preact/hooks';
import { Button, Dropdown } from 'react-daisyui';
import { useGlobalState } from '../GlobalStateProvider';
import { getAddressForFormat, trimAddress } from '../helpers/addressFormatter';
import { useNodeInfoState } from '../NodeInfoProvider';

const OpenWallet = ({ networkName }: { networkName: string }): JSX.Element => {
  const { walletAccount, setWalletAccount, removeWalletAccount } =
    useGlobalState();
  const { ss58Format } = useNodeInfoState().state;

  const address = useMemo(
    () =>
      walletAccount?.address
        ? trimAddress(
            (ss58Format
              ? getAddressForFormat(walletAccount.address, ss58Format)
              : walletAccount.address) || '',
            4,
          )
        : undefined,
    [ss58Format, walletAccount],
  );

  return (
    <>
      {walletAccount?.address ? (
        <Dropdown vertical="end">
          <Dropdown.Toggle color="primary" title={walletAccount.wallet?.title}>
            <span className="leading-6">{address}</span>
            <img
              src={walletAccount.wallet?.logo?.src || ''}
              style={{ width: 20, marginLeft: 12 }}
              alt={walletAccount.wallet?.logo?.alt || ''}
            />
          </Dropdown.Toggle>
          <Dropdown.Menu className="w-40">
            <Dropdown.Item onClick={removeWalletAccount}>
              Disconnect
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <WalletSelect
          dappName={networkName}
          open={false}
          showAccountsList={true}
          triggerComponent={
            <Button color="primary" width="100px">
              Connect wallet
            </Button>
          }
          onAccountSelected={setWalletAccount}
        />
      )}
    </>
  );
};

export default OpenWallet;
