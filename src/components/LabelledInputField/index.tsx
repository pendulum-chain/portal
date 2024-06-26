import { CSSProperties, ChangeEvent, TargetedEvent, forwardRef } from 'preact/compat';
import { Input, InputProps } from 'react-daisyui';
import { UseFormRegisterReturn } from 'react-hook-form';
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
  style?: CSSProperties;
  register?: UseFormRegisterReturn;
}

const LabelledInputField = forwardRef((props: Props & InputProps) => {
  const { register, color, error, label, secondaryLabel, onChange, extraBtnAction, extraBtnText, style, ...rest } =
    props;

  const inputColor = error ? 'error' : color;

  return (
    <>
      <div className="flex items-center justify-center w-full gap-2 component-preview" style={style}>
        <div className="w-full form-control">
          <label className="label">
            {label && <span className="label-text">{label}</span>}
            {secondaryLabel && <span className="label-text-alt">{secondaryLabel}</span>}
          </label>
          <div className="input-container">
            <Input
              className={`border rounded-md bg-transparent ${!error && 'border-neutral-500'}`}
              color={inputColor}
              {...rest}
              onFocus={(event: TargetedEvent) => {
                if (event.target instanceof HTMLInputElement) {
                  event.target.select();
                }
              }}
              onInput={(event: ChangeEvent) => {
                if (event.target instanceof HTMLInputElement) {
                  onChange?.(event.target.value);
                }
              }}
              {...register}
            />
            {extraBtnText && extraBtnAction && (
              <button type="button" className="rounded-md max-button" onClick={extraBtnAction}>
                {extraBtnText}
              </button>
            )}
          </div>
        </div>
      </div>
      <label className="label">{error && <span className="text-red-400 label-text">{error}</span>}</label>
    </>
  );
});

export default LabelledInputField;
