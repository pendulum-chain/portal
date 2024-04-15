import { StateUpdater, useEffect, useState } from 'preact/hooks';
import { isEmpty } from 'lodash';
import { Option } from '@polkadot/types-codec';
import { Codec } from '@polkadot/types-codec/types';

import { useNodeInfoState } from '../../NodeInfoProvider';
import { nativeToFormatDecimalPure } from '../../shared/parseNumbers/decimal';
import { doSubmitExtrinsic } from '../../pages/collators/dialogs/helpers';
import { useGlobalState } from '../../GlobalStateProvider';

import { OrmlTraitsAssetRegistryAssetMetadata } from './types';
import { ToastMessage, showToast } from '../../shared/showToast';
import { PerMill } from '../../shared/parseNumbers/permill';
import { decimalToNative } from '../../shared/parseNumbers/metric';

export interface BuyoutSettings {
  buyoutNativeToken: {
    min: number;
    max: number;
  };
  currencies: OrmlTraitsAssetRegistryAssetMetadata[];
  nativeCurrency: OrmlTraitsAssetRegistryAssetMetadata | undefined;
  sellFee: PerMill;
  handleBuyout: (
    currency: OrmlTraitsAssetRegistryAssetMetadata,
    amount: number,
    setSubmissionPending: StateUpdater<boolean>,
    setConfirmationDialogVisible: StateUpdater<boolean>,
    isExchangeAmount: boolean,
  ) => void;
}

type CurrencyMetadataType = {
  decimals: string;
  name: string;
  symbol: string;
  // There are more coming, but are not used in this context
};

function handleBuyoutError(error: string) {
  if (!error) return;

  if (error.includes('1010: Invalid Transaction: Custom error: 3')) {
    showToast(ToastMessage.ERROR, 'The buyout amount is too low');
    return;
  }

  if (error.includes('1010: Invalid Transaction: Custom error: 2')) {
    showToast(ToastMessage.ERROR, 'Max buyout reached');
    return;
  }

  if (error.includes('Cancelled')) {
    showToast(ToastMessage.ERROR, 'The buyout was cancelled');
    return;
  }

  showToast(ToastMessage.ERROR, 'The buyout failed:' + error);
  return;
}

export const useBuyout = (): BuyoutSettings => {
  const { api } = useNodeInfoState().state;
  const { walletAccount } = useGlobalState();
  const [minimumBuyout, setMinimumBuyout] = useState<number>(0);
  const [maximumBuyout, setMaximumBuyout] = useState<number>(0);
  const [sellFee, setSellFee] = useState<PerMill>(new PerMill(0));

  const [currencies, setCurrencies] = useState<OrmlTraitsAssetRegistryAssetMetadata[]>([]);
  const [nativeCurrency, setNativeCurrency] = useState<OrmlTraitsAssetRegistryAssetMetadata | undefined>(undefined);

  useEffect(() => {
    async function fetchNativeCurrency() {
      if (api) {
        const nativeCurrencyMetadata = await api.query.assetRegistry.metadata('Native');
        const { decimals, name, symbol } = nativeCurrencyMetadata.toHuman() as CurrencyMetadataType;

        setNativeCurrency({
          metadata: { decimals: Number(decimals), name, symbol },
          assetId: 'Native',
        });
      }
    }

    async function fetchAllowedCurrencies() {
      if (api) {
        const currencies = await api.query.treasuryBuyoutExtension.allowedCurrencies.entries();

        for (const currency of currencies) {
          if (currency.length && currency[0] && currency[0].toHuman()) {
            const currencyXCMId: { XCM: number } = (currency[0].toHuman() as { XCM: number }[])[0];
            const currencyMetadata = await api.query.assetRegistry.metadata(currencyXCMId);
            const { decimals, name, symbol } = currencyMetadata.toHuman() as CurrencyMetadataType;

            setCurrencies((state) => [
              ...state,
              {
                metadata: { decimals: Number(decimals), name, symbol },
                assetId: currencyXCMId,
              },
            ]);
          }
        }
      }
    }

    async function fetchCurrencies() {
      await fetchNativeCurrency().catch(console.error);

      await fetchAllowedCurrencies().catch(console.error);
    }

    fetchCurrencies().catch(console.error);
  }, [api]);

  useEffect(() => {
    async function fetchBuyoutLimits() {
      if (api) {
        const minBuyoutLimitFromAPI = api.consts.treasuryBuyoutExtension.minAmountToBuyout;
        const maxBuyoutLimitFromAPI = await api.query.treasuryBuyoutExtension.buyoutLimit();
        const sellFeeFromAPI = api.consts.treasuryBuyoutExtension.sellFee;

        const minBuyoutLimitAsString = minBuyoutLimitFromAPI?.toString();
        const maxBuyoutLimitAsString = (maxBuyoutLimitFromAPI as unknown as Option<Codec>)?.unwrap().toString();
        const sellFeeAsString = sellFeeFromAPI?.toString();

        const minBuyoutLimitFormatted = nativeToFormatDecimalPure(minBuyoutLimitAsString);
        const maxBuyoutLimitFormatted = nativeToFormatDecimalPure(maxBuyoutLimitAsString);
        const sellFeePerMill = new PerMill(Number(sellFeeAsString));

        setMinimumBuyout(minBuyoutLimitFormatted);
        setMaximumBuyout(maxBuyoutLimitFormatted);
        setSellFee(sellFeePerMill);
      }
    }

    fetchBuyoutLimits().catch(console.error);
  }, [api]);

  async function handleBuyout(
    currency: OrmlTraitsAssetRegistryAssetMetadata,
    amount: number,
    setSubmissionPending: StateUpdater<boolean>,
    setConfirmationDialogVisible: StateUpdater<boolean>,
    isExchangeAmount: boolean,
  ) {
    if (!api || !walletAccount) {
      return;
    }
    if (isEmpty(api.tx) || isEmpty(api.tx.treasuryBuyoutExtension)) {
      throw new Error('Treasury Buyout does not exist');
    }

    console.log(currency, 'currency');
    const scaledCurrency = decimalToNative(amount, currency.metadata.decimals).toNumber();

    const assetId = currency.assetId as { XCM: number };

    // exchange is in selected token (KSM/USDT)... buyout is in native token (AMPE)
    const exchange = isExchangeAmount
      ? { buyout: { amount: scaledCurrency } }
      : { exchange: { amount: scaledCurrency } };

    const submittableExtrinsic = api.tx.treasuryBuyoutExtension.buyout({ XCM: assetId.XCM }, exchange);

    try {
      await doSubmitExtrinsic(
        api,
        submittableExtrinsic,
        walletAccount,
        setSubmissionPending,
        setConfirmationDialogVisible,
        true,
      );
    } catch (error: unknown) {
      handleBuyoutError(error as string);
    }
  }

  return {
    buyoutNativeToken: {
      min: minimumBuyout,
      max: maximumBuyout,
    },
    currencies,
    sellFee,
    nativeCurrency,
    handleBuyout,
  };
};
