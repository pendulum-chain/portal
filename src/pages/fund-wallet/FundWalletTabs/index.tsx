import { Tabs } from '../../../components/Tabs';
import { TabProps } from '../../../components/Tabs/Tab';
import { FundWalletTab } from '..';

interface FundWalletTabsProps {
  activeTab: FundWalletTab;
  setActiveTab: (index: FundWalletTab) => void;
}

export function FundWalletTabs({ activeTab, setActiveTab }: FundWalletTabsProps) {
  const tabItems: Omit<TabProps<FundWalletTab>, 'setActiveTab' | 'activeTab'>[] = [
    { index: FundWalletTab.Buy, children: <p className="z-20 group-data-[active=true]:text-white">Buy</p> },
    { index: FundWalletTab.Exchange, children: <p className="z-20 group-data-[active=true]:text-white">Exchange</p> },
  ];

  return <Tabs<FundWalletTab> activeTab={activeTab} setActiveTab={setActiveTab} tabItems={tabItems} />;
}
