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
        <div className="flex mt-4 align-center">
          <Checkbox
            size="sm"
            color="success"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (e.target instanceof HTMLInputElement) {
                setManualVaultSelection(e.target.checked);
              }
            }}
            className="rounded checkbox"
            checked={manualVaultSelection}
          />
          <span className="ml-2">Manually select vault</span>
        </div>
        {manualVaultSelection && vaultsForCurrency && (
          <div className="flex flex-col items-start justify-start mt-4">
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
    [manualVaultSelection, vaultsForCurrency, setSelectedVault, selectedVault, setManualVaultSelection],
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
