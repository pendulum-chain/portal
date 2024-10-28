import { Tab } from './Tab';

interface TabsProps<T> {
  activeTab: T;
  setActiveTab: (index: T) => void;
  tabItems: { index: T; label: string }[];
}

export function Tabs<T>({ activeTab, setActiveTab, tabItems }: TabsProps<T>) {
  return (
    <div className="flex justify-between mt-5">
      <div
        role="tablist"
        className="flex justify-center flex-grow p-0 border tabs-boxed tabs border-neutral-500 bg-base-100 sm:w-5/6"
      >
        {tabItems.map((tab) => (
          <Tab key={tab.label} index={tab.index} label={tab.label} activeTab={activeTab} setActiveTab={setActiveTab} />
        ))}
      </div>
    </div>
  );
}
