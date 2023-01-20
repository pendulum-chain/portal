import { Input, InputProps } from "react-daisyui";

interface Props {
  label?: string;
  type: string;
  value: string;
  onChange?: (value: string) => void;
}

function LabelledInputField(props: Props & InputProps) {
  const { label, onChange, ...rest } = props;

  return (
    <div className="flex w-full component-preview p-4 items-center justify-center gap-2 font-sans">
      <div className="form-control w-full max-w-xs">
        <label className="label">
          {label && <span className="label-text">{label}</span>}
        </label>
        <Input
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
