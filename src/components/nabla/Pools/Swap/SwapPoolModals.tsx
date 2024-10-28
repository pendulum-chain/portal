import { ModalTypes, useModal } from '../../../../services/modal';
import { Dialog } from '../../../Dialog';
import { SwapPoolColumn } from './columns';
import AddLiquidity from './AddLiquidity';
import Redeem from './Redeem';
import WithdrawLiquidity from './WithdrawLiquidity';
import { FC } from 'react';

export type LiquidityModalProps = {
  data: SwapPoolColumn;
};

// @todo: remove any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const modalsUi: Partial<Record<ModalTypes, FC<any>>> = {
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
