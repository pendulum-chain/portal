import { FC } from 'preact/compat';
import Amount from '../../../../components/Form/Amount';
import gasolinePump from '../../../../assets/gasoline-pump.svg';
import { UseFormRegisterReturn } from 'react-hook-form';

interface UnlockConfirmStepProps {
  register: UseFormRegisterReturn<'amount'>;
  userStakeBalance: number;
  setValue: (n: number) => void;
  gasFee: string;
  error?: string;
}

export const UnlockConfirmStep: FC<UnlockConfirmStepProps> = ({
  register,
  userStakeBalance,
  setValue,
  gasFee,
  error,
}) => {
  return (
    <div className="rounded-lg flex flex-col items-center w-full">
      <div className="w-full flex justify-end items-center text-sm dark:text-neutral-400 text-neutral-500 mb-1">
        <img src={gasolinePump} alt="gasoline icon" className="h-full w-auto" width={42} height={42} />
        <span className="ml-1">${gasFee}</span>
      </div>
      <form className="flex flex-col">
        <Amount register={register} max={userStakeBalance} setValue={setValue} error={error} fullMax={true} />
      </form>
    </div>
  );
};
