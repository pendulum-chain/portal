import { Dispatch, useMemo, useState, useContext, createContext } from 'react';
import { Button, Card } from 'react-daisyui';
import { Asset } from '@stellar/stellar-sdk';

import SettingsIcon from '../../../assets/SettingsIcon';
import { SpacewalkConstants } from '../../../helpers/spacewalk';
import { ExtendedRegistryVault } from '../../../hooks/spacewalk/useVaultRegistryPallet';
import { useNodeInfoState } from '../../../NodeInfoProvider';
import SettingsDialog from './Issue/SettingsDialog';
import { SpacewalkTabs } from './SpacewalkTabs';
import Issue from './Issue';
import Redeem from './Redeem';
import '../styles.css';

export enum BridgeTabs {
  Issue = 0,
  Redeem = 1,
}

export enum BridgeDirection {
  Issue = 'issue',
  Redeem = 'redeem',
}

interface BridgeContextValue {
  selectedAsset?: Asset;
  setSelectedAsset: Dispatch<Asset | undefined>;
  selectedVault?: ExtendedRegistryVault;
  setSelectedVault: Dispatch<ExtendedRegistryVault | undefined>;
  manualVaultSelection: boolean;
  setManualVaultSelection: Dispatch<boolean>;
  bridgeDirection: BridgeDirection;
  extendedVaults: ExtendedRegistryVault[];
  setExtendedVaults: Dispatch<ExtendedRegistryVault[]>;
}

const BridgeContext = createContext<BridgeContextValue>({
  setSelectedAsset: () => undefined,
  setSelectedVault: () => undefined,
  manualVaultSelection: false,
  setManualVaultSelection: () => undefined,
  bridgeDirection: BridgeDirection.Issue,
  extendedVaults: [],
  setExtendedVaults: () => undefined,
});

export const useBridgeContext = () => useContext(BridgeContext);

function Bridge() {
  const [tabValue, setTabValue] = useState(BridgeTabs.Issue);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const { chain, tokenSymbol } = useNodeInfoState().state;
  const wrappedCurrencySuffix = SpacewalkConstants.WrappedCurrencySuffix;
  const [selectedAsset, setSelectedAsset] = useState<Asset>();
  const [selectedVault, setSelectedVault] = useState<ExtendedRegistryVault>();
  const [manualVaultSelection, setManualVaultSelection] = useState(false);
  const [extendedVaults, setExtendedVaults] = useState<ExtendedRegistryVault[]>([]);

  const Content = useMemo(() => {
    if (!chain) return;
    switch (tabValue) {
      case BridgeTabs.Issue:
        return (
          <Issue network={chain} nativeCurrency={tokenSymbol || ''} wrappedCurrencySuffix={wrappedCurrencySuffix} />
        );
      case BridgeTabs.Redeem:
        return (
          <Redeem network={chain} nativeCurrency={tokenSymbol || ''} wrappedCurrencySuffix={wrappedCurrencySuffix} />
        );
    }
  }, [chain, tokenSymbol, tabValue, wrappedCurrencySuffix]);

  const bridgeDirection = tabValue === BridgeTabs.Issue ? BridgeDirection.Issue : BridgeDirection.Redeem;

  return chain ? (
    <BridgeContext
      value={{
        selectedAsset,
        setSelectedAsset,
        selectedVault,
        setSelectedVault,
        manualVaultSelection,
        setManualVaultSelection,
        bridgeDirection,
        extendedVaults,
        setExtendedVaults,
      }}
    >
      <div className="mt-4 flex items-center justify-center">
        <SettingsDialog
          visible={settingsVisible}
          onClose={() => setSettingsVisible(false)}
          bridgeDirection={bridgeDirection}
        />
        <Card className="bridge-card min-h-500 w-full max-w-[520px] rounded-lg bg-base-200">
          <div className="mt-5 flex justify-between px-5">
            <SpacewalkTabs activeTab={tabValue} setActiveTab={setTabValue} />
            <Button
              color="ghost"
              className="settings m-auto h-fit min-h-0 p-1"
              onClick={() => setSettingsVisible(true)}
            >
              <SettingsIcon />
            </Button>
          </div>
          {Content}
        </Card>
      </div>
    </BridgeContext>
  ) : (
    <></>
  );
}

export default Bridge;
