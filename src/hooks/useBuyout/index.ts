import { StateUpdater, useEffect, useState } from 'preact/hooks';
import { isEmpty } from 'lodash';
import { Option } from '@polkadot/types-codec';
import { Codec } from '@polkadot/types-codec/types';

import { useNodeInfoState } from '../../NodeInfoProvider';
import { nativeToFormatDecimalPure } from '../../shared/parseNumbers/decimal';
import { doSubmitExtrinsic } from '../../pages/collators/dialogs/helpers';
import { useGlobalState } from '../../GlobalStateProvider';

import { OrmlTraitsAssetRegistryAssetMetadata } from './types';
import { getMetadata } from './utils';
import { ToastMessage, showToast } from '../../shared/showToast';
import { PerMill } from '../../shared/parseNumbers/permill';
import { decimalToNative } from '../../shared/parseNumbers/metric';

export interface BuyoutSettings {
  buyoutNativeToken: {
    min: number;
    max: number;
  };
  currencies: OrmlTraitsAssetRegistryAssetMetadata[];
  nativeCurrency: OrmlTraitsAssetRegistryAssetMetadata;
  handleBuyout: (
    currency: OrmlTraitsAssetRegistryAssetMetadata,
    amount: number,
    setSubmissionPending: StateUpdater<boolean>,
    setConfirmationDialogVisible: StateUpdater<boolean>,
    isExchangeAmount: boolean,
  ) => void;
}

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

  showToast(ToastMessage.ERROR, 'The buyout failed');
  return;
}

export const useBuyout = (): BuyoutSettings => {
  const { api } = useNodeInfoState().state;
  const { tenantName } = useGlobalState();
  const { walletAccount } = useGlobalState();
  const [minimumBuyout, setMinimumBuyout] = useState<number>(0);
  const [maximumBuyout, setMaximumBuyout] = useState<number>(0);

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

        setMinimumBuyout(sellFeePerMill.addSelfToBase(minBuyoutLimitFormatted));
        setMaximumBuyout(maxBuyoutLimitFormatted);
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

    const scaledCurrency = decimalToNative(amount, currency.metadata.decimals).toNumber();

    const assetId = currency.assetId as { XCM: number };

    // exchange is in selected token (KSM/USDT)... buyout is in native token (AMPE)
    const exchange = isExchangeAmount
      ? { buyout: { amount: scaledCurrency } }
      : { exchange: { amount: scaledCurrency } };

    const submittableExtrinsic = api.tx.treasuryBuyoutExtension.buyout({ XCM: assetId.XCM }, exchange);

    const response = await doSubmitExtrinsic(
      api,
      submittableExtrinsic,
      walletAccount,
      setSubmissionPending,
      setConfirmationDialogVisible,
      true,
    );

    if (response) handleBuyoutError(response);
  }

  return {
    buyoutNativeToken: {
      min: minimumBuyout,
      max: maximumBuyout,
    },
    currencies: Object.values(getMetadata(tenantName).currencies),
    nativeCurrency: getMetadata(tenantName).nativeCurrency.ampe,
    handleBuyout,
  };
};
