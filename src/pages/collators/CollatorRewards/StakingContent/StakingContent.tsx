import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

import StakedIcon from '../../../../assets/collators-staked-icon';
import { nativeToFormatMetric } from '../../../../shared/parseNumbers/metric';

interface StakingContentProps {
  onButtonClick: () => void;
  balanceEnabledForUnlock: string;
  tokenSymbol: string;
  userStakingAmount?: string;
  userAvailableBalance: string;
  unstaking: string;
  tokensTipText: string;
}

export const StakingContent: React.FC<StakingContentProps> = ({
  onButtonClick,
  balanceEnabledForUnlock,
  tokenSymbol,
  userStakingAmount = '0.00',
  userAvailableBalance,
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
          <div className="tooltip tooltip-secondary whitespace-pre-line" data-tip={tokensTipText}>
            <ExclamationCircleIcon className="w-5 h-5 ml-2 text-gray-400" />
          </div>
        ) : null}
      </div>
      <button
        disabled={!Number(balanceEnabledForUnlock)}
        className="btn btn-primary btn-unlock min-h-fit max-h-10 w-full m-auto px-8"
        onClick={onButtonClick}
      >
        Unlock
      </button>
    </div>
  </div>
);
