import { Input } from 'react-daisyui';
import { UseFormRegisterReturn } from 'react-hook-form';

interface InputFieldProps {
  register: UseFormRegisterReturn;
  readOnly?: boolean;
  additionalStyle?: string;
}

function isValidNumericInput(value: string): boolean {
  return /^[0-9.,]*$/.test(value);
}

function alreadyHasDecimal(e: KeyboardEvent) {
  const decimalChars = ['.', ','];

  // In the onInput event, "," is replaced by ".", so we check if the e.target.value already contains a "."
  return decimalChars.some((char) => e.key === char && e.target && (e.target as HTMLInputElement).value.includes('.'));
}

export const NumericInput = ({ register, readOnly = false, additionalStyle }: InputFieldProps) => (
  <div className="w-full flex justify-between">
    <div className="flex-grow text-4xl text-black font-outfit">
      <Input
        autocomplete="off"
        autocorrect="off"
        autocapitalize="none"
        className={
          'input-ghost w-full text-4xl font-outfit pl-0 focus:outline-none focus:text-accent-content text-accent-content ' +
          additionalStyle
        }
        minlength="1"
        onKeyPress={(e: KeyboardEvent) => {
          if (!isValidNumericInput(e.key) || alreadyHasDecimal(e)) {
            e.preventDefault();
          }
        }}
        onInput={(e: KeyboardEvent) => {
          const target = e.target as HTMLInputElement;
          target.value = target.value.replace(/,/g, '.');
        }}
        pattern="^[0-9]*[.,]?[0-9]*$"
        placeholder="0.0"
        readOnly={readOnly}
        spellcheck="false"
        step="any"
        type="text"
        inputmode="decimal"
        {...register}
      />
    </div>
  </div>
);
