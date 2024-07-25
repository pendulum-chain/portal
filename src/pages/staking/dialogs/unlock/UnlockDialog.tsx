import { useEffect, useMemo, useState } from 'preact/hooks';
import { FC } from 'preact/compat';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from 'react-daisyui';
import Big from 'big.js';

import { nativeToDecimal } from '../../../../shared/parseNumbers/metric';
import { useGlobalState } from '../../../../GlobalStateProvider';
import { Dialog } from '../../../../components/Dialog';

import { SuccessStep } from '../steps/SuccessStep';

import { getUnlockValidationSchema } from './UnlockValidationSchema';
import { UnlockConfirmStep } from './UnlockConfirmStep';

interface UnlockDialogProps {
  onUnlock: () => void;
  onClose: () => void;
  visible: boolean;
  unlockSuccess: boolean;
  userAvailableBalanceForUnlock: Big;
  gasFee: Big;
}

export interface UnlockFormValues {
  amount: number;
}

enum UnlockStep {
  Confirm = 0,
  Success = 1,
}

export const UnlockDialog: FC<UnlockDialogProps> = ({
  userAvailableBalanceForUnlock,
  visible,
  onClose,
  onUnlock,
  unlockSuccess,
  gasFee,
}): JSX.Element => {
  const [step, setStep] = useState<UnlockStep>(UnlockStep.Confirm);
  const [loading, setLoading] = useState<boolean>(false);
  const { walletAccount } = useGlobalState();
  const balance = nativeToDecimal(userAvailableBalanceForUnlock).toNumber();

  const form = useForm<UnlockFormValues>({
    resolver: yupResolver(getUnlockValidationSchema(balance)),
    defaultValues: {
      amount: balance,
    },
  });

  const { formState, register } = form;

  const showGasFee = useMemo((): string => {
    const fee = nativeToDecimal(gasFee.toString()).toNumber();
    if (fee < 0.01) return '<0.01';
    return fee.toString();
  }, [gasFee]);

  const content = useMemo(() => {
    switch (step) {
      case UnlockStep.Confirm:
        return (
          <UnlockConfirmStep
            {...{
              register: register('amount'),
              balance,
              gasFee: showGasFee,
              error: formState.errors.amount?.message?.toString(),
            }}
          />
        );
      case UnlockStep.Success:
        return (
          <SuccessStep
            {...{
              title: 'Successfully unlocked!',
              description: `You have successfully unlocked ${
                nativeToDecimal(userAvailableBalanceForUnlock).toNumber() || 0
              } PEN tokens.`,
            }}
          />
        );
    }
  }, [step, formState, register, userAvailableBalanceForUnlock, showGasFee, balance]);

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
        return 'Unlock unstaked tokens';
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
        disabled={!walletAccount || loading}
        fullWidth={true}
      >
        {loading ? '' : 'Claim'}
      </Button>
    </>
  );

  return (
    <Dialog onClose={onClose} headerText={getModalHeader(step)} content={content} actions={actions} visible={visible} />
  );
};
