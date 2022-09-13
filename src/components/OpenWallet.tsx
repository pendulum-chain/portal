import { h } from "preact";
import { WalletSelect } from "@talisman-connect/components";
import { Button } from "react-daisyui";
import { useState } from "preact/hooks";
import { WalletAccount, Wallet } from "@talisman-connect/wallets";

const OpenWallet = ({ networkName }: { networkName: string }): JSX.Element => {
  const [walletSelected, setWalletSelected] = useState<Partial<Wallet>>({});
  const [address, setAddress] = useState<string>("");

  if (Object.keys(address).length > 0 && address.length > 0) {
    const addressLength = address.length;
    const displayAddress = [
      address.slice(0, 6),
      "...",
      address.slice(addressLength - 6, addressLength),
    ];

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
        {displayAddress}
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
