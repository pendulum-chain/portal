import { motion } from 'framer-motion';
import { FundWalletTab } from '..';

interface FundWalletTabsProps {
  activeTab: FundWalletTab;
  setActiveTab: (index: FundWalletTab) => void;
}

type TabItemProps = {
  index: FundWalletTab;
  label: string;
} & FundWalletTabsProps;

function TabItem({ index, label, activeTab, setActiveTab }: TabItemProps) {
  const getTabProps = (index: FundWalletTab) => ({
    'data-active': activeTab === index,
    onClick: () => setActiveTab(index),
  });

  return (
    <a
      role="tab"
      className="sm:text-md group tab relative h-full w-full py-5 text-lg font-bold text-primary"
      {...getTabProps(index)}
    >
      <p className="z-20 group-data-[active=true]:text-white">{label}</p>
      {activeTab === index && (
        <motion.div
          layoutId="bubble"
          // @ts-expect-error Caused by Preact, remove this comment once migrated to React
          className="absolute inset-0 z-10 rounded-lg bg-primary"
          transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
        />
      )}
    </a>
  );
}

export function FundWalletTabs({ activeTab, setActiveTab }: FundWalletTabsProps) {
  return (
    <div className="mt-5 flex justify-between">
      <div
        role="tablist"
        className="tabs-boxed tabs flex flex-grow justify-center border border-neutral-500 bg-base-100 p-0 sm:w-5/6"
      >
        <TabItem index={FundWalletTab.Buy} label="Buy" {...{ activeTab, setActiveTab }} />
        <TabItem index={FundWalletTab.Exchange} label="Exchange" {...{ activeTab, setActiveTab }} />
      </div>
    </div>
  );
}
