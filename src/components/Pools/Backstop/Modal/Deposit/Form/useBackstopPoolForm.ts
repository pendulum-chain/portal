import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import schema from './schema';
import { WithdrawBackstopPoolValues } from './types';

export const useBackstopPoolForm = () => {
  const form = useForm<WithdrawBackstopPoolValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      amount: 0,
      address: '',
    },
  });

  const mutation = useMutation<unknown, unknown, WithdrawBackstopPoolValues>(
    async (data) => {
      console.log(data);
    },
    {
      onSuccess: () => undefined,
    },
  );

  return { form, mutation };
};
