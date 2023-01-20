import { h } from "preact";
import { Button, Checkbox, Form } from "react-daisyui";
import { useEffect, useMemo, useState } from "preact/hooks";
import "./styles.css";
import LabelledInputField from "../../components/LabelledInputField";
import DropdownSelector from "../../components/DropdownSelector";
import { useIssuePallet } from "../../hooks/spacewalk/issue";
import { useVaultRegistryPallet } from "../../hooks/spacewalk/vaultRegistry";
import { VaultRegistryVault } from "@polkadot/types/lookup";

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
    <DropdownSelector
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

function Issue(): JSX.Element {
  const [amount, setAmount] = useState<string>("0");
  const [selectedVault, setSelectedVault] = useState<VaultRegistryVault>();
  const [manualVaultSelection, setManualVaultSelection] = useState(false);

  const issueHelpers = useIssuePallet();
  const { getVaults } = useVaultRegistryPallet();

  const vaults = getVaults();

  const vaultsForCurrency = useMemo(() => {
    return vaults.filter((vault) => {
      // const currency = vault.id.currencies.wrapped.isAlphaNum4
      //   ? vault.id.currencies.wrapped.asAlphaNum4.code
      //   : vault.id.currencies.wrapped.asAlphaNum12().assetCode;
      // return vault.id.currencies.wrapped === "USD";
      return true;
    });
  }, [vaults]);

  useEffect(() => {
    if (!manualVaultSelection) {
      // TODO build a better algorithm for automatically selecting a vault
      if (vaultsForCurrency.length > 0) {
        setSelectedVault(vaultsForCurrency[0]);
      }
    }
  }, [manualVaultSelection, vaultsForCurrency]);

  return (
    <div className="flex items-center justify-center h-full space-walk grid place-items-center p-5">
      <div style={{ width: 500 }}>
        <div class="box">
          <div class="box-inner">
            <LabelledInputField
              label="From Stellar"
              type="number"
              value={amount}
              onChange={setAmount}
            />
            <DropdownSelector
              items={[{ displayName: "USDC", id: 1 }]}
              onChange={() => undefined}
            />
            <Form className="shadow bg-base-200 rounded-lg p-4 m-4">
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
