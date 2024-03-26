import { useState, useEffect } from 'preact/hooks';
import { Card } from 'react-daisyui';
import { useForm } from 'react-hook-form';
import { isEmpty } from 'lodash';

import From, { FromProps } from '../../components/Form/From';
import { usePriceFetcher } from '../../hooks/usePriceFetcher';
import { useBuyout } from '../../hooks/useBuyout';
import { BlockchainAsset } from '../../components/Selector/AssetSelector/helpers';
import { FeeHint } from './FeeHint';
import { SubmitButton } from './SubmitButton';

export type IssueFormValues = {
  fromAmount: number;
  toAmount: number;
};

const Gas = () => {
  const { currencies, swap, nativeCurrency, handleBuyout } = useBuyout();
  const { handleSubmit, register, setValue, watch } = useForm<IssueFormValues>({});
  const { pricesCache } = usePriceFetcher();

  const [selectedFromToken, setSelectedFromToken] = useState<BlockchainAsset | undefined>(currencies[0]);
  const [selectedFromTokenPriceUSD, setSelectedFromTokenPriceUSD] = useState<number>(0);
  const [nativeTokenPrice, setNativeTokenPrice] = useState<number>(0);
  const [submissionPending, setSubmissionPending] = useState<boolean>(false);
  const [confirmationDialogVisible, setConfirmationDialogVisible] = useState<boolean>(false);

  function calculateForCurrentFromToken(native: number): number {
    if (nativeTokenPrice && selectedFromTokenPriceUSD && !isNaN(Number(native))) {
      const nativeTokenPriceUSD = nativeTokenPrice * Number(native);
      const nativeTokenPriceInSelectedToken = nativeTokenPriceUSD / selectedFromTokenPriceUSD;

      return Number(nativeTokenPriceInSelectedToken);
    }
    return 0;
  }

  function calculatePriceNativeForCurrentFromToken(nativeTokenPriceInSelectedToken: number): number {
    if (nativeTokenPrice && selectedFromTokenPriceUSD && !isNaN(Number(nativeTokenPriceInSelectedToken))) {
      const nativeTokenPriceUSD = selectedFromTokenPriceUSD * Number(nativeTokenPriceInSelectedToken);
      const native = nativeTokenPriceUSD / nativeTokenPrice;

      return Number(native);
    }
    return nativeTokenPriceInSelectedToken;
  }

  useEffect(() => {
    const fetchPricesCache = async () => {
      const tokensPrices = await pricesCache;

      if (!isEmpty(tokensPrices)) {
        setSelectedFromTokenPriceUSD(tokensPrices[selectedFromToken.metadata.symbol]);
        setNativeTokenPrice(tokensPrices['AMPE']);
      }
    };

    fetchPricesCache();
  }, [pricesCache, selectedFromToken]);

  const FromProps: FromProps = {
    register: register('fromAmount', {
      max: { value: calculateForCurrentFromToken(swap.maxNative), message: 'Max amount exceeded' },
      onBlur: (n: InputEvent) => {
        const value = n.target.value;

        setValue('fromAmount', Number(value));
        setValue('toAmount', calculatePriceNativeForCurrentFromToken(value));
      },
    }),
    customText: 'Swap from',
    assets: currencies,
    setSelectedAsset: setSelectedFromToken,
    selectedAsset: selectedFromToken,
    minBadge:
      Number(calculateForCurrentFromToken(swap.minNative)) > 0.0001
        ? {
            value: calculateForCurrentFromToken(swap.minNative),
            onClick: () => {
              setValue('fromAmount', Number(calculateForCurrentFromToken(swap.minNative)));
              setValue(
                'toAmount',
                calculatePriceNativeForCurrentFromToken(calculateForCurrentFromToken(swap.minNative)),
              );
            },
          }
        : undefined,
    maxBadge: {
      value: calculateForCurrentFromToken(swap.maxNative),
      onClick: () => {
        setValue('fromAmount', Number(calculateForCurrentFromToken(swap.maxNative)));
        setValue('toAmount', calculatePriceNativeForCurrentFromToken(calculateForCurrentFromToken(swap.maxNative)));
      },
    },
  };

  const ToProps: FromProps = {
    register: register('toAmount'),
    customText: 'Swap to',
    assets: [nativeCurrency],
    selectedAsset: nativeCurrency,
    setSelectedAsset: () => {
      return null;
    },
    readOnly: true,
  };

  const onSubmit = async (data) => {
    handleBuyout(data.fromAmount, setSubmissionPending, setConfirmationDialogVisible);
  };

  return (
    <div className="h-full flex items-center justify-center mt-4">
      <Card className="bridge-card bg-base-200 min-h-500 w-full max-w-[520px] rounded-lg">
        <div className="py-6 px-8">
          <h1 className="text-[28px] mb-8">Get AMPE</h1>
          <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            <From {...FromProps} />
            <From {...ToProps} />
            <FeeHint amount={watch('toAmount')} />
            <SubmitButton />
          </form>
        </div>
      </Card>
    </div>
  );
};

export default Gas;
