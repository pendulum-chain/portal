import From, { FromPropsWithVariant, FromVariants } from '../../components/Form/From';
import { FeeHint } from './FeeHint';
import { SubmitButton } from './SubmitButton';
import { abcedfg } from '../../shared/parseNumbers/decimal';
import { formatToSignificantDecimals } from './helpers';
import { StateUpdater } from 'preact/hooks';
import { useForm } from 'react-hook-form';
import { OrmlTraitsAssetRegistryAssetMetadata } from '../../hooks/useBuyout/types';
import { BlockchainAsset } from '../../components/Selector/AssetSelector/helpers';

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
  const { handleSubmit, register, setValue, watch } = useForm<IssueFormValues>({});

  const registerFromAmount = register('fromAmount', {
    max: { value: calcMax(), message: 'Max amount exceeded' },
    maxLength: (selectedFromToken as OrmlTraitsAssetRegistryAssetMetadata).metadata.decimals,
    onBlur: (n: InputEvent) => {
      const value = (n.target as HTMLInputElement)?.value;

      setValue('fromAmount', Number(value));
      setValue('toAmount', calcTo(Number(value)));
    },
  });

  const minBadge = {
    value: abcedfg(calcMin()),
    onClick: () => {
      setValue('fromAmount', calcMin());
      setValue('toAmount', calcTo(calcMin()));
    },
  };

  const maxBadge = {
    value: String(formatToSignificantDecimals(calcMax())),
    onClick: () => {
      setValue('fromAmount', calcMax());
      setValue('toAmount', calcTo(calcMax()));
    },
  };

  const FromProps: FromPropsWithVariant = {
    register: registerFromAmount,
    customText: 'Swap from',
    variant: FromVariants.SWAP,
    assets: currencies,
    selectedAsset: selectedFromToken,
    setSelectedAsset: setSelectedFromToken,
    minBadge,
    maxBadge,
  };

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
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <From {...FromProps} />
      <From {...ToProps} />
      <FeeHint amount={watch('toAmount')} />
      <SubmitButton loading={submissionPending} />
    </form>
  );
};
