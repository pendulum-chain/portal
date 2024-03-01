import { useMemo, useState } from 'preact/hooks';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Modal } from 'react-daisyui';
import { nativeToDecimal } from '../../../../shared/parseNumbers/metric';
import SuccessDialogIcon from '../../../../assets/dialog-status-success';
import Amount from '../../../../components/Form/Amount';
import { useGlobalState } from '../../../../GlobalStateProvider';
import gasolinePump from '../../../../assets/gasoline-pump.svg';
import { getUnlockValidatiomSchema } from './UnlockValidationSchema';
import { Dialog } from '../Dialog';

interface UnlockDialogProps {
  onClose: () => void;
  visible: boolean;
  userStakeBalance?: string;
}

export interface UnlockFormValues {
  amount: number;
}

enum UnlockStep {
  Confirm = 0,
  Success = 1,
}

export function UnlockDialog(props: UnlockDialogProps): JSX.Element {
  const { userStakeBalance = '0', visible, onClose } = props;

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

  const content = useMemo(() => {
    switch (step) {
      case UnlockStep.Confirm:
        return (
          <div className="rounded-lg flex flex-col items-center w-full">
            <div className="w-full flex justify-end items-center text-sm dark:text-neutral-400 text-neutral-500 mb-1">
              <img src={gasolinePump} alt="gasoline icon" className="h-full w-auto" width={42} height={42} />
              <span className="ml-1">{'<'}$0.01</span>
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
  }, [step, formState, register, setValue, userStakeBalance]);

  const getButtonAction = (step: UnlockStep) => {
    switch (step) {
      case UnlockStep.Confirm:
        return () => {
          setStep(UnlockStep.Success);
        };
      case UnlockStep.Success:
        return onClose;
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
