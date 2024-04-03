import { Input } from 'react-daisyui';
import { UseFormRegisterReturn } from 'react-hook-form';

interface InputFieldProps {
  register: UseFormRegisterReturn;
  readOnly?: boolean;
}

export const InputField = ({ register, readOnly = false }: InputFieldProps) => (
  <div className="w-full flex justify-between">
    <div className="flex-grow text-4xl text-black font-outfit">
      <Input
        className="input-ghost w-full text-4xl font-outfit pl-0 focus:outline-none focus:text-white text-white"
        type="number"
        step="any"
        readOnly={readOnly}
        onKeyPress={(e: KeyboardEvent) => {
          if (e.code === 'Minus' || e.code === 'KeyE') {
            e.preventDefault();
          }
        }}
        placeholder="0.0"
        {...register}
      />
    </div>
  </div>
);
