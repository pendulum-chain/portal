import { FC } from 'react';
import { NablaInstanceBackstopPool } from '../../../../hooks/nabla/useNablaInstance';
import { ModalTypes, useModal } from '../../../../services/modal';
import AddLiquidity from './AddLiquidity';
import WithdrawLiquidity from './WithdrawLiquidity';
import { Dialog } from '../../../Dialog';

export type LiquidityModalProps = {
  data?: NablaInstanceBackstopPool;
};

type BasicModalComponent = FC<LiquidityModalProps>;
type AdvancedModalComponent = FC<LiquidityModalProps & { onClose: () => void }>;

type ModalComponent = BasicModalComponent | AdvancedModalComponent;

const modalsUi: Partial<Record<ModalTypes, ModalComponent>> = {
  AddLiquidity: AddLiquidity as AdvancedModalComponent,
  WithdrawLiquidity: WithdrawLiquidity as AdvancedModalComponent,
};

export function BackstopPoolModals() {
  const [{ type, props }, setModal] = useModal<LiquidityModalProps>();

  const Component = type ? modalsUi[type] : undefined;
  const onClose = () => setModal();
  return (
    <Dialog
      onClose={onClose}
      visible={!!Component}
      content={Component ? <Component {...props} onClose={onClose} /> : <></>}
    />
  );
}
