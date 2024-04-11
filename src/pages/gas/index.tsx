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

const Gas = () => {
  const { currencies, buyoutNativeToken, nativeCurrency, handleBuyout } = useBuyout();
  const { pricesCache } = usePriceFetcher();

  const [selectedFromToken, setSelectedFromToken] = useState<BlockchainAsset | undefined>(currencies[0]);
  const [selectedFromTokenPriceUSD, setSelectedFromTokenPriceUSD] = useState<number>(0);
  const [nativeTokenPrice, setNativeTokenPrice] = useState<number>(0);
  const [submissionPending, setSubmissionPending] = useState<boolean>(false);
  const [confirmationDialogVisible, setConfirmationDialogVisible] = useState<boolean>(false);

  useEffect(() => {
    const fetchPricesCache = async () => {
      const tokensPrices = await pricesCache;

      if (!isEmpty(tokensPrices) && isOrmlAsset(selectedFromToken)) {
        setSelectedFromTokenPriceUSD(tokensPrices[selectedFromToken.metadata.symbol]);
        setNativeTokenPrice(tokensPrices['AMPE']);
      }
    };

    fetchPricesCache().catch(console.error);
  }, [pricesCache, selectedFromToken]);

  const onSubmit = async (data: IssueFormValues) => {
    // If the user has selected the min or max amount by clicking the badge button, we call the buyout extrinsic in the
    // direction of the native token being the input token. This way we ensure that the amount is perfectly within the buyout limits and
    // the transaction does not fail due to imprecise calculations.
    const isExchangeAmount = data.isMin || data.isMax;
    const token = isExchangeAmount ? nativeCurrency : (selectedFromToken as OrmlTraitsAssetRegistryAssetMetadata);
    const amount = data.isMin ? buyoutNativeToken.min : data.isMax ? buyoutNativeToken.max : data.fromAmount;

    handleBuyout(token, amount, setSubmissionPending, setConfirmationDialogVisible, isExchangeAmount);
  };

  const selectedTokenDecimals = (selectedFromToken as OrmlTraitsAssetRegistryAssetMetadata).metadata.decimals;
  const nativeDecimals = (nativeCurrency as OrmlTraitsAssetRegistryAssetMetadata).metadata.decimals;

  return (
    <div className="h-full flex items-center justify-center mt-4">
      <GasSuccessDialog visible={confirmationDialogVisible} onClose={() => setConfirmationDialogVisible(false)} />
      <Card className="bridge-card bg-base-200 min-h-500 w-full max-w-[520px] rounded-lg">
        <div className="py-6 px-8">
          <h1 className="text-[28px] mb-8">Get AMPE</h1>
          <GasForm
            submissionPending={submissionPending}
            currencies={currencies}
            selectedFromToken={selectedFromToken}
            setSelectedFromToken={setSelectedFromToken}
            nativeCurrency={nativeCurrency}
            onSubmit={onSubmit}
            calcMax={() =>
              calculateForCurrentFromToken(
                buyoutNativeToken.max,
                nativeTokenPrice,
                selectedFromTokenPriceUSD,
                selectedTokenDecimals,
              )
            }
            calcMin={() =>
              calculateForCurrentFromToken(
                buyoutNativeToken.min,
                nativeTokenPrice,
                selectedFromTokenPriceUSD,
                selectedTokenDecimals,
              )
            }
            calcTo={(e: number) =>
              calculatePriceNativeForCurrentFromToken(e, nativeTokenPrice, selectedFromTokenPriceUSD, nativeDecimals)
            }
          />
        </div>
      </Card>
    </div>
  );
};

export default Gas;
