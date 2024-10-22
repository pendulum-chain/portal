import { Tabs } from '../../../components/Tabs';
import { FundWalletTab } from '..';

interface FundWalletTabsProps {
  activeTab: FundWalletTab;
  setActiveTab: (index: FundWalletTab) => void;
}

export function FundWalletTabs({ activeTab, setActiveTab }: FundWalletTabsProps) {
  const tabItems = [
    { index: FundWalletTab.Buy, label: 'Buy' },
    { index: FundWalletTab.Exchange, label: 'Exchange' },
  ];

  return <Tabs<FundWalletTab> activeTab={activeTab} setActiveTab={setActiveTab} tabItems={tabItems} />;
}
