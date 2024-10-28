import { createContext } from 'react';
import { Dispatch, useMemo, useState, useContext } from 'react';
import { Button, Card, Tabs } from 'react-daisyui';
import { Asset } from '@stellar/stellar-sdk';
import AmplitudeLogo from '../../../assets/AmplitudeLogo';
import PendulumLogo from '../../../assets/PendulumLogo';
import SettingsIcon from '../../../assets/SettingsIcon';
import StellarLogo from '../../../assets/StellarLogo';
import { SpacewalkConstants } from '../../../helpers/spacewalk';
import { ExtendedRegistryVault } from '../../../hooks/spacewalk/useVaultRegistryPallet';
import { useNodeInfoState } from '../../../NodeInfoProvider';
import { TenantName } from '../../../models/Tenant';
import SettingsDialog from './Issue/SettingsDialog';
import Issue from './Issue';
import Redeem from './Redeem';
import '../styles.css';

enum BridgeTabs {
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

  const getTabProps = (index: number) => ({
    active: tabValue === index,
    onClick: () => setTabValue(index),
  });

  const bridgeDirection = tabValue === BridgeTabs.Issue ? BridgeDirection.Issue : BridgeDirection.Redeem;

  return chain ? (
    <BridgeContext.Provider
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
      <div className="flex items-center justify-center h-full mt-4">
        <SettingsDialog
          visible={settingsVisible}
          onClose={() => setSettingsVisible(false)}
          bridgeDirection={bridgeDirection}
        />
        <Card className="bridge-card min-h-500 w-full max-w-[520px] rounded-lg bg-base-200">
          <div className="flex justify-between px-5 mt-5">
            <Tabs className="flex justify-center flex-grow tabs-boxed sm:w-5/6">
              <Tabs.Tab className="w-1/2 h-full p-2 text-xs sm:w-2/5 sm:text-sm" {...getTabProps(0)}>
                {chain.toLowerCase() === TenantName.Pendulum && <PendulumLogo className="w-6 h-6 mr-1" />}
                {(chain.toLowerCase() === TenantName.Amplitude || chain.toLowerCase() === TenantName.Foucoco) && (
                  <AmplitudeLogo className="w-6 h-6 mr-1" />
                )}
                To {chain}
              </Tabs.Tab>
              <Tabs.Tab className="w-1/2 h-full p-2 text-xs sm:w-2/5 sm:text-sm" {...getTabProps(1)}>
                <StellarLogo className="w-6 h-6 mr-1" />
                To Stellar
              </Tabs.Tab>
            </Tabs>
            <Button
              color="ghost"
              className="min-h-0 p-1 m-auto settings h-fit"
              onClick={() => setSettingsVisible(true)}
            >
              <SettingsIcon />
            </Button>
          </div>
          {Content}
        </Card>
      </div>
    </BridgeContext.Provider>
  ) : (
    <></>
  );
}

export default Bridge;
