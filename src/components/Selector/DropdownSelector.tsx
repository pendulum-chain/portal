import { Dropdown } from 'react-daisyui';
import { AssetItem } from './AssetSelector/helpers';

interface Props<T> {
  items: T[];
  onChange: (item: T) => void;
  value?: T;
  children: JSX.Element;
}

function DropdownSelector<T extends AssetItem>(props: Props<T>) {
  const { items, onChange, children } = props;
  return (
    <div className="flex flex-grow">
      <div className="dropdown min-w-[95px] flex justify-end">
        {children}
        <Dropdown.Menu className="w-52 z-50">
          {items.map((item) => (
            <Dropdown.Item
              key={item.id}
              onClick={() => {
                const elem = document.activeElement;
                if (elem && elem instanceof HTMLElement) {
                  elem?.blur();
                }
                onChange(item);
              }}
            >
              {item.icon && <img src={item.icon} className="w-6" alt={item?.name} />}
              {item.displayName}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </div>
    </div>
  );
}

export default DropdownSelector;
