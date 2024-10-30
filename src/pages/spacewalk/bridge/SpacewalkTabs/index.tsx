import { BridgeTabs } from '..';
import { Tabs } from '../../../../components/Tabs';

import { AmplitudeLogo } from '../../../../assets/AmplitudeLogo';
import { PendulumLogo } from '../../../../assets/PendulumLogo';
import StellarLogo from '../../../../assets/StellarLogo';
import { TenantName } from '../../../../models/Tenant';
import { useNodeInfoState } from '../../../../NodeInfoProvider';
import { TabProps } from '../../../../components/Tabs/Tab';

interface SpacewalkTabsProps {
  activeTab: BridgeTabs;
  setActiveTab: (index: BridgeTabs) => void;
}

export function SpacewalkTabs({ activeTab, setActiveTab }: SpacewalkTabsProps) {
  const { chain } = useNodeInfoState().state;

  const cs = 'z-20 flex items-center justify-center p-2 text-xs sm:text-sm ';

  const ToPendulum = () =>
    chain ? (
      <>
        {chain.toLowerCase() === TenantName.Pendulum && <PendulumLogo className="z-20 mr-1 h-6 w-6" />}
        {(chain.toLowerCase() === TenantName.Amplitude || chain.toLowerCase() === TenantName.Foucoco) && (
          <AmplitudeLogo className="mr-1 h-6 w-6" />
        )}
        <p className="z-20">To {chain}</p>
      </>
    ) : (
      <></>
    );

  const ToStellar = () => (
    <>
      <StellarLogo className="z-20 mr-1 h-6 w-6" />
      <p className="z-20">To Stellar</p>
    </>
  );

  const tabItems: { index: BridgeTabs; children: JSX.Element; className: string }[] = [
    { index: BridgeTabs.Issue, children: <ToPendulum />, className: cs },
    { index: BridgeTabs.Redeem, children: <ToStellar />, className: cs },
  ];

  return <Tabs<BridgeTabs> activeTab={activeTab} setActiveTab={setActiveTab} tabItems={tabItems} />;
}
