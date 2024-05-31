import { SubmittableExtrinsic } from '@polkadot/api/promise/types';
import Big from 'big.js';
import { useCallback, useEffect, useMemo, useState } from 'preact/compat';
import { Asset } from 'stellar-sdk';
import { useFeePallet } from '../../hooks/spacewalk/useFeePallet';
import { nativeStellarToDecimal, nativeToDecimal } from '../../shared/parseNumbers/metric';
import { usePriceFetcher } from '../../hooks/usePriceFetcher';
import { calculateGriefingCollateral } from './helpers';
import { useNodeInfoState } from '../../NodeInfoProvider';
import { convertStellarAssetToCurrency } from '../../helpers/spacewalk';

interface FeeBoxProps {
  // The amount of the bridged asset denoted in the smallest unit of the asset
  amountNative: Big;
  bridgedAsset?: Asset;
  extrinsic?: SubmittableExtrinsic;
  nativeCurrency: string;
  network: string;
  showSecurityDeposit?: boolean;
  wrappedCurrencySuffix?: string;
}

export function FeeBox(props: FeeBoxProps): JSX.Element {
  const { bridgedAsset, extrinsic, network, wrappedCurrencySuffix, nativeCurrency, showSecurityDeposit } = props;
  const amount = props.amountNative;
  const wrappedCurrencyName = bridgedAsset ? bridgedAsset.getCode() + (wrappedCurrencySuffix || '') : '';
  const { getFees, getTransactionFee } = useFeePallet();
  const { getTokenPriceForCurrency } = usePriceFetcher();
  const fees = getFees();
  const { api } = useNodeInfoState().state;

  const [collapseVisibility, setCollapseVisibility] = useState('');
  const [transactionFee, setTransactionFee] = useState<Big>(Big(0));
  const bridgedAssetCurrencyId = useMemo(() => {
    return bridgedAsset && api ? convertStellarAssetToCurrency(bridgedAsset, api) : null;
  }, [bridgedAsset, api]);

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
    const fetchGriefingCollateral = async () => {
      const calculatedGriefingCollateral = await calculateGriefingCollateral(
        amount,
        bridgedAssetCurrencyId,
        fees.griefingCollateralCurrency,
        getTokenPriceForCurrency,
        fees.issueGriefingCollateralFee,
      );
      calculatedGriefingCollateral && setGriefingCollateral(calculatedGriefingCollateral);
    };
    fetchGriefingCollateral();
  }, [
    amount,
    bridgedAssetCurrencyId,
    wrappedCurrencySuffix,
    getTokenPriceForCurrency,
    fees.griefingCollateralCurrency,
    fees.issueGriefingCollateralFee,
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
        {showSecurityDeposit && (
          <div className="flex justify-between mt-2">
            <span>Security Deposit</span>
            <span className="text-right">
              {griefingCollateral.toString()} {nativeCurrency}
            </span>
          </div>
        )}
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
