import { Tab } from './Tab';

interface TabsProps<T> {
  activeTab: T;
  setActiveTab: (index: T) => void;
  tabItems: { index: T; children: JSX.Element; className?: string }[];
  className?: string;
}

export function Tabs<T>({ activeTab, setActiveTab, tabItems, className }: TabsProps<T>) {
  return (
    <div
      role="tablist"
      className={`tabs-boxed tabs flex flex-grow justify-center ${className || 'border border-neutral-500 bg-base-100 p-0'}`}
    >
      {tabItems.map((tab) => (
        <Tab key={tab.index} activeTab={activeTab} setActiveTab={setActiveTab} {...tab}>
          {tab.children}
        </Tab>
      ))}
    </div>
  );
}
