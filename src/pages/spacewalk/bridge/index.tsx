import { createContext } from 'preact/compat';
import { StateUpdater, Dispatch, useMemo, useState } from 'preact/hooks';
import { Button, Card, Tabs } from 'react-daisyui';
import { Asset } from 'stellar-sdk';
import AmplitudeLogo from '../../../assets/AmplitudeLogo';
import PendulumLogo from '../../../assets/PendulumLogo';
import SettingsIcon from '../../../assets/SettingsIcon';
import StellarLogo from '../../../assets/StellarLogo';
import { SpacewalkConstants } from '../../../helpers/spacewalk';
import { useNodeInfoState } from '../../../NodeInfoProvider';
import { TenantName } from '../../../models/Tenant';
import Issue from './Issue';
import SettingsDialog from './Issue/SettingsDialog';
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
}

export const BridgeContext = createContext<BridgeContextValue>({ setSelectedAsset: () => undefined });

function Bridge(): JSX.Element | null {
  const [tabValue, setTabValue] = useState(BridgeTabs.Issue);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const { chain, tokenSymbol } = useNodeInfoState().state;
  const wrappedCurrencySuffix = SpacewalkConstants.WrappedCurrencySuffix;
  const [selectedAsset, setSelectedAsset] = useState<Asset>();

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
    <BridgeContext.Provider value={{ selectedAsset, setSelectedAsset }}>
      <div className="flex items-center justify-center h-full mt-4">
        <SettingsDialog
          visible={settingsVisible}
          onClose={() => setSettingsVisible(false)}
          bridgeDirection={bridgeDirection}
        />
        <Card className="bridge-card bg-base-200 min-h-500 w-full max-w-[520px] rounded-lg">
          <div className="flex justify-between px-5 mt-5">
            <Tabs className="flex justify-center flex-grow sm:w-5/6 tabs-boxed">
              <Tabs.Tab className="w-1/2 sm:w-2/5 p-2 h-full text-xs sm:text-sm " {...getTabProps(0)}>
                {chain.toLowerCase() === TenantName.Pendulum && <PendulumLogo className="w-6 h-6 mr-1" />}
                {(chain.toLowerCase() === TenantName.Amplitude || chain.toLowerCase() === TenantName.Foucoco) && (
                  <AmplitudeLogo className="w-6 h-6 mr-1" />
                )}
                To {chain}
              </Tabs.Tab>
              <Tabs.Tab className="w-1/2 sm:w-2/5 p-2 h-full text-xs sm:text-sm " {...getTabProps(1)}>
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
