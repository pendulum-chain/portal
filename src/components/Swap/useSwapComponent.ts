import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useRef, useState } from 'preact/compat';
import { Resolver, useForm, useWatch } from 'react-hook-form';
import { useGlobalState } from '../../GlobalStateProvider';
import { config } from '../../config';
import { cacheKeys } from '../../constants/cache';
import { storageKeys } from '../../constants/localStorage';
import { addresses } from '../../contracts/NablaAddresses';
import { routerAbi } from '../../contracts/Router';
import { calcPercentage } from '../../helpers/calc';
import { debounce } from '../../helpers/function';
import { decimalToNative } from '../../helpers/parseNumbers';
import { useContractWrite } from '../../hooks/useContractWrite';
import { Asset } from '../../models/Asset';
import { SwapSettings } from '../../models/Swap';
import { createOptions } from '../../services/api/helpers';
import { storageService } from '../../services/storage/local';
import schema from './schema';
import { SwapFormValues } from './types';

export interface UseSwapComponentProps {
  from?: string;
  to?: string;
  onChange?: (from: string, to: string) => void;
}

export const defaultValues = config.swap.defaults;
const getInitialValues = () => ({
  ...defaultValues,
  ...storageService.getParsed<SwapSettings>(storageKeys.SWAP_SETTINGS),
});
const storageSet = debounce(storageService.set, 1000);

export const useSwapComponent = (props: UseSwapComponentProps) => {
  const { onChange } = props;
  const hadMountedRef = useRef(false);
  const queryClient = useQueryClient();
  const { walletAccount } = useGlobalState();
  const { address } = walletAccount || {};
  const tokensModal = useState<undefined | 'from' | 'to'>();
  const setTokenModal = tokensModal[1];
  const storageState = useRef(getInitialValues());
  const initFrom = props.from || storageState.current.from;
  const initTo = props.to || storageState.current.to;
  const defaultFormValues = {
    ...storageState.current,
    from: initFrom || '',
    to: initTo || '',
  };
  const form = useForm<SwapFormValues>({
    resolver: yupResolver(schema) as Resolver<SwapFormValues>,
    defaultValues: defaultFormValues,
  });
  const { setValue, reset, getValues, control } = form;
  const from = useWatch({
    control,
    name: 'from',
  });

  const updateStorage = useCallback(
    (newValues: Partial<SwapSettings>) => {
      const prev = getValues();
      const updated = {
        slippage: prev.slippage || defaultValues.slippage,
        deadline: prev.deadline || defaultValues.deadline,
        ...newValues,
      };
      storageSet(storageKeys.SWAP_SETTINGS, updated);
      return updated;
    },
    [getValues],
  );

  const swapMutation = useContractWrite({
    abi: routerAbi,
    address: addresses.foucoco.router, // TODO: get based on chain
    fn: async ({ contract, api, walletAccount }, variables: SwapFormValues) => {
      // ! TODO: complete and test
      const time = Math.floor(Date.now() / 1000) + variables.deadline;
      const deadline = decimalToNative(time);
      const slippage = variables.slippage ?? defaultValues.slippage;
      const fromAmount = decimalToNative(variables.fromAmount).toString();
      const toMinAmount = decimalToNative(calcPercentage(variables.toAmount, slippage)).toString();
      const spender = walletAccount.address;
      return await contract.tx
        .swapExactTokensForTokens(
          createOptions(api),
          spender,
          fromAmount,
          toMinAmount,
          [variables.from, variables.to],
          address,
          deadline,
        )
        .signAndSend(spender, { signer: walletAccount.signer });
    },
    onError: () => {
      // ? log error
    },
    onSuccess: () => {
      // update token balances
      queryClient.refetchQueries({ queryKey: [cacheKeys.walletBalance, getValues('from')], type: 'active' });
      queryClient.refetchQueries({ queryKey: [cacheKeys.walletBalance, getValues('to')], type: 'active' });
      // reset form
      reset();
    },
  });

  const onFromChange = useCallback(
    (a: string | Asset, event = true) => {
      const f = typeof a === 'string' ? a : a.address;
      const prev = getValues();
      const updated = {
        from: f,
        to: prev?.to === f ? prev?.from : prev?.to,
      };
      updateStorage(updated);
      setValue('from', updated.from);
      if (updated.to && prev?.to === f) setValue('to', updated.to);
      if (onChange && event) onChange(updated.from, updated.to);
      setTokenModal(undefined);
    },
    [getValues, onChange, setTokenModal, setValue, updateStorage],
  );

  const onToChange = useCallback(
    (a: string | Asset, event = true) => {
      const t = typeof a === 'string' ? a : a.address;
      const prev = getValues();
      const updated = {
        to: t,
        from: prev?.from === t ? prev?.to : prev?.from,
      };
      updateStorage(updated);
      if (updated.from && prev?.from !== updated.from) setValue('from', updated.from);
      setValue('to', updated.to);
      if (onChange && event) onChange(updated.from, updated.to);
      setTokenModal(undefined);
    },
    [getValues, onChange, setTokenModal, setValue, updateStorage],
  );

  const onReverse = useCallback(() => {
    const prev = getValues();
    if (prev.from) onToChange(prev.from);
    else if (prev.to) onFromChange(prev.to);
  }, [getValues, onFromChange, onToChange]);

  // when props change (url updated)
  useEffect(() => {
    if (hadMountedRef) {
      onFromChange(initFrom || '', false);
      onToChange(initTo || '', false);
    }
    hadMountedRef.current = true;
  }, [initFrom, initTo, onFromChange, onToChange]);

  return {
    form,
    swapMutation,
    tokensModal,
    onFromChange,
    onToChange,
    onReverse,
    updateStorage,
    from,
    progressClose: () => {
      swapMutation.reset();
    },
  };
};
