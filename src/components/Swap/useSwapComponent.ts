import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo, useRef, useState } from 'preact/compat';
import { Resolver, useForm, useWatch } from 'react-hook-form';
import { useGlobalState } from '../../GlobalStateProvider';
import { config } from '../../config';
import { storageKeys } from '../../constants/localStorage';
import { debounce } from '../../helpers/function';
import { useBalance } from '../../hooks/useBalance';
import useBoolean from '../../hooks/useBoolean';
import { Asset } from '../../models/Asset';
import { SwapSettings } from '../../models/Swap';
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
  const { walletAccount } = useGlobalState();
  const { address } = walletAccount || {};
  const tokensModal = useState<undefined | 'from' | 'to'>();
  const setTokenModal = tokensModal[1];
  const dropdown = useBoolean();
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
  const { setValue, reset, getValues, handleSubmit, control } = form;
  const from = useWatch({
    control,
    name: 'from',
  });
  const balancesQuery = useBalance(from);
  const { refetch: refetchBalances } = balancesQuery;

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

  const swapMutation = useMutation<unknown, unknown, SwapFormValues>(
    async (data) => new Promise((r) => setTimeout(() => r(data), 6500)),
    {
      onError: () => {
        // ! TODO: display error to user
      },
      onSuccess: () => {
        refetchBalances();
        reset();
        // ! TODO: display response and update balances
      },
    },
  );
  const { mutate: swap } = swapMutation;

  const onSubmit = useMemo(
    () =>
      handleSubmit(async (data) => {
        if (!address) return; // TODO: error alert
        console.log(data, swap);
        /* const time = Math.floor(Date.now() / 1000) + data.deadline;
        const deadline = BigNumber.from(time).toBigInt();
        const slippage = data.slippage ?? defaultValues.slippage;
        const fromAmount = parseEther(`${data.fromAmount}`);
        const toMinAmount = parseEther(`${calcPercentage(data.toAmount, slippage)}`);
        swap({
          args: [fromAmount, toMinAmount, [data.from, data.to], address, deadline],
        }); */
      }),
    [address, handleSubmit, swap],
  );

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
    dropdown,
    balancesQuery,
    swapMutation,
    tokensModal,
    onFromChange,
    onToChange,
    onReverse,
    onSubmit,
    updateStorage,
    from,
  };
};
