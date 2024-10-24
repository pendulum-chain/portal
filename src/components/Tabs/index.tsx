import { Tab } from './Tab';

interface TabsProps<T> {
  activeTab: T;
  setActiveTab: (index: T) => void;
  tabItems: { index: T; label: string }[];
}

export function Tabs<T>({ activeTab, setActiveTab, tabItems }: TabsProps<T>) {
  return (
    <div className="mt-5 flex justify-between">
      <div
        role="tablist"
        className="tabs-boxed tabs flex flex-grow justify-center border border-neutral-500 bg-base-100 p-0 sm:w-5/6"
      >
        {tabItems.map((tab) => (
          <Tab key={tab.label} index={tab.index} label={tab.label} activeTab={activeTab} setActiveTab={setActiveTab} />
        ))}
      </div>
    </div>
  );
}
