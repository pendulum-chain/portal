import { h } from "preact";
import { Button, Checkbox, Form } from "react-daisyui";
import { useEffect, useMemo, useState } from "preact/hooks";
import LabelledInputField from "../../components/LabelledInputField";
import LabelledSelector from "../../components/LabelledSelector";
import { useIssuePallet } from "../../hooks/spacewalk/issue";
import { useVaultRegistryPallet } from "../../hooks/spacewalk/vaultRegistry";
import { VaultRegistryVault } from "@polkadot/types/lookup";
import { convertCurrencyToStellarAsset } from "../../helpers/spacewalk";
import { Asset } from "stellar-sdk";
import { stringifyStellarAsset } from "../../helpers/stellar";

interface AssetSelectorProps {
  selectedAsset?: Asset;
  onChange: (asset: Asset) => void;
  assets: Asset[];
  style?: React.CSSProperties;
}

function AssetSelector(props: AssetSelectorProps): JSX.Element {
  const { assets, selectedAsset } = props;

  const items = assets.map((asset) => {
    return {
      displayName: asset.getCode(),
      id: stringifyStellarAsset(asset),
    };
  });

  const selectedAssetItem = selectedAsset
    ? {
        displayName: selectedAsset.getCode(),
        id: stringifyStellarAsset(selectedAsset),
      }
    : undefined;

  return (
    <LabelledSelector
      items={items}
      label="Asset"
      onChange={(newItem) => {
        const newAsset = assets.find((asset) => {
          return stringifyStellarAsset(asset) === newItem.id;
        });
        newAsset && props.onChange(newAsset);
      }}
      value={selectedAssetItem}
      style={props.style}
    />
  );
}

interface VaultSelectorProps {
  vaults: VaultRegistryVault[];
  selectedVault?: VaultRegistryVault;
  onChange: (vault: VaultRegistryVault) => void;
}

function VaultSelector(props: VaultSelectorProps): JSX.Element {
  const { vaults, selectedVault } = props;

  const items = vaults.map((vault) => {
    return {
      displayName: vault.id.accountId.toString(),
      id: vault.id,
    };
  });

  const selectedVaultItem = selectedVault
    ? {
        displayName: selectedVault.id.accountId.toString(),
        id: selectedVault.id,
      }
    : undefined;

  return (
    <LabelledSelector
      items={items}
      onChange={(newItem) => {
        const newVault = vaults.find((vault) => {
          return vault.id === newItem.id;
        });
        newVault && props.onChange(newVault);
      }}
      value={selectedVaultItem}
    />
  );
}

interface FeeBoxProps {
  bridgedAsset?: Asset;
}

function FeeBox(props: FeeBoxProps): JSX.Element {
  const { bridgedAsset } = props;

  // TODO - get this from somewhere
  const network = "Amplitude"; // or Pendulum
  const nativeCurrency = network === "Amplitude" ? "AMPE" : "PEN";
  const wrappedCurrencyPrefix = network === "Amplitude" ? "a" : "p";

  const wrappedCurrencyName = bridgedAsset
    ? wrappedCurrencyPrefix + bridgedAsset.getCode()
    : "";

  const bridgeFee = useMemo(() => {
    return 0;
  }, []);

  const griefingCollateral = useMemo(() => {
    return 0;
  }, []);

  const transactionFee = useMemo(() => {
   return 0;
  },[]);

  return (
    <div className="shadow bg-base-200 rounded-lg p-4 my-4 flex flex-col">
      <div className="flex justify-between">
        <span>To {network}</span>
        <span>0.00 {wrappedCurrencyName}</span>
      </div>
      <div className="flex justify-between mt-2">
        <span>Bridge Fee</span>
        <span>{bridgeFee} {bridgedAsset?.getCode()}</span>
      </div>
      <div className="flex justify-between mt-2">
        <span>Security Deposit</span>
        <span>{griefingCollateral} {nativeCurrency}</span>
      </div>
      <div className="flex justify-between mt-2">
        <span>Transaction Fee</span>
        <span>{transactionFee} {nativeCurrency}</span>
      </div>
    </div>
  );
}

function Issue(): JSX.Element {
  const [amount, setAmount] = useState<string>("0");
  const [selectedVault, setSelectedVault] = useState<VaultRegistryVault>();
  const [selectedAsset, setSelectedAsset] = useState<Asset>();
  const [manualVaultSelection, setManualVaultSelection] = useState(false);

  const issueHelpers = useIssuePallet();
  const { getVaults } = useVaultRegistryPallet();

  const vaults = getVaults();

  const wrappedAssets = useMemo(() => {
    return vaults
      .map((vault) => {
        const currency = vault.id.currencies.wrapped;
        return convertCurrencyToStellarAsset(currency);
      })
      .filter((asset): asset is Asset => {
        return asset != null;
      });
  }, [vaults]);

  const vaultsForCurrency = useMemo(() => {
    return vaults.filter((vault) => {
      if (!selectedAsset) {
        return false;
      }

      const vaultCurrencyAsAsset = convertCurrencyToStellarAsset(
        vault.id.currencies.wrapped
      );
      return vaultCurrencyAsAsset && vaultCurrencyAsAsset.equals(selectedAsset);
    });
  }, [selectedAsset, vaults]);

  useEffect(() => {
    if (!manualVaultSelection) {
      // TODO build a better algorithm for automatically selecting a vault
      if (vaultsForCurrency.length > 0) {
        setSelectedVault(vaultsForCurrency[0]);
      }
      if (!selectedAsset && wrappedAssets.length > 0) {
        setSelectedAsset(wrappedAssets[0]);
      }
    }
  }, [manualVaultSelection, vaultsForCurrency]);

  return (
    <div className="flex items-center justify-center h-full space-walk grid place-items-center p-5">
      <div style={{ width: 500 }}>
        <div class="box">
          <div class="px-5 flex flex-col">
            <div className="flex items-center">
              <LabelledInputField
                label="From Stellar"
                type="number"
                value={amount}
                onChange={setAmount}
                style={{ flexGrow: 2 }}
              />
              <AssetSelector
                selectedAsset={selectedAsset}
                assets={wrappedAssets}
                onChange={setSelectedAsset}
                style={{ flexGrow: 1 }}
              />
            </div>
            <Form className="shadow bg-base-200 rounded-lg p-4 my-4">
              <Form.Label title="Manually select vault">
                <Checkbox
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.target instanceof HTMLInputElement) {
                      setManualVaultSelection(e.target.checked);
                    }
                  }}
                  checked={manualVaultSelection}
                />
              </Form.Label>
            </Form>
            {manualVaultSelection && (
              <VaultSelector
                vaults={vaultsForCurrency}
                onChange={setSelectedVault}
                selectedVault={selectedVault}
              />
            )}
            <FeeBox bridgedAsset={selectedAsset} />
          </div>
          <div className="parity">
            <Button color="success mt-5" onClick={() => undefined}>
              <span className="uppercase">Bridge</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Issue;
