import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { cacheKeys } from '../../../../constants/cache';
import { swapPoolAbi } from '../../../../contracts/nabla/SwapPool';
import { useGetAppDataByTenant } from '../../../../hooks/useGetAppDataByTenant';
import { useModalToggle } from '../../../../services/modal';
import { decimalToNative, FixedU128Decimals } from '../../../../shared/parseNumbers';
import { useContractBalance } from '../../../../shared/useContractBalance';
import { useContractWrite } from '../../../../shared/useContractWrite';
import schema from './schema';
import { AddLiquidityValues } from './types';

export const useAddLiquidity = (poolAddress: string, tokenAddress: string) => {
  const queryClient = useQueryClient();
  const { indexerUrl } = useGetAppDataByTenant('nabla').data || {};
  const toggle = useModalToggle();

  const balanceQuery = useContractBalance({ contractAddress: tokenAddress, decimals: FixedU128Decimals });
  const depositQuery = useContractBalance({
    contractAddress: poolAddress,
    abi: swapPoolAbi,
    decimals: FixedU128Decimals,
  });

  /* const { api } = useNodeInfoState().state;
  const { address } = useGlobalState().walletAccount || {};
  useEffect(() => {
    const run = async () => {
      if (!api || !address) return;
      const contract = new ContractPromise(api, swapPoolAbi, poolAddress);
      const response = await contract.query.balanceOf(address, createReadOptions(api), address);
      console.log(
        response,
        response?.output?.toString(),
        nativeToDecimal(parseFloat(response?.output?.toString() || '0'), 18).toNumber(),
      );
    };
    run();
  }, [api, address, poolAddress]); */

  const form = useForm<AddLiquidityValues>({
    resolver: yupResolver(schema),
    defaultValues: {},
  });

  const mutation = useContractWrite({
    abi: swapPoolAbi,
    address: poolAddress,
    method: 'deposit',
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

  const onSubmit = form.handleSubmit((variables: AddLiquidityValues) =>
    mutation.mutate([decimalToNative(variables.amount, FixedU128Decimals).toString()]),
  );

  return { form, mutation, onSubmit, toggle, balanceQuery, depositQuery };
};
