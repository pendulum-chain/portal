import { useNodeInfoState } from '../../../../NodeInfoProvider';
import { Tabs } from '../../../../components/Tabs';
import StellarLogo from '../../../../assets/StellarLogo';
import { TabProps } from '../../../../components/Tabs/Tab';
import { ChainLogo } from '../../../../assets/ChainLogo';
import { BridgeTabs } from '..';

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
        <ChainLogo className="z-20 mr-1 h-6 w-6" />
        <p className="z-20 text-gray-500 group-data-[active=true]:text-black dark:text-white">To {chain}</p>
      </>
    ) : (
      <></>
    );

  const ToStellar = () => (
    <>
      <StellarLogo className="z-20 mr-1 h-6 w-6" />
      <p className="z-20 text-gray-500 group-data-[active=true]:text-black dark:text-white">To Stellar</p>
    </>
  );

  const tabItems: Omit<TabProps<BridgeTabs>, 'setActiveTab' | 'activeTab'>[] = [
    {
      index: BridgeTabs.Issue,
      children: <ToPendulum />,
      className: cs,
      activeClassName: 'bg-[#f7f7f7] dark:bg-primary',
    },
    {
      index: BridgeTabs.Redeem,
      children: <ToStellar />,
      className: cs,
      activeClassName: 'bg-[#f7f7f7] dark:bg-primary',
    },
  ];

  return (
    <Tabs<BridgeTabs> activeTab={activeTab} setActiveTab={setActiveTab} tabItems={tabItems} className="border-0" />
  );
}
