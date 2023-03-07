import { useEffect, useMemo, useState } from "preact/hooks";
import Big from "big.js";
import { useNodeInfoState } from "../../NodeInfoProvider";
import { SubmittableExtrinsic } from "@polkadot/api/promise/types";
import { Option, U128 } from "@polkadot/types-codec";
import { useGlobalState } from "../../GlobalStateProvider";
import { nativeToDecimal } from "../../helpers/parseNumbers";
import { SubmittableModuleExtrinsics } from "@polkadot/api-base/types";
import { ApiBase } from "@polkadot/api/base";

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

const defaultTransactionFees = {
  "joinDelegators": Big(0),
  "delegatorStakeMore": Big(0),
  "delegatorStakeLess": Big(0)
}

type ParachainStakingFees = typeof defaultTransactionFees;
type ParachainStakingExtrinsics = keyof typeof defaultTransactionFees;

export function useStakingPallet() {
  const { api } = useNodeInfoState().state;
  const { walletAccount } = useGlobalState().state;

  const [candidates, setCandidates] = useState<ParachainStakingCandidate[]>([]);
  const [inflationInfo, setInflationInfo] = useState<
    ParachainStakingInflationInflationInfo | undefined
  >(undefined);
  const [minDelegatorStake, setMinDelegatorStake] = useState<string>("0");
  const [estimatedRewards, setEstimatedRewards] = useState<string>("0");
  const [fees, setFees] = useState<ParachainStakingFees>(defaultTransactionFees);

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
      if (!walletAccount) return "0";
      return (await api.query.parachainStaking.rewards(walletAccount?.address)).toString();
    };

    const fetchFees = async () => {
      const dummyAddress = "5D4tzEZy9XeNSwsAXgtZrRrs1bTfpPTWGqwb1PwCYjRTKYYS";
      const sender = dummyAddress;
      const pallet = api.tx.parachainStaking;

      const jdi = await pallet.joinDelegators(dummyAddress, "0").paymentInfo(sender);
      const dsmi = await pallet.delegatorStakeMore(dummyAddress, "0").paymentInfo(sender);
      const dsli = await pallet.delegatorStakeLess(dummyAddress, "0").paymentInfo(sender);

      fees.joinDelegators = new Big(jdi.partialFee.toString());
      fees.delegatorStakeMore = new Big(dsmi.partialFee.toString());
      fees.delegatorStakeLess = new Big(dsli.partialFee.toString());

      return fees;
    };

    fetchCandidatePool().then((candidates) => setCandidates(candidates));

    fetchEstimatedReward().then((reward) =>
      setEstimatedRewards(reward)
    );

    fetchInflationInfo().then((inflationInfo) =>
      setInflationInfo(inflationInfo)
    );

    fetchFees().then((newFees) =>
      setFees(newFees)
    );

    if (api.consts.parachainStaking?.minDelegatorStake) {
      setMinDelegatorStake(
        (api.consts.parachainStaking.minDelegatorStake.toHuman() as string) ||
        "0"
      );
    }
  }, [api, walletAccount, walletAccount?.address]);

  const memo = useMemo(() => {
    return {
      candidates,
      inflationInfo,
      minDelegatorStake,
      estimatedRewards,
      fees,
      async getTransactionFee(extrinsic: SubmittableExtrinsic) {
        if (!api || !extrinsic.hasPaymentInfo) {
          return new Big(0);
        }

        // Can be any address because we don't care about executing it here
        const dummyAddress = "5D4tzEZy9XeNSwsAXgtZrRrs1bTfpPTWGqwb1PwCYjRTKYYS";
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
        moreAmountNative: string
      ) {
        if (!api) {
          return undefined;
        }

        return api.tx.parachainStaking?.delegatorStakeMore(
          collatorAddress,
          moreAmountNative
        );
      },
      createJoinDelegatorsExtrinsic(
        collatorAddress: string,
        amountNative: string
      ) {
        if (!api) {
          return undefined;
        }

        return api.tx.parachainStaking?.joinDelegators(
          collatorAddress,
          amountNative
        );
      },
    };
  }, [
    api,
    candidates,
    inflationInfo,
    fees,
    minDelegatorStake,
    estimatedRewards
  ]);

  return memo;
}
