import { useEffect, useMemo, useState } from 'preact/hooks';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from 'react-daisyui';
import Big from 'big.js';

import { nativeToDecimal } from '../../../../shared/parseNumbers/metric';
import SuccessDialogIcon from '../../../../assets/dialog-status-success';
import Amount from '../../../../components/Form/Amount';
import { useGlobalState } from '../../../../GlobalStateProvider';
import gasolinePump from '../../../../assets/gasoline-pump.svg';

import { Dialog } from '../Dialog';

import { getUnlockValidatiomSchema } from './UnlockValidationSchema';

interface UnlockDialogProps {
  onUnlock: () => void;
  onClose: () => void;
  visible: boolean;
  unlockSuccess: boolean;
  userStakeBalance?: string;
  gasFee: Big;
}

export interface UnlockFormValues {
  amount: number;
}

enum UnlockStep {
  Confirm = 0,
  Success = 1,
}

export function UnlockDialog(props: UnlockDialogProps): JSX.Element {
  const { userStakeBalance = '0', visible, onClose, onUnlock, unlockSuccess, gasFee } = props;

  const [step, setStep] = useState<UnlockStep>(UnlockStep.Confirm);
  const [loading, setLoading] = useState<boolean>(false);

  const { walletAccount } = useGlobalState();
  const balance = nativeToDecimal(userStakeBalance).toNumber();

  const form = useForm<UnlockFormValues>({
    resolver: yupResolver(getUnlockValidatiomSchema(balance)),
    defaultValues: {
      amount: parseFloat(balance.toFixed(2)),
    },
  });

  const { formState, register, setValue } = form;

  const showGasFee = useMemo(() => {
    const fee = nativeToDecimal(gasFee.toString()).toNumber();
    if (fee < 0.01) return '<0.01';
    return fee;
  }, [gasFee]);

  const content = useMemo(() => {
    switch (step) {
      case UnlockStep.Confirm:
        return (
          <div className="rounded-lg flex flex-col items-center w-full">
            <div className="w-full flex justify-end items-center text-sm dark:text-neutral-400 text-neutral-500 mb-1">
              <img src={gasolinePump} alt="gasoline icon" className="h-full w-auto" width={42} height={42} />
              <span className="ml-1">${showGasFee}</span>
            </div>
            <form className="flex flex-col">
              <Amount
                register={register('amount')}
                max={nativeToDecimal(userStakeBalance).toNumber()}
                setValue={(n: number) => setValue('amount', n)}
                error={formState.errors.amount?.message?.toString()}
                fullMax={true}
              />
            </form>
          </div>
        );
      case UnlockStep.Success:
        return (
          <div className="flex flex-col items-center justify-between">
            <SuccessDialogIcon />
            <div className="mt-4" />
            <h2 className="text-xl">Succesfully unlocked!</h2>
            <p className="text-sm dark:text-neutral-400 text-neutral-500 mt-2 mx-4 sm:mx-16 text-center">
              You have successfully staked X PEN tokens to &quot;Collator Name&quot;
            </p>
          </div>
        );
    }
  }, [step, formState, register, setValue, userStakeBalance, showGasFee]);

  const onConfirm = () => {
    setLoading(true);

    onUnlock();
  };

  useEffect(() => {
    if (unlockSuccess) {
      setLoading(false);
      setStep(UnlockStep.Success);
    }
  }, [unlockSuccess]);

  const getButtonAction = (step: UnlockStep) => {
    switch (step) {
      case UnlockStep.Confirm:
        return onConfirm;

      case UnlockStep.Success:
        return () => {
          setStep(UnlockStep.Confirm);
          setLoading(false);
          onClose();
        };
    }
  };

  const getModalHeader = (step: UnlockStep) => {
    switch (step) {
      case UnlockStep.Confirm:
        return 'Unlock staked tokens';
      case UnlockStep.Success:
        return '';
    }
  };

  const actions = (
    <>
      <Button
        color="primary"
        loading={loading}
        onClick={getButtonAction(step)}
        disabled={!walletAccount}
        fullWidth={true}
      >
        Claim
      </Button>
    </>
  );

  return (
    <Dialog onClose={onClose} headerText={getModalHeader(step)} content={content} actions={actions} visible={visible} />
  );
}
