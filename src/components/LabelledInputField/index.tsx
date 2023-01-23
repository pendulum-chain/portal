import { Input, InputProps } from "react-daisyui";

interface Props {
  label?: string;
  type: string;
  value: string;
  onChange?: (value: string) => void;
  style?: React.CSSProperties;
}

function LabelledInputField(props: Props & InputProps) {
  const { label, onChange, ...rest } = props;

  return (
    <div
      className="flex w-full component-preview items-center justify-center gap-2 font-sans"
      style={props.style}
    >
      <div className="form-control w-full">
        <label className="label">
          {label && <span className="label-text">{label}</span>}
        </label>
        <Input
          className="border border-gray-500 rounded-md"
          {...rest}
          onInput={(event: React.ChangeEvent) => {
            if (event.target instanceof HTMLInputElement) {
              onChange?.(event.target.value);
            }
          }}
        />
      </div>
    </div>
  );
}

export default LabelledInputField;
