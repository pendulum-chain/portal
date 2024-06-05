import { Asset } from 'stellar-base';
import Big from 'big.js';
import { nativeStellarToDecimal } from '../../shared/parseNumbers/metric';
import { usePriceFetcher } from '../usePriceFetcher';
import { useFeePallet } from './useFeePallet';
import { useEffect, useState } from 'preact/compat';
import { useMemo } from 'react';
import { convertStellarAssetToCurrency } from '../../helpers/spacewalk';
import { useNodeInfoState } from '../../NodeInfoProvider';

const isInvalid = (value: unknown) => {
  return !value;
};

export const useCalculateGriefingCollateral = (amount: Big, bridgedAsset: Asset | undefined) => {
  const { getTokenPriceForCurrency } = usePriceFetcher();
  const { getFees } = useFeePallet();
  const [griefingCollateral, setGriefingCollateral] = useState<Big>(new Big(0));
  const { api } = useNodeInfoState().state;

  const { griefingCollateralCurrency, issueGriefingCollateralFee } = getFees();

  const bridgedCurrency = useMemo(() => {
    return bridgedAsset && api ? convertStellarAssetToCurrency(bridgedAsset, api) : null;
  }, [bridgedAsset, api]);

  useEffect(() => {
    if (isInvalid(amount) || isInvalid(bridgedCurrency) || isInvalid(griefingCollateralCurrency)) return;

    getTokenPriceForCurrency(bridgedCurrency!).then((assetUSDPrice) => {
      const amountUSD = nativeStellarToDecimal(amount).mul(assetUSDPrice);

      getTokenPriceForCurrency(griefingCollateralCurrency!).then((griefingCollateralCurrencyUSD) => {
        if (isInvalid(griefingCollateralCurrencyUSD)) return;

        setGriefingCollateral(amountUSD.mul(issueGriefingCollateralFee).div(griefingCollateralCurrencyUSD));
      });
    });
  }, [amount, getTokenPriceForCurrency, griefingCollateralCurrency, issueGriefingCollateralFee, bridgedCurrency]);

  return griefingCollateral;
};
