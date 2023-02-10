import { useEffect, useMemo, useState } from "preact/hooks";
import Big from "big.js";
import { useNodeInfoState } from "../../NodeInfoProvider";
import { SubmittableExtrinsic } from "@polkadot/api/promise/types";
import { Option } from "@polkadot/types-codec";
import { useGlobalState } from "../../GlobalStateProvider";

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
  const [minDelegatorStake, setMinDelegatorStake] = useState<string>("0");
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

    const fetchJoinDelegatorsTransactionFee = async () => {
      const dummyAddress = "5D4tzEZy9XeNSwsAXgtZrRrs1bTfpPTWGqwb1PwCYjRTKYYS";
      const sender = dummyAddress;
      // This does not work yet
      // const extrinsic = api.query.parachainStaking?.joinDelegators(
      //   dummyAddress,
      //   "0"
      // );
      // const info = await extrinsic.paymentInfo(sender);

      return new Big(info.partialFee.toString());
    };

    fetchCandidatePool().then((candidates) => setCandidates(candidates));
    fetchInflationInfo().then((inflationInfo) =>
      setInflationInfo(inflationInfo)
    );
    fetchJoinDelegatorsTransactionFee().then((fee) =>
      setJoinDelegatorsTransactionFee(fee)
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
      joinDelegatorsTransactionFee,
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
    joinDelegatorsTransactionFee,
    minDelegatorStake,
  ]);

  return memo;
}
