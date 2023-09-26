import { Dropdown } from 'react-daisyui';

interface Props<T> {
  items: T[];
  onChange: (item: T) => void;
  value?: T;
  buttonComponent: HTMLElement;
}

function DropdownSelector<T extends { id: unknown; displayName: string }>(props: Props<T>) {
  const { items, onChange, buttonComponent } = props;

  return (
    <div className="flex flex-grow">
      <div className="dropdown min-w-[95px]">
        {buttonComponent}
        <Dropdown.Menu className="w-52">
          {items.map((item) => (
            <Dropdown.Item key={item.id} onClick={() => onChange(item)}>
              {item.displayName}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </div>
      <div className="h-10" />
    </div>
  );
}

export default DropdownSelector;
