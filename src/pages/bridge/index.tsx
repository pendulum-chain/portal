import { useMemo, useState } from 'preact/hooks';
import { Button, Card, Tabs } from 'react-daisyui';
import { useNodeInfoState } from '../../NodeInfoProvider';
import AmplitudeLogo from '../../assets/AmplitudeLogo';
import PendulumLogo from '../../assets/PendulumLogo';
import SettingsIcon from '../../assets/SettingsIcon';
import StellarLogo from '../../assets/StellarLogo';
import { SpacewalkConstants } from '../../helpers/spacewalk';
import Issue from './Issue';
import SettingsDialog from './Issue/SettingsDialog';
import Redeem from './Redeem';
import './styles.css';

enum BridgeTabs {
  Issue = 0,
  Redeem = 1,
}

function Bridge(): JSX.Element | null {
  const [tabValue, setTabValue] = useState(0);
  const { chain } = useNodeInfoState().state;
  const nativeCurrency = chain === 'Amplitude' ? 'AMPE' : 'PEN';
  const wrappedCurrencySuffix = SpacewalkConstants.WrappedCurrencySuffix;

  const Content = useMemo(() => {
    if (!chain) return;
    switch (tabValue) {
      case BridgeTabs.Issue:
        return <Issue network={chain} nativeCurrency={nativeCurrency} wrappedCurrencySuffix={wrappedCurrencySuffix} />;
      case BridgeTabs.Redeem:
        return <Redeem network={chain} nativeCurrency={nativeCurrency} wrappedCurrencySuffix={wrappedCurrencySuffix} />;
    }
  }, [chain, nativeCurrency, tabValue, wrappedCurrencySuffix]);

  const settingsModal = useMemo(() => {
    if (!chain) return;
    switch (tabValue) {
      case BridgeTabs.Issue:
        return <SettingsDialog />;
      case BridgeTabs.Redeem:
        return undefined;
    }
  }, [tabValue]);

  return chain ? (
    <div className="h-full flex items-center justify-center mt-4">
      {settingsModal}
      <Card className="bridge-card bg-base-200 min-h-500 w-full max-w-[520px] rounded-lg">
        <div className="flex justify-between px-5 mt-5">
          <Tabs className="flex w-5/6 flex-grow justify-center" boxed value={tabValue} onChange={setTabValue}>
            <Tabs.Tab className="w-1/3 h-fit p-2" value={0}>
              {chain === 'Pendulum' && <PendulumLogo className="w-6 h-6 mr-1" />}
              {chain === 'Amplitude' && <AmplitudeLogo className="w-6 h-6 mr-1" />}
              To {chain}
            </Tabs.Tab>
            <Tabs.Tab className="w-1/3 h-fit p-2" value={1}>
              <StellarLogo className="w-6 h-6 mr-1" />
              Back To Stellar
            </Tabs.Tab>
          </Tabs>
          {!!settingsModal && (
            <Button color="ghost" className="p-1 min-h-0 h-fit m-auto">
              <SettingsIcon />
            </Button>
          )}
        </div>
        {Content}
      </Card>
    </div>
  ) : (
    <></>
  );
}

export default Bridge;
