import { StateUpdater } from 'preact/hooks';
import { useForm } from 'react-hook-form';
import { useMemo } from 'preact/hooks';

import { OrmlTraitsAssetRegistryAssetMetadata } from '../../hooks/useBuyout/types';
import { BlockchainAsset } from '../../components/Selector/AssetSelector/helpers';
import From, { FromPropsWithVariant, FromVariants } from '../../components/Form/From';
import { FeeHint } from './FeeHint';
import { SubmitButton } from './SubmitButton';
import { formatToSignificantDecimals } from './helpers';
import useBalances from '../../hooks/useBalances';

export type IssueFormValues = {
  isMax: boolean;
  isMin: boolean;
  fromAmount: number | string;
  toAmount: number;
};

interface GasFormProps {
  onSubmit: (data: IssueFormValues) => void;
  currencies: OrmlTraitsAssetRegistryAssetMetadata[];
  setSelectedFromToken: StateUpdater<BlockchainAsset | undefined>;
  selectedFromToken?: BlockchainAsset;
  nativeCurrency: OrmlTraitsAssetRegistryAssetMetadata;
  calcMin: () => { amount: number; native: number };
  calcMax: () => { amount: number; native: number };
  calcTo: (n: number) => number;
  submissionPending: boolean;
}

export const GasForm: React.FC<GasFormProps> = ({
  onSubmit,
  currencies,
  setSelectedFromToken,
  selectedFromToken,
  nativeCurrency,
  calcMin,
  calcMax,
  calcTo,
  submissionPending,
}) => {
  const { handleSubmit, register, setValue, watch, formState, clearErrors, trigger } = useForm<IssueFormValues>({
    defaultValues: { isMax: false, isMin: false },
    mode: 'onChange',
  });

  const { balances } = useBalances();

  const registerFromAmount = register('fromAmount', {
    max: { value: calcMax().amount, message: 'Amount exceeds the maximum allowable buyout' },
    min: { value: calcMin().amount, message: 'Amount is too low to meet the minimum buyout requirement' },
    required: 'This field is required',
    onChange: (n: InputEvent) => {
      const value = (n.target as HTMLInputElement)?.value;

      setValue('isMax', false);
      setValue('isMin', false);
      setValue('fromAmount', value);
      setValue('toAmount', calcTo(Number(value)));
    },

    validate: (value) => {
      if (balances && selectedFromToken) {
        const selectedTokenBalance = balances.find(
          (balance) => balance.token === (selectedFromToken as OrmlTraitsAssetRegistryAssetMetadata).metadata.symbol,
        )?.amount;
        if (Number(value) > Number(selectedTokenBalance || 0)) {
          return 'Insufficient balance';
        }
      }
    },
  });

  const min = calcMin();
  const minBadge = useMemo(() => {
    return min
      ? {
          value: String(formatToSignificantDecimals(min.amount)),
          onClick: () => {
            clearErrors();
            setValue('isMax', false);
            setValue('isMin', true);
            setValue('fromAmount', min.amount);
            setValue('toAmount', min.native);
            trigger('fromAmount');
          },
        }
      : undefined;
  }, [clearErrors, min, setValue, trigger]);

  const max = calcMax();
  const maxBadge = useMemo(() => {
    return max
      ? {
          value: String(formatToSignificantDecimals(max.amount)),
          onClick: () => {
            clearErrors();
            setValue('isMax', true);
            setValue('isMin', false);
            setValue('fromAmount', max.amount);
            setValue('toAmount', max.native);
            trigger('fromAmount');
          },
        }
      : undefined;
  }, [max, setValue, clearErrors, trigger]);

  const fromPropsError = formState.errors.fromAmount?.message;
  const FromProps: FromPropsWithVariant = useMemo(
    () => ({
      formControl: {
        register: registerFromAmount,
        disabled: submissionPending,
        readOnly: submissionPending,
        error: fromPropsError,
      },
      badges: {
        minBadge,
        maxBadge,
      },
      description: {
        customText: 'Swap from',
      },
      asset: {
        assets: currencies,
        selectedAsset: selectedFromToken,
        setSelectedAsset: setSelectedFromToken,
      },
      variant: FromVariants.SWAP,
    }),
    [
      currencies,
      fromPropsError,
      maxBadge,
      minBadge,
      registerFromAmount,
      selectedFromToken,
      setSelectedFromToken,
      submissionPending,
    ],
  );

  const toPropsError = formState.errors.toAmount?.message;
  const ToProps: FromPropsWithVariant = {
    formControl: {
      register: register('toAmount', {
        maxLength: (nativeCurrency as OrmlTraitsAssetRegistryAssetMetadata).metadata.decimals,
      }),
      readOnly: true,
      disabled: submissionPending,
      error: toPropsError,
    },
    description: {
      customText: 'Swap to',
    },
    asset: {
      assets: [nativeCurrency],
      selectedAsset: nativeCurrency,
      setSelectedAsset: () => {
        return null;
      },
    },
    badges: {},
    variant: FromVariants.SWAP,
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <From {...FromProps} />
      <From {...ToProps} />
      <FeeHint amount={watch('toAmount')} />
      <SubmitButton loading={submissionPending} disabled={Boolean(fromPropsError) || Boolean(toPropsError)} />
    </form>
  );
};
