import { StateUpdater, Dispatch, useEffect, useState } from 'preact/hooks';
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
import { useAssetRegistryMetadata } from '../useAssetRegistryMetadata';

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
    setSubmissionPending: Dispatch<StateUpdater<boolean>>,
    setConfirmationDialogVisible: Dispatch<StateUpdater<boolean>>,
    isExchangeAmount: boolean,
  ) => void;
}

type Exchange =
  | { Buyout: { amount: number } }
  | { Exchange: { amount: number } };

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
  const { getNativeAssetMetadata, getAssetMetadata } = useAssetRegistryMetadata();

  const [nativeCurrency, setNativeCurrency] = useState<OrmlTraitsAssetRegistryAssetMetadata | undefined>(undefined);
  const [currencies, setCurrencies] = useState<OrmlTraitsAssetRegistryAssetMetadata[]>([]);

  useEffect(() => {
    async function fetchAllowedCurrencies() {
      const allowedCurrencies = [];
      if (api) {
        const allowedCurrenciesEntries = await api.query.treasuryBuyoutExtension.allowedCurrencies.entries();

        for (const currency of allowedCurrenciesEntries) {
          if (currency.length && currency[0] && currency[0].toHuman()) {
            const currencyXCMId: { XCM: number } = (currency[0].toHuman() as { XCM: number }[])[0];
            const currencyMetadata = await getAssetMetadata(currencyXCMId);

            if (currencyMetadata) {
              allowedCurrencies.push(currencyMetadata);
            }
          }
        }
      }
      return allowedCurrencies;
    }

    async function fetchAndSetCurrencies() {
      setCurrencies(await fetchAllowedCurrencies());
      setNativeCurrency(await getNativeAssetMetadata());
    }

    fetchAndSetCurrencies().catch(console.error);
  }, [api, getNativeAssetMetadata, getAssetMetadata]);

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
    setSubmissionPending: Dispatch<StateUpdater<boolean>>,
    setConfirmationDialogVisible: Dispatch<StateUpdater<boolean>>,
    isExchangeAmount: boolean,
  ) {
    if (!api || !walletAccount) {
      return;
    }
    if (isEmpty(api.tx) || isEmpty(api.tx.treasuryBuyoutExtension)) {
      throw new Error('Treasury Buyout does not exist');
    }

    const scaledCurrency = decimalToNative(amount, currency.metadata.decimals).toNumber();

    const assetId = currency.assetId as { XCM: number };

    // exchange is in selected token (KSM/USDT)... buyout is in native token (AMPE)
    const exchange: Exchange = isExchangeAmount
      ? { Buyout: { amount: scaledCurrency } }
      : { Exchange: { amount: scaledCurrency } };

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
