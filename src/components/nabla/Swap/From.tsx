import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Button } from 'react-daisyui';
import { FieldPath, FieldValues, UseFormReturn, useFormContext } from 'react-hook-form';

import pendulumIcon from '../../../assets/pendulum-icon.svg';
import { SwapFormValues } from './schema';
import { NablaInstanceToken } from '../../../hooks/nabla/useNablaInstance';
import { NablaTokenPrice } from '../common/NablaTokenPrice';
import { fractionOfValue } from '../../../shared/parseNumbers/metric';
import { AmountSelector } from '../common/AmountSelector';
import { UseContractReadResult } from '../../../hooks/nabla/useContractRead';
import { ContractBalance } from '../../../helpers/contracts';
import { TokenBalance } from '../common/TokenBalance';
import { getIcon } from '../../../shared/AssetIcons';

interface FromProps<FormFieldValues extends FieldValues, TFieldName extends FieldPath<FormFieldValues>> {
  fromToken: NablaInstanceToken | undefined;
  onOpenSelector: () => void;
  inputHasError: boolean;
  fromFormFieldName: TFieldName;
  form: UseFormReturn<FormFieldValues>;
  fromTokenBalance: UseContractReadResult<ContractBalance | undefined>;
}

export function From<FormFieldValues extends FieldValues, TFieldName extends FieldPath<FormFieldValues>>({
  fromToken,
  onOpenSelector,
  inputHasError,
  fromFormFieldName,
  form,
  fromTokenBalance,
}: FromProps<FormFieldValues, TFieldName>) {
  const { setValue } = useFormContext<SwapFormValues>();

  return (
    <div
      className={`rounded-lg bg-base-300 px-4 py-3 border ${inputHasError ? 'border-red-600' : 'border-transparent'}`}
    >
      <div className="w-full flex justify-between">
        <div className="flex-grow text-4xl text-[inherit] font-outfit">
          <AmountSelector
            maxBalance={fromTokenBalance.data}
            formFieldName={fromFormFieldName}
            form={form}
            onlyShowNumberInput={true}
          />
        </div>
        <Button
          size="xs"
          className="rounded-full h-7 min-h-none border-0 bg-neutral-200 dark:bg-neutral-700 pl-0 pr-1 flex items-center mt-0.5 text-sm font-medium"
          onClick={onOpenSelector}
          type="button"
        >
          <span className="rounded-full bg-[rgba(0,0,0,0.15)] h-full p-px mr-1">
            <img src={getIcon(fromToken?.symbol, pendulumIcon)} alt="Pendulum" className="h-full w-auto" />
          </span>
          <strong className="font-bold">{fromToken?.symbol || 'Select'}</strong>
          <ChevronDownIcon className="w-4 h-4 inline ml-px" />
        </Button>
      </div>
      <div className="flex justify-between items-center mt-1 dark:text-neutral-400 text-neutral-500">
        <div className="text-sm mt-px">
          {fromToken ? <NablaTokenPrice address={fromToken.id} fallback="$ -" /> : '$ -'}
        </div>
        <div className="flex gap-1 text-sm">
          {fromTokenBalance !== undefined && (
            <>
              <span className="mr-1">
                Balance: <TokenBalance query={fromTokenBalance} symbol={''} />
              </span>
              <button
                className="text-primary hover:underline"
                onClick={() => {
                  if (fromTokenBalance.data !== undefined) {
                    setValue('fromAmount', fractionOfValue(fromTokenBalance.data.preciseBigDecimal, 50));
                  }
                }}
                type="button"
              >
                50%
              </button>
              <button
                className="text-primary hover:underline"
                onClick={() => {
                  if (fromTokenBalance.data !== undefined) {
                    setValue('fromAmount', fractionOfValue(fromTokenBalance.data.preciseBigDecimal, 100));
                  }
                }}
                type="button"
              >
                MAX
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
