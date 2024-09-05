import { Button, Checkbox } from 'react-daisyui';
import { useMemo } from 'preact/hooks';
import { ChangeEvent } from 'preact/compat';
import VaultSelector from '../../../../components/Selector/VaultSelector';
import useBridgeSettings from '../../../../hooks/spacewalk/useBridgeSettings';
import { Dialog } from '../../../../components/Dialog';
import { BridgeDirection } from '../index';

interface Props {
  onClose: () => void;
  visible: boolean;
  bridgeDirection: BridgeDirection;
}

export function SettingsDialog({ bridgeDirection, visible, onClose }: Props) {
  const { manualVaultSelection, vaultsForCurrency, setManualVaultSelection, selectedVault, setSelectedVault } =
    useBridgeSettings();

  const content = useMemo(
    () => (
      <div className="text-center">
        <div className="align-center mt-4 flex">
          <Checkbox
            size="sm"
            color="success"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (e.target instanceof HTMLInputElement) {
                setManualVaultSelection(e.target.checked);
              }
            }}
            className="checkbox rounded"
            checked={manualVaultSelection}
          />
          <span className="ml-2">Manually select vault</span>
        </div>
        {manualVaultSelection && vaultsForCurrency && (
          <div className="mt-4 flex flex-col items-start justify-start">
            <div>Select Vault</div>
            <VaultSelector
              vaults={vaultsForCurrency}
              onChange={setSelectedVault}
              selectedVault={selectedVault}
              bridgeDirection={bridgeDirection}
            />
          </div>
        )}
      </div>
    ),
    [
      manualVaultSelection,
      vaultsForCurrency,
      setSelectedVault,
      selectedVault,
      bridgeDirection,
      setManualVaultSelection,
    ],
  );

  const actions = useMemo(
    () => (
      <Button color="primary" onClick={onClose} className="w-full">
        Select
      </Button>
    ),
    [onClose],
  );

  return <Dialog headerText="Select Vault" visible={visible} onClose={onClose} content={content} actions={actions} />;
}

export default SettingsDialog;
