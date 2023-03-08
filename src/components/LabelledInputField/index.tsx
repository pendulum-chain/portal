import { Input, InputProps } from 'react-daisyui';
import './styles.css';
interface Props {
  autoSelect?: boolean;
  label?: string;
  secondaryLabel?: string;
  type: string;
  value: string;
  extraBtnText?: string;
  extraBtnAction?: () => void;
  onChange?: (value: string) => void;
  style?: React.CSSProperties;
  errorMessage?: string;
}

function LabelledInputField(props: Props & InputProps) {
  const {
    label,
    secondaryLabel,
    onChange,
    extraBtnAction,
    extraBtnText,
    ...rest
  } = props;

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
        <div className="input-container">
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
          {extraBtnText && extraBtnAction && (
            <button
              className="rounded-md max-button bg-base-200"
              onClick={extraBtnAction}
            >
              {extraBtnText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default LabelledInputField;
