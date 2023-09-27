import { Button, Checkbox, Modal } from 'react-daisyui';
import VaultSelector from '../../../components/Selector/VaultSelector';
import useBridgeSettings from '../../../hooks/spacewalk/useBridgeSettings';

interface Props {
  onClose?: () => void;
  visible?: boolean;
}

export function SettingsDialog({ visible, onClose }: Props) {
  const { manualVaultSelection, vaultsForCurrency, setManualVaultSelection, selectedVault, setSelectedVault } =
    useBridgeSettings();
  return (
    <Modal open={visible} className="bg-base-100">
      <Modal.Header className="text-2xl">Select Vault</Modal.Header>
      <Button color="ghost" size="md" shape="circle" className="absolute right-4 top-4" onClick={onClose}>
        ✕
      </Button>
      <Modal.Body>
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
                showMaxTokensFor="issuableTokens"
              />
            </div>
          )}
        </div>
      </Modal.Body>

      <Modal.Actions className="justify-center">
        <Button color="primary" onClick={onClose}>
          Ok
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default SettingsDialog;
