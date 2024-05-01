import { SubmittableExtrinsic } from '@polkadot/api/promise/types';
import Big from 'big.js';
import { useCallback, useEffect, useMemo, useState } from 'preact/compat';
import { Asset } from 'stellar-sdk';
import { useFeePallet } from '../../hooks/spacewalk/useFeePallet';
import { nativeStellarToDecimal, nativeToDecimal } from '../../shared/parseNumbers/metric';
import { usePriceFetcher } from '../../hooks/usePriceFetcher';

interface FeeBoxProps {
  bridgedAsset?: Asset;
  // The amount of the bridged asset denoted in the smallest unit of the asset
  amountNative: Big;
  extrinsic?: SubmittableExtrinsic;
  network: string;
  wrappedCurrencySuffix?: string;
  nativeCurrency: string;
}

export function FeeBox(props: FeeBoxProps): JSX.Element {
  const { bridgedAsset, extrinsic, network, wrappedCurrencySuffix, nativeCurrency } = props;
  const amount = props.amountNative;
  const wrappedCurrencyName = bridgedAsset ? bridgedAsset.getCode() + (wrappedCurrencySuffix || '') : '';
  const { getFees, getTransactionFee } = useFeePallet();
  const { getTokenPrice } = usePriceFetcher();
  const fees = getFees();

  const [collapseVisibility, setCollapseVisibility] = useState('');
  const [transactionFee, setTransactionFee] = useState<Big>(Big(0));

  useEffect(() => {
    if (!extrinsic) {
      return;
    }

    getTransactionFee(extrinsic).then((fee) => {
      setTransactionFee(nativeToDecimal(fee));
    });
  }, [extrinsic, getTransactionFee, setTransactionFee]);

  const bridgeFee = useMemo(() => {
    return nativeStellarToDecimal(amount.mul(fees.issueFee));
  }, [amount, fees]);

  const [griefingCollateral, setGriefingCollateral] = useState(Big(0));

  useEffect(() => {
    const checkInvalid = (value: unknown) => {
      if (!value) {
        setGriefingCollateral(Big(0));
        return false;
      }
      return true;
    };

    const fetchGriefingCollateral = async () => {
      if (!checkInvalid(amount)) return;

      const assetCode = bridgedAsset?.code;
      if (!checkInvalid(assetCode)) return;

      const assetUSDPrice = await getTokenPrice(`${assetCode}${wrappedCurrencySuffix}`);
      if (!checkInvalid(assetUSDPrice)) return;

      const amountUSD = nativeStellarToDecimal(amount).mul(assetUSDPrice);

      const griefingCollateralCurrency = fees.griefingCollateralCurrency?.toHuman();
      if (!griefingCollateralCurrency || typeof griefingCollateralCurrency !== 'string') {
        setGriefingCollateral(Big(0));
        return;
      }

      const griefingCollateralCurrencyUSD = await getTokenPrice(griefingCollateralCurrency);
      if (!checkInvalid(griefingCollateralCurrencyUSD)) return;

      const griefingCollateralValue = amountUSD.mul(0.05).div(griefingCollateralCurrencyUSD);
      setGriefingCollateral(griefingCollateralValue);
    };

    fetchGriefingCollateral();
  }, [
    amount,
    bridgedAsset?.code,
    fees.griefingCollateralCurrency,
    fees.issueGriefingCollateral,
    getTokenPrice,
    wrappedCurrencySuffix,
  ]);

  const toggle = useCallback(() => {
    if (collapseVisibility === '') {
      setCollapseVisibility('collapse-open');
    } else {
      setCollapseVisibility('');
      const elem = document.activeElement;
      if (elem && elem instanceof HTMLElement) {
        elem.blur();
      }
    }
  }, [collapseVisibility, setCollapseVisibility]);

  const totalAmount = useMemo(() => {
    if (amount.cmp(0) === 0) {
      return 0;
    }

    return nativeStellarToDecimal(amount).sub(bridgeFee);
  }, [amount, bridgeFee]);

  return (
    <div
      tabIndex={0}
      onClick={toggle}
      className={`collapse cursor-pointer collapse-arrow bg-base-300 rounded-lg my-4 ${collapseVisibility}`}
    >
      <div className="collapse-title">
        <div className="flex justify-between">
          <span>To {network}</span>
          <span>
            {totalAmount.toString()} {wrappedCurrencyName}
          </span>
        </div>
      </div>
      <div className="collapse-content">
        <div className="flex justify-between mt-2">
          <span>Bridge Fee</span>
          <span className="text-right">
            {bridgeFee.toString()} {bridgedAsset?.getCode()}
          </span>
        </div>
        <div className="flex justify-between mt-2">
          <span>Security Deposit</span>
          <span className="text-right">
            {griefingCollateral.toString()} {nativeCurrency}
          </span>
        </div>
        <div className="flex justify-between mt-2">
          <span>Transaction Fee</span>
          <span className="text-right">
            {transactionFee.toFixed(12)} {nativeCurrency}
          </span>
        </div>
      </div>
    </div>
  );
}
