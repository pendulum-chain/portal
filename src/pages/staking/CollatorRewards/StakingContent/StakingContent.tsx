import { FC } from 'preact/compat';
import { Tooltip } from 'react-daisyui';
import Big from 'big.js';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

import StakedIcon from '../../../../assets/collators-staked-icon';
import { nativeToFormatMetric } from '../../../../shared/parseNumbers/metric';

interface StakingContentProps {
  onButtonClick: () => void;
  userStakingAmount?: string;
  userAvailableBalance: string;
  userAvailableBalanceForUnlock: Big;
  tokenSymbol: string;
  unstaking: string;
  tokensTipText: string;
}

export const StakingContent: FC<StakingContentProps> = ({
  onButtonClick,
  userStakingAmount = '0.00',
  userAvailableBalance,
  userAvailableBalanceForUnlock,
  tokenSymbol,
  unstaking,
  tokensTipText,
}) => (
  <div className="flex flex-wrap items-center">
    <div className="flex w-1/2 items-center">
      <div className="mr-3">
        <StakedIcon className="staked-icon mt-1" />
      </div>
      <div>
        <h3>{nativeToFormatMetric(userStakingAmount, tokenSymbol)}</h3>
        <p>My Staking</p>
      </div>
    </div>
    <div className="w-1/2">
      <h3>{nativeToFormatMetric(userAvailableBalance, tokenSymbol)}</h3>
      <p>Free balance</p>
    </div>
    <div className="mt-5 flex w-full flex-col items-center">
      <div className="mb-1 flex flex-row items-center">
        <h3>{nativeToFormatMetric(unstaking, tokenSymbol)}</h3>
        {Number(unstaking) ? (
          <Tooltip message={tokensTipText} color="secondary">
            <ExclamationCircleIcon className="ml-2 h-5 w-5 text-gray-400" />
          </Tooltip>
        ) : null}
      </div>
      <button
        disabled={!userAvailableBalanceForUnlock.toNumber()}
        className="btn-unlock btn btn-primary m-auto max-h-10 min-h-fit w-full px-8"
        onClick={onButtonClick}
      >
        Unlock
      </button>
    </div>
  </div>
);
