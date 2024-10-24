import { motion } from 'framer-motion';

interface TabItemProps<T> {
  index: T;
  label: string;
  activeTab: T;
  setActiveTab: (index: T) => void;
}

export function Tab<T>({ index, label, activeTab, setActiveTab }: TabItemProps<T>) {
  const getTabProps = (tabIndex: T) => ({
    'data-active': activeTab === tabIndex,
    onClick: () => setActiveTab(tabIndex),
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
