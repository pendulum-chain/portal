import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useModalToggle } from '../../../../services/modal';
import schema from './schema';
import { WithdrawLiquidityValues } from './types';

export const useWithdrawLiquidity = (_address: string) => {
  const toggle = useModalToggle();

  const form = useForm<WithdrawLiquidityValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      amount: 0,
    },
  });

  const mutation = useMutation<unknown, unknown, WithdrawLiquidityValues>(
    async (data) => {
      console.log(data);
    },
    {
      onSuccess: () => {
        toggle();
      },
    },
  );

  return { form, mutation, toggle };
};
