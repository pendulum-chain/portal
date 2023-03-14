import { h } from "preact";
import { Button } from "react-daisyui";
import { useCallback, useMemo } from "preact/hooks";
import { WalletAccount } from "@talismn/connect-wallets";
import { WalletSelect } from "@talismn/connect-components";
import { GlobalStateInterface, useGlobalState } from "../GlobalStateProvider";
import { getAddressForFormat, trimAddress } from "../helpers/addressFormatter";
import { useNodeInfoState } from "../NodeInfoProvider";

const OpenWallet = ({ networkName }: { networkName: string }): JSX.Element => {
  const { state, setState } = useGlobalState();
  const { ss58Format } = useNodeInfoState().state;

  const updateGlobalAccount = useCallback(
    (account: WalletAccount) => {
      setState((prevState) => {
        const newState: Partial<GlobalStateInterface> = {
          ...prevState,
          ...{
            walletAccount: account,
          },
        };
        return newState;
      });
    },
    [setState],
  );

  const ConnectButton = useMemo(() => {
    if (!state.walletAccount) {
      return <Button color="primary" width="100px">Connect wallet</Button>;
    } else {
      const addressForFormat = ss58Format
        ? getAddressForFormat(state.walletAccount.address, ss58Format)
        : state.walletAccount.address;

      return (
        <Button
          color="primary"
          title={state.walletAccount.wallet?.title}
          style={{ marginRight: 10 }}
          endIcon={
            <img
              src={state.walletAccount.wallet?.logo?.src || ''}
              style={{ width: 20 }}
              alt={state.walletAccount.wallet?.logo?.alt || ''}
            />
          }
        >
          {trimAddress(addressForFormat, 4)}
        </Button>
      );
    }
  }, [ss58Format, state.walletAccount]);

  return (
    <WalletSelect
      dappName={networkName}
      open={false}
      showAccountsList={true}
      triggerComponent={ConnectButton}
      onAccountSelected={(account) => {
        updateGlobalAccount(account);
      }}
    />
  );
};

export default OpenWallet;
