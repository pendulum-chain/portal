import { Button, Checkbox } from 'react-daisyui';
import { useMemo } from 'preact/hooks';
import VaultSelector from '../../../../components/Selector/VaultSelector';
import useBridgeSettings from '../../../../hooks/spacewalk/useBridgeSettings';
import { Dialog } from '../../../staking/dialogs/Dialog';
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
        <div className="flex align-center mt-4">
          <Checkbox
            size="sm"
            color="success"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
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
          <div className="flex flex-col justify-start items-start mt-4">
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
