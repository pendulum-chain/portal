import BigNumber from 'big.js';
import { StateUpdater, Dispatch, useEffect, useState } from 'preact/hooks';
import { isEmpty, find } from 'lodash';
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
import { SpacewalkPrimitivesCurrencyId } from '@polkadot/types/lookup';

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
    isBuyoutInNativeToken: boolean,
  ) => void;
}

const BuyoutErrors: Record<string, string> = {
  '1010: Invalid Transaction: Custom error: 4': 'Wrong asset to buyout',
  '1010: Invalid Transaction: Custom error: 3': 'The buyout amount is too low',
  '1010: Invalid Transaction: Custom error: 2': 'Max buyout reached',
  '1010: Invalid Transaction: Custom error: 1': 'Calculation error',
  '1010: Invalid Transaction: Custom error: 0': 'Not enough funds',
  Cancelled: 'The buyout was cancelled',
};

function handleBuyoutError(error: string) {
  if (!error) return;

  const errorKey = find(Object.keys(BuyoutErrors), (key) => error.trim().includes(key));

  if (errorKey) {
    showToast(ToastMessage.BUYOUT_ERROR, BuyoutErrors[errorKey]);
    return;
  }

  showToast(ToastMessage.BUYOUT_ERROR, 'The buyout failed:' + error);
  return;
}

function generateBuyoutExtrinsicPayload(isBuyoutInNativeToken: boolean, amount: BigNumber) {
  const amountString = amount.toString();
  // { exchange: { amount: number } } is in selected token (KSM/USDT/DOT)
  // { buyout: { amount: number } } is in native token (AMPE/PEN)
  return isBuyoutInNativeToken ? { buyout: { amount: amountString } } : { exchange: { amount: amountString } };
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

        for (const [currency, _] of allowedCurrenciesEntries) {
          const currencyKeyHuman = currency.toHuman() as unknown as SpacewalkPrimitivesCurrencyId[];
          const currencyId = currencyKeyHuman[0];
          const currencyMetadata = await getAssetMetadata(currencyId);

          if (currencyMetadata) {
            allowedCurrencies.push(currencyMetadata);
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
    isBuyoutInNativeToken: boolean,
  ) {
    if (!api || !walletAccount) {
      return;
    }
    if (isEmpty(api.tx) || isEmpty(api.tx.treasuryBuyoutExtension)) {
      throw new Error('Treasury Buyout does not exist');
    }

    const amountRaw = decimalToNative(
      amount,
      isBuyoutInNativeToken ? nativeCurrency?.metadata.decimals : currency.metadata.decimals,
    );
    const assetId = currency.currencyId;
    if (!assetId) return;

    const buyoutExtrinsicData = generateBuyoutExtrinsicPayload(isBuyoutInNativeToken, amountRaw);

    const submittableExtrinsic = api.tx.treasuryBuyoutExtension.buyout({ XCM: assetId }, buyoutExtrinsicData);

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
