import { SubmittableExtrinsic } from '@polkadot/api/promise/types';
import Big from 'big.js';
import { useEffect, useMemo, useState } from 'react';
import { Asset } from 'stellar-sdk';
import { useFeePallet } from '../../hooks/spacewalk/fee';
import { nativeStellarToDecimal, nativeToDecimal } from '../../shared/parseNumbers';

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
  const fees = getFees();

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

  const griefingCollateral = useMemo(() => {
    return nativeStellarToDecimal(amount.mul(fees.issueGriefingCollateral));
  }, [amount, fees]);

  const totalAmount = useMemo(() => {
    if (amount.cmp(0) === 0) {
      return 0;
    }

    return nativeStellarToDecimal(amount).sub(bridgeFee);
  }, [amount, bridgeFee]);
  return (
    <div tabIndex={0} className="bg-base-300 rounded-lg my-4 collapse collapse-arrow">
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
