import { motion } from 'framer-motion';

export interface TabProps<T> {
  index: T;
  children: JSX.Element;
  activeTab: T;
  setActiveTab: (index: T) => void;
  className?: string;
  activeClassName?: string;
}

export function Tab<T>({ index, children, activeTab, setActiveTab, className, activeClassName }: TabProps<T>) {
  const getTabProps = (tabIndex: T) => ({
    'data-active': activeTab === tabIndex,
    onClick: () => setActiveTab(tabIndex),
  });

  const defaultClassName = 'group tab relative w-full h-full p-2 ';

  const stylingClassName = className || 'h-full text-lg font-bold text-primary py-5';

  return (
    <a role="tab" className={defaultClassName + stylingClassName} {...getTabProps(index)}>
      {children}
      {activeTab === index && (
        <motion.div
          layoutId="bubble"
          className={`absolute inset-0 z-10 h-full rounded-lg ${activeClassName || 'bg-primary'}`}
          transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
        />
      )}
    </a>
  );
}
