import Amount from '../../../../components/Form/Amount';
import gasolinePump from '../../../../assets/gasoline-pump.svg';
import { Control, FieldPath, FieldValues } from 'react-hook-form';

interface UnlockConfirmStepProps<FormFieldValues extends FieldValues & { amount: string | number } = FieldValues & { amount: string | number }> {
  control: Control<FormFieldValues>;
  balance: number;
  gasFee: string;
  error?: string;
}

export const UnlockConfirmStep = <FormFieldValues extends FieldValues & { amount: string | number } = FieldValues & { amount: string | number }>({
  control,
  balance,
  gasFee,
  error,
}: UnlockConfirmStepProps<FormFieldValues>) => {
  const noSetValue = () => null;
  return (
    <div className="flex w-full flex-col items-center rounded-lg">
      <div className="mb-1 flex w-full items-center justify-end text-sm text-neutral-500 dark:text-neutral-400">
        <img src={gasolinePump} alt="gasoline icon" className="h-full w-auto" width={42} height={42} />
        <span className="ml-1">${gasFee}</span>
      </div>
      <form className="flex w-full flex-col">
        <Amount
          control={control}
          name={'amount' as FieldPath<FormFieldValues>}
          max={balance}
          setValue={noSetValue}
          error={error}
          hideHalfButton={true}
          hideMaxButton={true}
          readOnly={true}
          defaultValue={String(balance)}
        />
      </form>
    </div>
  );
};
