import { Asset } from '@stellar/stellar-sdk';
import Big from 'big.js';
import { useEffect, useState, useMemo } from 'preact/compat';
import { nativeStellarToDecimal } from '../../shared/parseNumbers/metric';
import { convertStellarAssetToCurrency } from '../../helpers/spacewalk';
import { useNodeInfoState } from '../../NodeInfoProvider';
import { usePriceFetcher } from '../usePriceFetcher';
import { useFeePallet } from './useFeePallet';

const isInvalid = (value: unknown) => {
  return !value;
};

export const useCalculateGriefingCollateral = (amount: Big, bridgedAsset?: Asset): Big.Big => {
  const { getTokenPriceForCurrency } = usePriceFetcher();
  const { getFees } = useFeePallet();
  const [griefingCollateral, setGriefingCollateral] = useState<Big>(new Big(0));
  const { api } = useNodeInfoState().state;

  const { griefingCollateralCurrency, issueGriefingCollateralFee } = getFees();

  const bridgedCurrency = useMemo(() => {
    return bridgedAsset && api ? convertStellarAssetToCurrency(bridgedAsset, api) : null;
  }, [bridgedAsset, api]);

  useEffect(() => {
    const calculateGriefingCollateral = async () => {
      if (isInvalid(amount) || isInvalid(bridgedCurrency) || isInvalid(griefingCollateralCurrency)) return;

      if (bridgedCurrency && griefingCollateralCurrency) {
        try {
          const assetUSDPrice = await getTokenPriceForCurrency(bridgedCurrency);
          const amountUSD = nativeStellarToDecimal(amount).mul(assetUSDPrice);

          const griefingCollateralCurrencyUSD = await getTokenPriceForCurrency(griefingCollateralCurrency);
          if (isInvalid(griefingCollateralCurrencyUSD)) return;

          setGriefingCollateral(amountUSD.mul(issueGriefingCollateralFee).div(griefingCollateralCurrencyUSD));
        } catch (error) {
          console.error('Error calculating griefing collateral:', error);
        }
      }
    };

    calculateGriefingCollateral();
  }, [amount, getTokenPriceForCurrency, griefingCollateralCurrency, issueGriefingCollateralFee, bridgedCurrency]);

  return griefingCollateral;
};
