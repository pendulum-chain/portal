import { Input, InputProps } from 'react-daisyui';
import { forwardRef } from 'react';
import './styles.css';

interface Props {
  label?: string;
  secondaryLabel?: string;
  color?: string;
  error?: string;
  type: string;
  step?: string;
  value: string;
  extraBtnText?: string;
  extraBtnAction?: () => void;
  onChange?: (value: string) => void;
  style?: React.CSSProperties;
}

const LabelledInputField = forwardRef((props: Props & InputProps) => {
  const { color, error, label, secondaryLabel, onChange, extraBtnAction, extraBtnText, style, ...rest } = props;

  const inputColor = error ? 'error' : color;

  return (
    <div className="flex w-full component-preview items-center justify-center gap-2 font-sans" style={style}>
      <div className="form-control w-full">
        <label className="label">
          {label && <span className="label-text">{error ? error : label}</span>}
          {secondaryLabel && <span className="label-text-alt">{secondaryLabel}</span>}
        </label>
        <div className="input-container">
          <Input
            className={`border rounded-md bg-transparent ${!error && 'border-gray-500'}`}
            color={inputColor}
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
          {extraBtnText && extraBtnAction && (
            <button className="rounded-md max-button bg-base-200" onClick={extraBtnAction}>
              {extraBtnText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
});

export default LabelledInputField;
