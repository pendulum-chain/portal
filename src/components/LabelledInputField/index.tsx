import { Input, InputProps } from "react-daisyui";

interface Props {
  autoSelect?: boolean;
  label?: string;
  secondaryLabel?: string;
  type: string;
  value: string;
  onChange?: (value: string) => void;
  style?: React.CSSProperties;
}

function LabelledInputField(props: Props & InputProps) {
  const { autoSelect, label, secondaryLabel, onChange, ...rest } = props;

  return (
    <div
      className="flex w-full component-preview items-center justify-center gap-2 font-sans"
      style={props.style}
    >
      <div className="form-control w-full">
        <label className="label">
          {label && <span className="label-text">{label}</span>}
          {secondaryLabel && (
            <span className="label-text-alt">{secondaryLabel}</span>
          )}
        </label>
        <Input
          className="border border-gray-500 rounded-md bg-transparent"
          color="primary"
          {...rest}
          onFocus={(event: React.TargetedEvent) => {
            if (event.target instanceof HTMLInputElement) {
              event.target.select();
            }
          }}
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
