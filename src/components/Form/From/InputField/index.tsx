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
          'input-ghost w-full text-4xl font-outfit pl-0 focus:outline-none focus:text-white text-white ' +
          additionalStyle
        }
        minlength="1"
        onKeyPress={(e: KeyboardEvent) => {
          if (e.code === 'Minus' || e.code === 'KeyE') {
            e.preventDefault();
          }
        }}
        pattern="^[0-9]*[.,]?[0-9]*$"
        placeholder="0.0"
        readOnly={readOnly}
        spellcheck="false"
        type="text"
        {...register}
      />
    </div>
  </div>
);
