import { FieldPath, FieldValues, UseFormReturn, useFormContext } from 'react-hook-form';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Button } from 'react-daisyui';
import Big from 'big.js';

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
  form: UseFormReturn<FormFieldValues>;
  fromTokenBalance: UseContractReadResult<ContractBalance | undefined>;
  fromToken?: NablaInstanceToken;
  fromAmount?: Big;
  fromFormFieldName: TFieldName;
  onOpenSelector: () => void;
  inputHasError: boolean;
}

export function From<FormFieldValues extends FieldValues, TFieldName extends FieldPath<FormFieldValues>>({
  form,
  fromToken,
  fromAmount,
  fromTokenBalance,
  fromFormFieldName,
  onOpenSelector,
  inputHasError,
}: FromProps<FormFieldValues, TFieldName>) {
  const { setValue } = useFormContext<SwapFormValues>();

  const { walletAccount } = useGlobalState();

  return (
    <div
      className={`rounded-lg border bg-base-300 px-4 py-3 ${inputHasError ? 'border-red-600' : 'border-transparent'}`}
    >
      <div className="flex justify-between w-full">
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
            <img src={getIcon(fromToken?.symbol)} alt={fromToken?.name} className="w-auto h-full" />
          </span>
          <strong className="font-bold">{fromToken?.symbol || 'Select'}</strong>
          <ChevronDownIcon className="inline w-4 h-4 ml-px" />
        </Button>
      </div>
      <div className="flex items-center justify-between mt-1 text-neutral-500 dark:text-neutral-400">
        <div className="mt-px text-sm">
          {fromToken ? (
            <NablaTokenPrice
              formatByAmount={true}
              currentTokenAmount={fromAmount}
              address={fromToken.id}
              fallback="$ -"
            />
          ) : (
            '$ -'
          )}
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
