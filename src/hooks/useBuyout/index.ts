import { StateUpdater, useEffect, useState } from 'preact/hooks';
import { isEmpty } from 'lodash';
import { Option } from '@polkadot/types-codec';
import { Codec } from '@polkadot/types-codec/types';

import { useNodeInfoState } from '../../NodeInfoProvider';
import { convertNativeToDecimal } from '../../shared/parseNumbers/decimal';
import { doSubmitExtrinsic } from '../../pages/collators/dialogs/helpers';
import { useGlobalState } from '../../GlobalStateProvider';

import { OrmlTraitsAssetRegistryAssetMetadata } from './types';
import { getMetadata, scaleByCurrencyPrecision } from './utils';
import { ToastMessage, showToast } from '../../shared/showToast';

export interface BuyoutSettings {
  swap: {
    minNative: number;
    maxNative: number;
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

export const useBuyout = (): BuyoutSettings => {
  const { api } = useNodeInfoState().state;
  const { walletAccount } = useGlobalState();
  const [minimumSwap, setMinimumSwap] = useState<number>(0);
  const [maximumSwap, setMaximumSwap] = useState<number>(0);

  useEffect(() => {
    async function fetchMinMax() {
      if (api) {
        const minAmountToBuyout = await api.consts.treasuryBuyoutExtension.minAmountToBuyout;
        const maxAmountToBuyout = await api.query.treasuryBuyoutExtension.buyoutLimit();

        const minBuyoutAmount = minAmountToBuyout?.toString();
        const maxBuyoutAmount = (maxAmountToBuyout as unknown as Option<Codec>)?.unwrap().toString();

        const minSwap = convertNativeToDecimal(minBuyoutAmount);
        const maxSwap = convertNativeToDecimal(maxBuyoutAmount);

        setMinimumSwap(Number(minSwap));
        setMaximumSwap(Number(maxSwap));
      }
    }

    fetchMinMax();
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

    console.log('currency.assetId', currency.assetId.XCM);
    console.log('scaledCurrency', scaledCurrency);

    const submitableExtrinsic = await api.tx.treasuryBuyoutExtension.buyout(
      { XCM: currency.assetId.XCM },
      { exchange: { buyout: scaledCurrency } },
    );

    try {
      await doSubmitExtrinsic(
        api,
        submitableExtrinsic,
        walletAccount,
        setSubmissionPending,
        setConfirmationDialogVisible,
      );
    } catch (error) {
      showToast(ToastMessage.TX_SUBMISSION_FAILED);
    }
  }

  return {
    swap: {
      minNative: minimumSwap,
      maxNative: maximumSwap,
    },
    currencies: Object.values(getMetadata().currencies),
    nativeCurrency: getMetadata().nativeCurrency.ampe,
    handleBuyout,
  };
};
