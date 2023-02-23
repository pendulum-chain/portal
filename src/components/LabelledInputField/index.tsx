import { Input, InputProps } from 'react-daisyui';
import { forwardRef } from 'react';

interface Props {
  autoSelect?: boolean;
  label?: string;
  color?: string;
  error?: string;
  type: string;
  value: string;
  onChange?: (value: string) => void;
  style?: React.CSSProperties;
}

const LabelledInputField = forwardRef((props: Props & InputProps, ref) => {
  const { autoSelect, color, error, label, onChange, style, ...rest } = props;

  const inputColor = error ? 'error' : color;

  return (
    <div
      className="flex w-full component-preview items-center justify-center gap-2 font-sans"
      style={style}
    >
      <div className="form-control w-full">
        <label className="label">
          {label && <span className="label-text">{error ? error : label}</span>}
        </label>
        <Input
          className="border rounded-md bg-transparent"
          color={inputColor}
          ref={ref}
          {...rest}
          onFocus={(event: React.TargetedEvent) => {
            if (event.target instanceof HTMLInputElement) {
              autoSelect && event.target.select();
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
});

export default LabelledInputField;
