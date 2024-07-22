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
    <div className="w-1/2 flex items-center">
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
    <div className="flex flex-col items-center w-full mt-5">
      <div className="flex flex-row items-center mb-1">
        <h3>{nativeToFormatMetric(unstaking, tokenSymbol)}</h3>
        {Number(unstaking) ? (
          <Tooltip message={tokensTipText} color="secondary">
            <ExclamationCircleIcon className="w-5 h-5 ml-2 text-gray-400" />
          </Tooltip>
        ) : null}
      </div>
      <button
        disabled={!userAvailableBalanceForUnlock.toNumber()}
        className="btn btn-primary btn-unlock min-h-fit max-h-10 w-full m-auto px-8"
        onClick={onButtonClick}
      >
        Unlock
      </button>
    </div>
  </div>
);
