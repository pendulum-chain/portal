import { SubmittableExtrinsic } from '@polkadot/api/promise/types';
import { Option } from '@polkadot/types-codec';
import Big from 'big.js';
import { useEffect, useMemo, useState } from 'preact/hooks';
import { useGlobalState } from '../../GlobalStateProvider';
import { useNodeInfoState } from '../../NodeInfoProvider';

interface ParachainStakingDelegator {
  owner: string;
  amount: string;
}

export interface ParachainStakingCandidate {
  id: string;
  stake: string;
  delegators: ParachainStakingDelegator[];
  total: string;
  status: string | false;
}

interface ParachainStakingStakeOption {
  owner: string;
  amount: string;
}

export interface ParachainStakingInflationInflationInfo {
  collator: {
    maxRate: string;
    rewardRate: {
      annual: string;
      perBlock: string;
    };
  };
  delegator: {
    maxRate: string;
    rewardRate: {
      annual: string;
      perBlock: string;
    };
  };
}

export function useStakingPallet() {
  const { api } = useNodeInfoState().state;
  const { walletAccount } = useGlobalState().state;

  const [candidates, setCandidates] = useState<ParachainStakingCandidate[]>([]);
  const [inflationInfo, setInflationInfo] = useState<
    ParachainStakingInflationInflationInfo | undefined
  >(undefined);
  const [minDelegatorStake, setMinDelegatorStake] = useState<string>('0');
  const [estimatedRewards, setEstimatedRewards] = useState<string>('0');
  const [joinDelegatorsTransactionFee, setJoinDelegatorsTransactionFee] =
    useState<Big>(new Big(0));

  useEffect(() => {
    if (!api) {
      return;
    }

    // Check that the pallet is available
    if (!api.query.parachainStaking) {
      return;
    }

    const fetchCandidatePool = async () => {
      const entries = await api.query.parachainStaking.candidatePool.entries();

      const newCandidates = entries.map(([_, value]) => {
        const candidate = (value as Option<any>)
          .unwrap()
          .toHuman() as ParachainStakingCandidate;

        return candidate;
      });

      return newCandidates;
    };

    const fetchInflationInfo = async () => {
      const inflationInfo = await api.query.parachainStaking.inflationConfig();
      return inflationInfo.toHuman() as unknown as ParachainStakingInflationInflationInfo;
    };

    const fetchEstimatedReward = async () => {
      if (!walletAccount) return '0';
      return (
        await api.query.parachainStaking.rewards(walletAccount?.address)
      ).toString();
    };

    const fetchJoinDelegatorsTransactionFee = async () => {
      const dummyAddress = '5D4tzEZy9XeNSwsAXgtZrRrs1bTfpPTWGqwb1PwCYjRTKYYS';
      const sender = dummyAddress;
      const info = await api.tx.parachainStaking
        ?.joinDelegators(dummyAddress, '0')
        .paymentInfo(sender);
      return new Big(info.partialFee.toString());
    };

    fetchCandidatePool().then((candidates) => setCandidates(candidates));

    fetchEstimatedReward().then((reward) => setEstimatedRewards(reward));

    fetchInflationInfo().then((inflationInfo) =>
      setInflationInfo(inflationInfo),
    );

    fetchJoinDelegatorsTransactionFee().then((fee) =>
      setJoinDelegatorsTransactionFee(fee),
    );

    if (api.consts.parachainStaking?.minDelegatorStake) {
      setMinDelegatorStake(
        (api.consts.parachainStaking.minDelegatorStake.toHuman() as string) ||
          '0',
      );
    }
  }, [api, walletAccount, walletAccount?.address]);

  const memo = useMemo(() => {
    return {
      candidates,
      inflationInfo,
      minDelegatorStake,
      estimatedRewards,
      joinDelegatorsTransactionFee,
      async getTransactionFee(extrinsic: SubmittableExtrinsic) {
        if (!api || !extrinsic.hasPaymentInfo) {
          return new Big(0);
        }

        // Can be any address because we don't care about executing it here
        const dummyAddress = '5D4tzEZy9XeNSwsAXgtZrRrs1bTfpPTWGqwb1PwCYjRTKYYS';
        const sender = dummyAddress;
        const info = await extrinsic.paymentInfo(sender);

        return new Big(info.partialFee.toString());
      },
      createClaimRewardExtrinsic(claimAmount: string) {
        if (!api) {
          return undefined;
        }
        return api.tx.parachainStaking?.claimRewards();
      },
      createDelegateMoreExtrinsic(
        collatorAddress: string,
        moreAmountNative: string,
      ) {
        if (!api) {
          return undefined;
        }

        return api.tx.parachainStaking?.delegatorStakeMore(
          collatorAddress,
          moreAmountNative,
        );
      },
      createJoinDelegatorsExtrinsic(
        collatorAddress: string,
        amountNative: string,
      ) {
        if (!api) {
          return undefined;
        }

        return api.tx.parachainStaking?.joinDelegators(
          collatorAddress,
          amountNative,
        );
      },
    };
  }, [
    api,
    candidates,
    inflationInfo,
    joinDelegatorsTransactionFee,
    minDelegatorStake,
    estimatedRewards,
  ]);

  return memo;
}
