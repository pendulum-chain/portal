import { useCallback, useMemo } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useQueryClient } from '@tanstack/react-query';
import { useForm, useWatch } from 'react-hook-form';
import { Big } from 'big.js';

import { cacheKeys } from '../../../../../constants/cache';
import { backstopPoolAbi } from '../../../../../contracts/nabla/BackstopPool';
import { useModalToggle } from '../../../../../services/modal';
import { decimalToRaw } from '../../../../../shared/parseNumbers/metric';
import { erc20WrapperAbi } from '../../../../../contracts/nabla/ERC20Wrapper';
import { useErc20ContractBalance } from '../../../../../hooks/nabla/useErc20ContractBalance';
import { useContractWrite } from '../../../../../hooks/nabla/useContractWrite';
import { refetchDelayed } from '../../../../../helpers/query';

interface AddLiquidityValues {
  amount: string;
}

const schema = Yup.object<AddLiquidityValues>().shape({
  amount: Yup.string().required(),
});

export const useAddLiquidity = (
  backstopPoolAddress: string,
  tokenAddress: string,
  poolTokenDecimals: number,
  lpTokenDecimals: number,
) => {
  const queryClient = useQueryClient();
  const toggle = useModalToggle();

  const balanceQuery = useErc20ContractBalance(erc20WrapperAbi, {
    contractAddress: tokenAddress,
    decimals: poolTokenDecimals,
  });

  const depositQuery = useErc20ContractBalance(backstopPoolAbi, {
    contractAddress: backstopPoolAddress,
    decimals: lpTokenDecimals,
  });

  const form = useForm<AddLiquidityValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      amount: undefined,
    },
  });

  const mutation = useContractWrite({
    abi: backstopPoolAbi,
    address: backstopPoolAddress,
    method: 'deposit',
    mutateOptions: {
      onError: () => {
        // ? log error - alert not needed as the transaction modal displays the error
      },
      onSuccess: () => {
        form.reset();
        balanceQuery.refetch();
        depositQuery.refetch();
        refetchDelayed(queryClient, [cacheKeys.nablaInstance]);
      },
    },
  });

  const amountString = useWatch({
    control: form.control,
    name: 'amount',
    defaultValue: '0',
  });

  const { mutate } = mutation;
  const onSubmit = useCallback(
    (variables: AddLiquidityValues) => {
      if (!variables.amount) return;
      return mutate([decimalToRaw(variables.amount, poolTokenDecimals).round(0, 0).toString()]);
    },
    [mutate, poolTokenDecimals],
  );

  const amountBigDecimal = useMemo(() => {
    try {
      return new Big(amountString);
    } catch {
      return undefined;
    }
  }, [amountString]);

  return {
    form,
    amountString,
    amountBigDecimal,
    mutation,
    balanceQuery,
    depositQuery,
    onSubmit: form.handleSubmit(onSubmit),
    toggle,
  };
};
