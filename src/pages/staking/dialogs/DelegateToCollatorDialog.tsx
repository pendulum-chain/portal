import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useState } from 'preact/hooks';
import { Button } from 'react-daisyui';
import { useForm } from 'react-hook-form';
import ChainLogo from '../../../assets/ChainLogo';
import Amount from '../../../components/Form/Amount';
import { PublicKey } from '../../../components/PublicKey';
import {
  ParachainStakingCandidate,
  ParachainStakingInflationInflationInfo,
} from '../../../hooks/staking/useStakingPallet';
import { nativeToDecimal } from '../../../shared/parseNumbers/metric';
import { DelegationMode } from './ExecuteDelegationDialogs';
import { FormValues, getStakingValidationSchema } from './ValidationSchema';
import { Dialog } from './Dialog';

interface DelegateToCollatorDialogProps {
  availableBalance?: string;
  collator?: ParachainStakingCandidate;
  inflationInfo?: ParachainStakingInflationInflationInfo;
  minDelegatorStake: string;
  tokenSymbol: string;
  visible: boolean;
  mode: DelegationMode;
  onClose?: () => void;
  onSubmit: ({ amount }: FormValues) => void;
}

function DelegateToCollatorDialog(props: DelegateToCollatorDialogProps) {
  const {
    availableBalance = '0',
    collator,
    inflationInfo,
    minDelegatorStake,
    tokenSymbol,
    visible,
    onClose,
    onSubmit,
    mode = 'joining',
  } = props;

  const [error, setError] = useState<string>('');
  const annual = inflationInfo?.delegator.rewardRate.annual;

  const CollatorInfo = useMemo(
    () =>
      collator ? (
        <div className="flex flex-col bg-base-300 rounded-md xs:flex-row xs:items-center justify-between text-right p-5 gap-2">
          <div className="flex flex-row items-center">
            <ChainLogo className="w-8 h-8 mr-2" width="50" height="50" />
            <PublicKey variant="shorter" publicKey={collator.id} />
          </div>
          <div>
            <div className="text-lg text-accent-content font-semibold">APR {annual || '0.00%'}</div>
            <div className="text-sm text-neutral-content" hidden={mode === 'delegatingMore'}>
              Min Bond {nativeToDecimal(minDelegatorStake).toFixed(4)} {tokenSymbol}
            </div>
          </div>
        </div>
      ) : (
        <div />
      ),
    [annual, collator, minDelegatorStake, mode, tokenSymbol],
  );

  const titleAction = useMemo(() => (mode === 'unstaking' ? 'Unstake' : 'Stake'), [mode]);
  const max = nativeToDecimal(availableBalance).toNumber();
  const { handleSubmit, watch, register, formState, setValue } = useForm<FormValues>({
    resolver: yupResolver(getStakingValidationSchema(max)),
  });

  // We watch the amount because we need to re-render the FeeBox constantly
  watch('amount');

  const onCloseDialog = () => {
    setError('');
    setValue('amount', undefined);
    if (onClose) onClose();
  };

  const content = useMemo(
    () => (
      <>
        {CollatorInfo}
        <div className="mt-4" />
        <Amount
          register={register('amount')}
          setValue={(n: number) => setValue('amount', n)}
          error={formState.errors.amount?.message?.toString()}
          max={max}
          fullMax={mode === 'unstaking'}
        />
      </>
    ),
    [CollatorInfo, formState.errors.amount?.message, max, mode, register, setValue],
  );

  const actions = useMemo(
    () => (
      <Button className="px-6 w-full" type="submit" color="primary" disabled={!!error}>
        {titleAction}
      </Button>
    ),
    [error, titleAction],
  );

  const dialogForm = {
    onSubmit: handleSubmit(onSubmit),
    className: 'px-5 flex flex-col',
  };

  return (
    <Dialog
      headerText={titleAction}
      visible={visible}
      onClose={onCloseDialog}
      content={content}
      actions={actions}
      form={dialogForm}
    />
  );
}

export default DelegateToCollatorDialog;
