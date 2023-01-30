import { h } from "preact";
import { Button } from "react-daisyui";
import { useMemo } from "preact/hooks";
import { WalletAccount } from "@talismn/connect-wallets";
import { WalletSelect } from "@talismn/connect-components";
import { useGlobalState } from "../GlobalStateProvider";
import addressFormatter from "../helpers/addressFormatter";

const OpenWallet = ({ networkName }: { networkName: string }): JSX.Element => {
  const { state, setState } = useGlobalState();

  const updateGlobalAccount = (account: WalletAccount) => {
    setState({
      ...state,
      ...{
        walletAccount: account,
      },
    });
  };

  const ConnectButton = useMemo(
    () =>
      state.walletAccount ? (
        <Button
          color="primary"
          title={state.walletAccount.wallet?.title}
          style={{ marginRight: 10 }}
          endIcon={
            <img
              src={state.walletAccount.wallet?.logo?.src || ""}
              style={{ width: 20 }}
              alt={state.walletAccount.wallet?.logo?.alt || ""}
            />
          }
        >
          {addressFormatter(state.walletAccount.address, 4)}
        </Button>
      ) : (
        <Button>Connect to Wallet</Button>
      ),
    [state.walletAccount]
  );

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
