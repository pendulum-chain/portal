import { createContext } from 'preact/compat';
import { StateUpdater, Dispatch, useMemo, useState, useContext } from 'preact/hooks';
import { Button, Card, Tabs } from 'react-daisyui';
import { Asset } from 'stellar-sdk';
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
  setSelectedAsset: Dispatch<StateUpdater<Asset | undefined>>;
  selectedVault?: ExtendedRegistryVault;
  setSelectedVault: Dispatch<StateUpdater<ExtendedRegistryVault | undefined>>;
  manualVaultSelection: boolean;
  setManualVaultSelection: Dispatch<StateUpdater<boolean>>;
  bridgeDirection: BridgeDirection;
  extendedVaults: ExtendedRegistryVault[];
  setExtendedVaults: Dispatch<StateUpdater<ExtendedRegistryVault[]>>;
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

function Bridge(): JSX.Element | null {
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
      <div className="mt-4 flex h-full items-center justify-center">
        <SettingsDialog
          visible={settingsVisible}
          onClose={() => setSettingsVisible(false)}
          bridgeDirection={bridgeDirection}
        />
        <Card className="bridge-card min-h-500 w-full max-w-[520px] rounded-lg bg-base-200">
          <div className="mt-5 flex justify-between px-5">
            <Tabs className="tabs-boxed flex flex-grow justify-center sm:w-5/6">
              <Tabs.Tab className="h-full w-1/2 p-2 text-xs sm:w-2/5 sm:text-sm" {...getTabProps(0)}>
                {chain.toLowerCase() === TenantName.Pendulum && <PendulumLogo className="mr-1 h-6 w-6" />}
                {(chain.toLowerCase() === TenantName.Amplitude || chain.toLowerCase() === TenantName.Foucoco) && (
                  <AmplitudeLogo className="mr-1 h-6 w-6" />
                )}
                To {chain}
              </Tabs.Tab>
              <Tabs.Tab className="h-full w-1/2 p-2 text-xs sm:w-2/5 sm:text-sm" {...getTabProps(1)}>
                <StellarLogo className="mr-1 h-6 w-6" />
                To Stellar
              </Tabs.Tab>
            </Tabs>
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
    </BridgeContext.Provider>
  ) : (
    <></>
  );
}

export default Bridge;
