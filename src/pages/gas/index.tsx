import { useState, useEffect } from 'preact/hooks';
import { Card } from 'react-daisyui';
import { isEmpty } from 'lodash';

import { usePriceFetcher } from '../../hooks/usePriceFetcher';
import { useBuyout } from '../../hooks/useBuyout';
import { BlockchainAsset, isOrmlAsset } from '../../components/Selector/AssetSelector/helpers';
import { OrmlTraitsAssetRegistryAssetMetadata } from '../../hooks/useBuyout/types';
import { GasForm, IssueFormValues } from './GasForm';
import { calculateForCurrentFromToken, calculatePriceNativeForCurrentFromToken } from './helpers';
import { GasSuccessDialog } from './GasSuccessDialog';
import { GasSkeleton } from './GasSkeleton';

const Gas = () => {
  const { currencies, buyoutNativeToken, sellFee, nativeCurrency, handleBuyout } = useBuyout();
  const { pricesCache } = usePriceFetcher();

  const [selectedFromToken, setSelectedFromToken] = useState<BlockchainAsset | undefined>(undefined);
  const [selectedFromTokenPriceUSD, setSelectedFromTokenPriceUSD] = useState<number>(0);
  const [nativeTokenPrice, setNativeTokenPrice] = useState<number>(0);
  const [submissionPending, setSubmissionPending] = useState<boolean>(false);
  const [confirmationDialogVisible, setConfirmationDialogVisible] = useState<boolean>(false);

  useEffect(() => {
    const fetchPricesCache = async () => {
      if (nativeCurrency && isOrmlAsset(selectedFromToken)) {
        const tokensPrices = await pricesCache;

        if (!isEmpty(tokensPrices)) {
          setSelectedFromTokenPriceUSD(tokensPrices[selectedFromToken.metadata.symbol]);
          const nativeTokenPrice = tokensPrices[nativeCurrency.metadata.symbol];
          // We add the sellFee to the native price to already accommodate for it in the calculations
          const nativeTokenPriceWithFee = sellFee.addSelfToBase(nativeTokenPrice);
          setNativeTokenPrice(nativeTokenPriceWithFee);
        }
      }
    };

    fetchPricesCache().catch(console.error);
  }, [nativeCurrency, pricesCache, selectedFromToken, sellFee]);

  useEffect(() => {
    if (!selectedFromToken) {
      setSelectedFromToken(currencies[0] as OrmlTraitsAssetRegistryAssetMetadata);
    }
  }, [selectedFromToken, currencies]);

  const onSubmit = async (data: IssueFormValues) => {
    if (nativeCurrency && selectedFromToken) {
      // If the user has selected the min or max amount by clicking the badge button, we call the buyout extrinsic in the
      // direction of the native token being the input token. This way we ensure that the amount is perfectly within the buyout limits and
      // the transaction does not fail due to imprecise calculations.
      const isExchangeAmount = data.isMin || data.isMax;
      const token = isExchangeAmount ? nativeCurrency : (selectedFromToken as OrmlTraitsAssetRegistryAssetMetadata);
      const amount = data.isMin ? buyoutNativeToken.min : data.isMax ? buyoutNativeToken.max : Number(data.fromAmount);

      handleBuyout(token, amount, setSubmissionPending, setConfirmationDialogVisible, isExchangeAmount);
    }
  };

  const selectedTokenDecimals = (selectedFromToken as OrmlTraitsAssetRegistryAssetMetadata)?.metadata.decimals ?? 0;
  const nativeDecimals = (nativeCurrency as OrmlTraitsAssetRegistryAssetMetadata)?.metadata.decimals ?? 0;

  if (!selectedFromToken || !nativeCurrency) return <GasSkeleton />;

  return (
    <div className="h-full flex items-center justify-center mt-4">
      <GasSuccessDialog
        visible={confirmationDialogVisible}
        onClose={() => setConfirmationDialogVisible(false)}
        token={nativeCurrency.metadata.symbol}
      />
      <Card className="bridge-card bg-base-200 min-h-500 w-full max-w-[520px] rounded-lg">
        <div className="py-6 px-8">
          <h1 className="text-[28px] mb-8">Get AMPE</h1>
          <GasForm
            submissionPending={submissionPending}
            currencies={currencies.length ? currencies : []}
            selectedFromToken={selectedFromToken}
            setSelectedFromToken={setSelectedFromToken}
            nativeCurrency={nativeCurrency}
            onSubmit={onSubmit}
            calcMax={() => ({
              amount: calculateForCurrentFromToken(
                buyoutNativeToken.max,
                nativeTokenPrice,
                selectedFromTokenPriceUSD,
                selectedTokenDecimals,
              ),
              native: buyoutNativeToken.max,
            })}
            calcMin={() => ({
              amount: calculateForCurrentFromToken(
                buyoutNativeToken.min,
                nativeTokenPrice,
                selectedFromTokenPriceUSD,
                selectedTokenDecimals,
              ),
              native: buyoutNativeToken.min,
            })}
            calcTo={(e: string) =>
              calculatePriceNativeForCurrentFromToken(
                Number(e),
                nativeTokenPrice,
                selectedFromTokenPriceUSD,
                nativeDecimals,
              )
            }
          />
        </div>
      </Card>
    </div>
  );
};

export default Gas;
