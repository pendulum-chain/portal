import { StateUpdater } from 'preact/hooks';
import { useForm } from 'react-hook-form';

import { OrmlTraitsAssetRegistryAssetMetadata } from '../../hooks/useBuyout/types';
import { BlockchainAsset } from '../../components/Selector/AssetSelector/helpers';
import From, { FromPropsWithVariant, FromVariants } from '../../components/Form/From';
import { FeeHint } from './FeeHint';
import { SubmitButton } from './SubmitButton';
import { formatToSignificantDecimals } from './helpers';

export type IssueFormValues = {
  fromAmount: number;
  toAmount: number;
};

interface GasFormProps {
  onSubmit: (data: IssueFormValues) => void;
  currencies: OrmlTraitsAssetRegistryAssetMetadata[];
  setSelectedFromToken: StateUpdater<BlockchainAsset | undefined>;
  selectedFromToken?: BlockchainAsset;
  nativeCurrency: OrmlTraitsAssetRegistryAssetMetadata;
  calcMin: () => number;
  calcMax: () => number;
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
  const { handleSubmit, register, setValue, watch, formState, clearErrors } = useForm<IssueFormValues>({});

  const registerFromAmount = register('fromAmount', {
    max: { value: calcMax(), message: 'Max amount exceeded' },
    min: { value: calcMin(), message: 'Amount is too low' },
    required: 'This field is required',
    maxLength: (selectedFromToken as OrmlTraitsAssetRegistryAssetMetadata).metadata.decimals,
    onBlur: (n: InputEvent) => {
      const value = (n.target as HTMLInputElement)?.value;

      setValue('fromAmount', Number(value));
      setValue('toAmount', calcTo(Number(value)));
    },
  });

  const min = calcMin();
  const minBadge = min
    ? {
        value: String(formatToSignificantDecimals(min)),
        onClick: () => {
          clearErrors();
          setValue('fromAmount', min);
          setValue('toAmount', calcTo(min));
        },
      }
    : undefined;

  const max = calcMax();
  const maxBadge = max
    ? {
        value: String(formatToSignificantDecimals(max)),
        onClick: () => {
          setValue('fromAmount', max);
          setValue('toAmount', calcTo(max));
        },
      }
    : undefined;

  const fromPropsError = formState.errors.fromAmount?.message;
  const FromProps: FromPropsWithVariant = {
    register: registerFromAmount,
    customText: 'Swap from',
    variant: FromVariants.SWAP,
    assets: currencies,
    selectedAsset: selectedFromToken,
    setSelectedAsset: setSelectedFromToken,
    minBadge,
    maxBadge,
    disabled: submissionPending,
    readOnly: submissionPending,
    error: fromPropsError,
  };

  const toPropsError = formState.errors.toAmount?.message;
  const ToProps: FromPropsWithVariant = {
    register: register('toAmount', {
      maxLength: (nativeCurrency as OrmlTraitsAssetRegistryAssetMetadata).metadata.decimals,
    }),
    customText: 'Swap to',
    variant: FromVariants.SWAP,
    assets: [nativeCurrency],
    selectedAsset: nativeCurrency,
    setSelectedAsset: () => {
      return null;
    },
    readOnly: true,
    disabled: submissionPending,
    error: toPropsError,
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
