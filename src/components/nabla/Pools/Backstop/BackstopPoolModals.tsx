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

const modalsUi: Record<ModalTypes, ModalComponent> = {
  //@todo:
  //@ts-expect-error todo: remove it
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
      content={Component ? <Component {...props} onClose={onClose} /> : <></>}
    />
  );
}
