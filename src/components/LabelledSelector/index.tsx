import { Select } from "react-daisyui";
import { h } from "preact";
import "./styles.css";

function ArrowIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{
        width: 20,
        height: 20,
        marginLeft: 10,
        maxWidth: 15,
      }}
      viewBox="0 0 448 512"
    >
      <path
        className="fill-gray-400"
        d="M224 416c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L224 338.8l169.4-169.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-192 192C240.4 412.9 232.2 416 224 416z"
      />
    </svg>
  );
}

interface Props<T> {
  items: T[];
  label?: string;
  onChange: (item: T) => void;
  value?: T;
  style?: React.CSSProperties;
}

function Selector<T extends { id: any; displayName: string }>(props: Props<T>) {
  const { label, items, onChange, value } = props;

  return (
    <div className="form-control max-w-xs" style={props.style}>
      {label && (
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
      )}
      <Select
        className="w-fit h-10 border border-gray-500 rounded-md"
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

export default Selector;
