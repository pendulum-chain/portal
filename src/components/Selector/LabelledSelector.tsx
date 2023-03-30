import { Select } from 'react-daisyui';
import { h } from 'preact';

interface Item {
  id: object | string;
  displayName: string;
}

interface Props<T> {
  items: T[];
  label?: string;
  onChange: (item: T) => void;
  value?: T;
  style?: React.CSSProperties;
  selectStyle?: React.CSSProperties;
}

function LabelledSelector<T extends Item>(props: Props<T>) {
  const { label, items, onChange, value } = props;

  return (
    <div className="form-control" style={props.style}>
      {label && (
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
      )}
      <Select
        className="w-fit max-w-full h-10 border border-gray-500 rounded-md bg-transparent"
        onChange={(e: any) => {
          const id = e.target?.value;
          const item = items.find((i) => i.id.toString() === id.toString());
          if (item) {
            onChange(item);
          }
        }}
        style={props.selectStyle}
        value={value?.id}
      >
        {items.map((item) => (
          <option key={item.id} value={item.id.toString()}>
            {item.displayName}
          </option>
        ))}
      </Select>
    </div>
  );
}

export default LabelledSelector;
