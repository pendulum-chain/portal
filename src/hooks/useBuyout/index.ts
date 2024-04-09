import { StateUpdater, useEffect, useState } from 'preact/hooks';
import { isEmpty } from 'lodash';
import { Option } from '@polkadot/types-codec';
import { Codec } from '@polkadot/types-codec/types';

import { useNodeInfoState } from '../../NodeInfoProvider';
import { nativeToFormatDecimalPure } from '../../shared/parseNumbers/decimal';
import { doSubmitExtrinsic } from '../../pages/collators/dialogs/helpers';
import { useGlobalState } from '../../GlobalStateProvider';

import { OrmlTraitsAssetRegistryAssetMetadata } from './types';
import { getMetadata, scaleByCurrencyPrecision } from './utils';
import { ToastMessage, showToast } from '../../shared/showToast';
import { PerMill } from '../../shared/parseNumbers/permill';

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
  ) => void;
}

function handleBuyoutError(error: string) {
  if (error.includes('1010: Invalid Transaction: Custom error: 3')) {
    showToast(ToastMessage.ERROR, 'The buyout amount is too low');
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

        const MIN_FEE_MULTIPLIER = 1.01; // sellFee + min amount still needs 1% for the tx to be fired.

        setMinimumBuyout(sellFeePerMill.applyAdjustmentToNumber(minBuyoutLimitFormatted) * MIN_FEE_MULTIPLIER);
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
  ) {
    if (!api || !walletAccount) {
      return;
    }
    if (isEmpty(api.tx) || isEmpty(api.tx.treasuryBuyoutExtension)) {
      throw new Error('Treasury Buyout does not exist');
    }

    const scaledCurrency = scaleByCurrencyPrecision(currency, amount);

    const assetId = currency.assetId as { XCM: number };

    const submittableExtrinsic = await api.tx.treasuryBuyoutExtension.buyout(
      { XCM: assetId.XCM },
      { exchange: { buyout: scaledCurrency } },
    );

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
    currencies: Object.values(getMetadata().currencies),
    nativeCurrency: getMetadata().nativeCurrency.ampe,
    handleBuyout,
  };
};
