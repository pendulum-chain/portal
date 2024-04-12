import { Input } from 'react-daisyui';
import { UseFormRegisterReturn } from 'react-hook-form';

interface InputFieldProps {
  register: UseFormRegisterReturn;
  readOnly?: boolean;
  additionalStyle?: string;
}

export const InputField = ({ register, readOnly = false, additionalStyle }: InputFieldProps) => (
  <div className="w-full flex justify-between">
    <div className="flex-grow text-4xl text-black font-outfit">
      <Input
        autocomplete="off"
        autocorrect="off"
        className={
          'input-ghost w-full text-4xl font-outfit pl-0 focus:outline-none focus:text-accent-content text-accent-content ' +
          additionalStyle
        }
        minlength="1"
        onKeyPress={(e: KeyboardEvent) => {
          if (
            !/^[0-9.,]*$/.test(e.key) ||
            (e.key === '.' && e.target && (e.target as HTMLInputElement).value.includes('.'))
          ) {
            e.preventDefault();
          }
        }}
        pattern="^[0-9]*[.,]?[0-9]*$"
        placeholder="0.0"
        readOnly={readOnly}
        spellcheck="false"
        step="any"
        type="text"
        {...register}
      />
    </div>
  </div>
);
