import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { backstopPoolAbi } from '../../../../contracts/BackstopPool';
import { decimalToNative } from '../../../../helpers/parseNumbers';
import { useBalance } from '../../../../hooks/useBalance';
import { useContractWrite } from '../../../../hooks/useContractWrite';
import { createOptions } from '../../../../services/api/helpers';
import { useModalToggle } from '../../../../services/modal';
import schema from './schema';
import { AddLiquidityValues } from './types';

export const useAddLiquidity = (poolAddress: string, tokenAddress: string) => {
  const toggle = useModalToggle();

  const balanceQuery = useBalance(tokenAddress);
  const depositQuery = useBalance(poolAddress);

  const form = useForm<AddLiquidityValues>({
    resolver: yupResolver(schema),
    defaultValues: {},
  });

  const mutation = useContractWrite({
    abi: backstopPoolAbi,
    address: poolAddress,
    fn: async ({ contract, api, walletAccount }, variables: AddLiquidityValues) => {
      const spender = walletAccount.address;
      return await contract.tx
        .deposit(createOptions(api), spender, decimalToNative(variables.amount).toString())
        .signAndSend(spender, { signer: walletAccount.signer });
    },
    onError: () => {
      // TODO: handle error
    },
    onSuccess: () => {
      // TODO: wait for transaction to complete
      balanceQuery.refetch();
      depositQuery.refetch();
    },
  });

  return { form, mutation, toggle, balanceQuery, depositQuery };
};
