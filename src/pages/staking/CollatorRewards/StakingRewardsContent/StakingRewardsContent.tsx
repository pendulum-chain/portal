import { FC } from 'preact/compat';
import { ClaimButton, ClaimButtonProps } from './ClaimButton';
import { UpdateButton, UpdateButtonProps } from './UpdateButton';

import { nativeToFormatDecimal } from '../../../../shared/parseNumbers/decimal';
import RewardsIcon from '../../../../assets/collators-rewards-icon';

interface StakingRewardsContentProps {
  updateButton: UpdateButtonProps;
  claimButton: ClaimButtonProps;
  tokenSymbol: string;
  estimatedRewards: string;
}

export const StakingRewardsContent: FC<StakingRewardsContentProps> = ({
  updateButton,
  claimButton,
  estimatedRewards,
  tokenSymbol,
}) => (
  <div className="flex flex-row">
    <div className="flex-initial pt-1 pb-0 pr-5">
      <RewardsIcon className="rewards-icon" />
    </div>
    <div className="flex-auto">
      <h3 className="font-semibold primary">{nativeToFormatDecimal(estimatedRewards, tokenSymbol)}</h3>
      <p>Estimated reward</p>
    </div>
    <div className="flex flex-col flex-auto xs:flex-row place-content-end">
      <UpdateButton {...updateButton} />
      <ClaimButton {...claimButton} />
    </div>
  </div>
);
