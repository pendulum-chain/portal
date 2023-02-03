import { Select } from "react-daisyui";
import { h } from "preact";

interface Props<T> {
  items: T[];
  label?: string;
  onChange: (item: T) => void;
  value?: T;
  style?: React.CSSProperties;
}

function LabelledSelector<T extends { id: any; displayName: string }>(props: Props<T>) {
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
        onChange={(e) => {
          const id = e.target.value;
          const item = items.find((i) => i.id === id);
          if (item) {
            onChange(item);
          }
        }}
        value={value?.id}
      >
        {items.map((item) => (
          <option key={item.id} value={item.id}>
            {item.displayName}
          </option>
        ))}
      </Select>
    </div>
  );
}

export default LabelledSelector;
