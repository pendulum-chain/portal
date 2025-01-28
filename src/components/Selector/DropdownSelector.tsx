import { AssetItem } from './AssetSelector/helpers';

interface Props<T> {
  items: T[];
  onChange: (item: T) => void;
  value?: T;
  children: JSX.Element;
  dropdownMenuClassName?: string;
}

export function DropdownSelector<T extends AssetItem>(props: Props<T>) {
  const { items, onChange, children, dropdownMenuClassName } = props;
  return (
    <div className="dropdown flex min-w-[95px] justify-end">
      {children}
      <ul
        tabIndex={0}
        className={`menu dropdown-content z-[1] min-w-52 rounded-box bg-base-100 p-2 shadow ${dropdownMenuClassName || ''}`}
      >
        {items.map((item) => (
          <li key={item.id} className="w-full">
            <a
              className="flex w-full"
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
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
