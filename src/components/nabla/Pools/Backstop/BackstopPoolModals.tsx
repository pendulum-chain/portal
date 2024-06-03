import { FunctionalComponent } from 'preact';
import { NablaInstanceBackstopPool } from '../../../../hooks/nabla/useNablaInstance';
import { ModalTypes, useModal } from '../../../../services/modal';
import AddLiquidity from './AddLiquidity';
import WithdrawLiquidity from './WithdrawLiquidity';
import { Dialog } from '../../../../pages/collators/dialogs/Dialog';

export type LiquidityModalProps = {
  data?: NablaInstanceBackstopPool;
  onClose: () => void;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const modalsUi: Partial<Record<ModalTypes, FunctionalComponent<any>>> = {
  AddLiquidity,
  WithdrawLiquidity,
};

export function BackstopPoolModals() {
  const [{ type, props }, setModal] = useModal<LiquidityModalProps>();

  const Component = type ? modalsUi[type] : undefined;
  const onClose = () => setModal();
  return (
    <Dialog
      onClose={onClose}
      visible={!!Component}
      actions={<></>}
      content={Component ? <Component {...props} onClose={onClose} /> : <></>}
    />
  );
}
