import { useState, useEffect } from 'react';
import { Card } from 'react-daisyui';

import { usePriceFetcher } from '../../hooks/usePriceFetcher';
import { useBuyout } from '../../hooks/useBuyout';
import { BlockchainAsset, isOrmlAsset } from '../../components/Selector/AssetSelector/helpers';
import { OrmlTraitsAssetRegistryAssetMetadata } from '../../hooks/useBuyout/types';
import { GasForm, IssueFormValues } from './GasForm';
import { GasSuccessDialog } from './GasSuccessDialog';
import { GasSkeleton } from './GasSkeleton';
import { calculateForCurrentFromToken, calculatePriceNativeForCurrentFromToken } from './helpers';

const Gas = () => {
  const { currencies, buyoutNativeToken, sellFee, nativeCurrency, handleBuyout } = useBuyout();
  const { getTokenPriceForCurrency } = usePriceFetcher();

  const [selectedFromToken, setSelectedFromToken] = useState<BlockchainAsset | undefined>(undefined);
  const [selectedFromTokenPriceUSD, setSelectedFromTokenPriceUSD] = useState<number>(0);
  const [nativeTokenPrice, setNativeTokenPrice] = useState<number>(0);
  const [submissionPending, setSubmissionPending] = useState<boolean>(false);
  const [confirmationDialogVisible, setConfirmationDialogVisible] = useState<boolean>(false);

  useEffect(() => {
    const fetchPricesCache = async () => {
      if (nativeCurrency && isOrmlAsset(selectedFromToken)) {
        const tokenPrice = await getTokenPriceForCurrency(selectedFromToken.currencyId);

        if (!tokenPrice) {
          const fetchedTokenPrice = await getTokenPriceForCurrency(selectedFromToken.currencyId);
          setSelectedFromTokenPriceUSD(fetchedTokenPrice);
        } else {
          setSelectedFromTokenPriceUSD(tokenPrice);
        }

        const nativeTokenPrice = await getTokenPriceForCurrency(nativeCurrency.currencyId);
        // We add the sellFee to the native price to already accommodate for it in the calculations
        const nativeTokenPriceWithFee = sellFee.addSelfToBase(nativeTokenPrice);
        setNativeTokenPrice(nativeTokenPriceWithFee);
      }
    };

    fetchPricesCache().catch(console.error);
  }, [nativeCurrency, selectedFromToken, sellFee, getTokenPriceForCurrency]);

  useEffect(() => {
    if (!selectedFromToken) {
      setSelectedFromToken(currencies[0] as OrmlTraitsAssetRegistryAssetMetadata);
    }
  }, [selectedFromToken, currencies]);

  const onSubmit = async (data: IssueFormValues) => {
    if (nativeCurrency && selectedFromToken) {
      const token = selectedFromToken as OrmlTraitsAssetRegistryAssetMetadata;
      // We use the toAmount as the amount to buyout because we always use the specified output amount
      const amount = data.toAmount;

      handleBuyout(token, amount, setSubmissionPending, setConfirmationDialogVisible);
    }
  };

  const selectedTokenDecimals = (selectedFromToken as OrmlTraitsAssetRegistryAssetMetadata)?.metadata.decimals ?? 0;
  const nativeDecimals = (nativeCurrency as OrmlTraitsAssetRegistryAssetMetadata)?.metadata.decimals ?? 0;

  if (!selectedFromToken || !nativeCurrency) return <GasSkeleton />;

  return (
    <div className="mt-4 flex h-full items-center justify-center">
      <GasSuccessDialog
        visible={confirmationDialogVisible}
        onClose={() => setConfirmationDialogVisible(false)}
        token={nativeCurrency.metadata.symbol}
      />
      <Card className="bridge-card min-h-500 w-full max-w-[520px] rounded-lg bg-base-200">
        <div className="px-8 py-6">
          <h1 className="mb-8 text-[28px]">Get {nativeCurrency.metadata.symbol}</h1>
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
