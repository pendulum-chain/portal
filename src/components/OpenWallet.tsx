import { h } from "preact";
import { WalletSelect } from "@talisman-connect/components";
import { Button } from "react-daisyui";
import { useEffect, useState } from "preact/hooks";
import { WalletAccount, Wallet } from "@talisman-connect/wallets";
import Keyring from "@polkadot/keyring";
import addressFormatter from "../helpers/addressFormatter";
import { useGlobalState } from "../GlobalStateProvider";
import { useNodeInfoState } from "../NodeInfoProvider";

const OpenWallet = ({ networkName }: { networkName: string }): JSX.Element => {
  const [walletSelected, setWalletSelected] = useState<Partial<Wallet>>({});
  const [address, setAddress] = useState<string>("");
  const { state, setState } = useGlobalState();
  const { state: nodeState } = useNodeInfoState();

  const keyring = new Keyring();
  nodeState.ss58Format && keyring.setSS58Format(nodeState.ss58Format);

  useEffect(() => {
    setState({
      ...state,
      ...{
        userAddress: address,
      },
    });
  }, [address]);

  if (Object.keys(address).length > 0 && address.length > 0) {
    return (
      <Button
        title={walletSelected.title}
        style={{ marginRight: 10 }}
        endIcon={
          <img
            src={walletSelected.logo?.src || ""}
            style={{ width: 20 }}
            alt={walletSelected.logo?.alt || ""}
          />
        }
      >
        {addressFormatter(address.toString(), 4)}
      </Button>
    );
  }

  return (
    <WalletSelect
      dappName={networkName}
      open={false}
      showAccountsList={true}
      triggerComponent={<Button className="btn-primary">Connect wallet</Button>}
      onWalletSelected={async (wallet: Wallet) => {
        setWalletSelected(wallet);
      }}
      onAccountSelected={async (account: WalletAccount) => {
        const procAddress = keyring.encodeAddress(account.address);
        setAddress(procAddress);
      }}
    />
  );
};

export default OpenWallet;
