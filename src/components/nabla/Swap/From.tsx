import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Button } from 'react-daisyui';
import { FieldPath, FieldValues, UseFormReturn, useFormContext } from 'react-hook-form';

import { NablaTokenPrice } from '../common/NablaTokenPrice';
import { fractionOfValue } from '../../../shared/parseNumbers/metric';
import { AmountSelector } from '../common/AmountSelector';
import { TokenBalance } from '../common/TokenBalance';
import { NablaInstanceToken } from '../../../hooks/nabla/useNablaInstance';
import { UseContractReadResult } from '../../../hooks/nabla/useContractRead';
import { ContractBalance } from '../../../helpers/contracts';
import { getIcon } from '../../../shared/AssetIcons';
import { useGlobalState } from '../../../GlobalStateProvider';
import { SwapFormValues } from './schema';

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

  const { walletAccount } = useGlobalState();

  return (
    <div
      className={`rounded-lg border bg-base-300 px-4 py-3 ${inputHasError ? 'border-red-600' : 'border-transparent'}`}
    >
      <div className="flex w-full justify-between">
        <div className="font-outfit flex-grow text-4xl text-[inherit]">
          <AmountSelector
            maxBalance={fromTokenBalance.data}
            formFieldName={fromFormFieldName}
            form={form}
            onlyShowNumericInput={true}
          />
        </div>
        <Button
          size="xs"
          className="min-h-none mt-0.5 flex h-7 items-center rounded-full border-0 bg-neutral-200 pl-0 pr-1 text-sm font-medium dark:bg-neutral-700"
          onClick={onOpenSelector}
          type="button"
        >
          <span className="mr-1 h-full rounded-full bg-[rgba(0,0,0,0.15)] p-px">
            <img src={getIcon(fromToken?.symbol)} alt={fromToken?.name} className="h-full w-auto" />
          </span>
          <strong className="font-bold">{fromToken?.symbol || 'Select'}</strong>
          <ChevronDownIcon className="ml-px inline h-4 w-4" />
        </Button>
      </div>
      <div className="mt-1 flex items-center justify-between text-neutral-500 dark:text-neutral-400">
        <div className="mt-px text-sm">
          {fromToken ? <NablaTokenPrice address={fromToken.id} fallback="$ -" /> : '$ -'}
        </div>
        <div className="flex gap-1 text-sm">
          {fromTokenBalance !== undefined && walletAccount && (
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
