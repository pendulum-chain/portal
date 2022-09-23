import { h } from "preact";
import { WalletSelect } from "@talisman-connect/components";
import { Button } from "react-daisyui";
import { useEffect, useState } from "preact/hooks";
import { WalletAccount, Wallet } from "@talisman-connect/wallets";
import AddressFormatter from "./AddressFormatter";
import { useNodeInfoState } from "../NodeInfoProvider";

const OpenWallet = ({ networkName }: { networkName: string }): JSX.Element => {
  const [walletSelected, setWalletSelected] = useState<Partial<Wallet>>({});
  const [address, setAddress] = useState<string>("");
  const { state, setState } = useNodeInfoState();

  useEffect(() => {
    setState({
      ...state,
      ...{
        mainAddress: address, // console.log(keyring.accounts);
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
        {/* @ts-ignore */}
        <AddressFormatter address={address.toString()} trimLength={4} />
      </Button>
    );
  }

  return (
    <WalletSelect
      dappName={networkName}
      open={false}
      showAccountsList={true}
      triggerComponent={<Button>Connect to wallet</Button>}
      onWalletSelected={async (wallet: Wallet) => {
        setWalletSelected(wallet);
      }}
      onAccountSelected={async (account: WalletAccount) => {
        setAddress(account.address);
      }}
    />
  );
};

export default OpenWallet;
