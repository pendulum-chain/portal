import { ApiPromise } from '@polkadot/api';
import { Dispatch } from 'react';
import { EventRecord, ExtrinsicStatus } from '@polkadot/types/interfaces';

import { ShowToast, ToastMessage } from '../../../shared/showToast';
import { nativeToFormatMetric, sanitizeNative } from '../../../shared/parseNumbers/metric';
import { BLOCK_TIME_SEC, MINUTE_IN_MILLISECONDS, SECONDS_IN_A_DAY } from '../../../shared/constants';
import { getErrors } from '../../../helpers/substrate';
import Big from 'big.js';

async function calculateDaysLeft(blockNumber: string | number, api: ApiPromise) {
  const currentBlockNumber = await api.derive.chain.bestNumber();
  const blocksLeft = Number(blockNumber) - Number(currentBlockNumber);
  const daysLeft = Math.round((blocksLeft * BLOCK_TIME_SEC) / SECONDS_IN_A_DAY);

  return daysLeft;
}

export type UnstakingDataType = { [key: string]: string };

function areTokensReadyToUnlock(daysLeft: number): boolean {
  return daysLeft <= 0;
}

export async function generateUnstakingTooltipText(
  unstakingData: UnstakingDataType,
  api: ApiPromise,
  tokenSymbol: string | undefined,
): Promise<string> {
  const tooltipTextPromises = Object.entries(unstakingData).map(async ([blockNumber, value]) => {
    const daysLeft = await calculateDaysLeft(blockNumber, api);
    if (areTokensReadyToUnlock(daysLeft)) {
      return `${nativeToFormatMetric(value, tokenSymbol)} ready to be unlocked.\n`;
    } else {
      return `${nativeToFormatMetric(value, tokenSymbol)} locked for ${daysLeft} ${daysLeft > 1 ? 'days' : 'day'}.\n`;
    }
  });

  const tooltipTextParts = await Promise.all(tooltipTextPromises);

  const tooltipText = tooltipTextParts.join('');

  return tooltipText;
}

export async function calculateTokensReadyToUnlock(unstakingData: UnstakingDataType, api: ApiPromise): Promise<Big> {
  const tokensReadyToUnlockPromises = Object.entries(unstakingData).map(async ([blockNumber, value]) => {
    const daysLeft = await calculateDaysLeft(blockNumber, api);

    if (areTokensReadyToUnlock(daysLeft)) {
      return sanitizeNative(value);
    }

    return new Big(0);
  });

  const tokensReadyToUnlockValues = await Promise.all(tokensReadyToUnlockPromises);
  const tokensReadyToUnlock = tokensReadyToUnlockValues.reduce((total, value) => total.add(value), new Big(0));

  return tokensReadyToUnlock;
}

export const handleTransactionStatus = (
  status: ExtrinsicStatus,
  events: EventRecord[],
  api: ApiPromise,
  showToast: ShowToast,
  setSubmissionPending: Dispatch<boolean>,
  refreshRewards: () => void,
  setUpdateEnabled: Dispatch<boolean>,
) => {
  const errors = getErrors(events, api);
  if (status.isInBlock) {
    if (errors.length > 0) {
      const errorMessage = `Transaction failed with errors: ${errors.join('\n')}`;
      console.error(errorMessage);
      showToast(ToastMessage.ERROR, errorMessage);
    }
  } else if (status.isFinalized) {
    setSubmissionPending(false);
    refreshRewards();
    if (errors.length === 0) {
      showToast(ToastMessage.UPDATED_DELEGATOR_REWARDS);
      setUpdateEnabled(false);
      setTimeout(() => {
        setUpdateEnabled(true);
      }, 15 * MINUTE_IN_MILLISECONDS);
    }
  }
};
