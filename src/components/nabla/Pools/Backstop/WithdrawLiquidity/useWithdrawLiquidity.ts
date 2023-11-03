import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'preact/compat';
import { useForm, useWatch } from 'react-hook-form';
import { BackstopPool, SwapPool } from '../../../../../../gql/graphql';
import { cacheKeys } from '../../../../../constants/cache';
import { backstopPoolAbi } from '../../../../../contracts/nabla/BackstopPool';
import { subtractPercentage } from '../../../../../helpers/calc';
import { useGetAppDataByTenant } from '../../../../../hooks/useGetAppDataByTenant';
import { useModalToggle } from '../../../../../services/modal';
import { decimalToNative, FixedU128Decimals } from '../../../../../shared/parseNumbers';
import { useContractBalance } from '../../../../../shared/useContractBalance';
import { useContractWrite } from '../../../../../shared/useContractWrite';
import schema from './schema';
import { WithdrawLiquidityValues } from './types';

export const useWithdrawLiquidity = (pool: BackstopPool) => {
  const { id: poolAddress, token, router } = pool;
  const tokenAddress = token.id;
  const swapPools = router?.swapPools;
  const queryClient = useQueryClient();
  const { indexerUrl } = useGetAppDataByTenant('nabla').data || {};
  const toggle = useModalToggle();

  const balanceQuery = useContractBalance({ contractAddress: tokenAddress, decimals: FixedU128Decimals });
  const depositQuery = useContractBalance({ contractAddress: poolAddress, decimals: FixedU128Decimals });

  const form = useForm<WithdrawLiquidityValues>({
    resolver: yupResolver(schema),
    defaultValues: {},
  });

  const amount =
    Number(
      useWatch({
        control: form.control,
        name: 'amount',
        defaultValue: 0,
      }),
    ) || 0;

  const address = useWatch({
    control: form.control,
    name: 'address',
  });

  const mutation = useContractWrite({
    abi: backstopPoolAbi,
    address: poolAddress,
    method: 'withdraw',
    onError: () => {
      // ? log error - alert not needed as the transaction modal displays the error
    },
    onSuccess: () => {
      form.reset();
      balanceQuery.refetch();
      depositQuery.refetch();
      queryClient.refetchQueries([cacheKeys.swapPools, indexerUrl]);
    },
  });

  const onSubmit = form.handleSubmit((variables: WithdrawLiquidityValues) =>
    mutation.mutate([
      decimalToNative(variables.amount, FixedU128Decimals).toString(),
      decimalToNative(subtractPercentage(variables.amount, 1), FixedU128Decimals).toString(),
    ]),
  );

  const pools = useMemo(
    () =>
      [
        {
          id: '',
          token: {
            ...token,
            id: '',
          },
        } as SwapPool,
      ].concat(swapPools || []),
    [swapPools, token],
  );
  const selectedPool = useMemo(() => pools.find((t) => t.id === address) || pools[0], [address, pools]);

  return { form, amount, mutation, onSubmit, toggle, balanceQuery, depositQuery, selectedPool, pools };
};
