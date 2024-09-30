import { SubmittableExtrinsic } from '@polkadot/api/promise/types';
import Big from 'big.js';
import { useCallback, useEffect, useMemo, useState } from 'preact/compat';
import { Asset } from 'stellar-sdk';
import { useFeePallet } from '../../../hooks/spacewalk/useFeePallet';
import { ChainDecimals, nativeStellarToDecimal, nativeToDecimal } from '../../../shared/parseNumbers/metric';

interface FeeBoxProps {
  // The amount of the bridged asset denoted in the smallest unit of the asset
  amountNative: Big;
  bridgedAsset?: Asset;
  extrinsic?: SubmittableExtrinsic;
  nativeCurrency: string;
  network: string;
  securityDeposit?: Big;
  wrappedCurrencySuffix?: string;
}

export function FeeBox(props: FeeBoxProps): JSX.Element {
  const { bridgedAsset, extrinsic, network, wrappedCurrencySuffix, nativeCurrency, securityDeposit } = props;
  const amount = props.amountNative;
  const wrappedCurrencyName = bridgedAsset ? bridgedAsset.getCode() + (wrappedCurrencySuffix || '') : '';
  const { getFees, getTransactionFee } = useFeePallet();
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
      className={`collapse collapse-arrow my-4 cursor-pointer rounded-lg bg-base-300 ${collapseVisibility}`}
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
        <div className="mt-2 flex justify-between">
          <span>Bridge Fee</span>
          <span className="text-right">
            {bridgeFee.toString()} {bridgedAsset?.getCode()}
          </span>
        </div>
        {securityDeposit && (
          <div className="mt-2 flex justify-between">
            <span>Security Deposit</span>
            <span className="text-right">
              {securityDeposit.toFixed(ChainDecimals)} {nativeCurrency}
            </span>
          </div>
        )}
        <div className="mt-2 flex justify-between">
          <span>Transaction Fee</span>
          <span className="text-right">
            {transactionFee.toFixed(ChainDecimals)} {nativeCurrency}
          </span>
        </div>
      </div>
    </div>
  );
}
