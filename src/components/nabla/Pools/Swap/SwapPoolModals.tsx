import { FC } from 'react';
import { ModalTypes, useModal } from '../../../../services/modal';
import { Dialog } from '../../../Dialog';
import { SwapPoolColumn } from './columns';
import AddLiquidity from './AddLiquidity';
import Redeem from './Redeem';
import WithdrawLiquidity from './WithdrawLiquidity';

export type LiquidityModalProps = {
  data: SwapPoolColumn;
};

type BasicModalComponent = FC<LiquidityModalProps>;
type AdvancedModalComponent = FC<LiquidityModalProps & { onClose: () => void }>;

type ModalComponent = BasicModalComponent | AdvancedModalComponent;

const modalsUi: Record<ModalTypes, ModalComponent> = {
  AddLiquidity,
  WithdrawLiquidity,
  Redeem,
};

export function SwapPoolModals() {
  const [{ type, props }, setModal] = useModal<LiquidityModalProps>();

  const Component = type ? modalsUi[type] : undefined;
  const onClose = () => setModal();

  if (props && props.data) {
    return (
      <Dialog
        onClose={onClose}
        visible={!!Component}
        content={Component ? <Component {...props} onClose={onClose} /> : <></>}
      />
    );
  }

  return null;
}
