import { FunctionalComponent } from 'preact';
import { ModalTypes, useModal } from '../../../../services/modal';
import { Dialog } from '../../../../pages/collators/dialogs/Dialog';
import { SwapPoolColumn } from './columns';
import AddLiquidity from './AddLiquidity';
import Redeem from './Redeem';
import WithdrawLiquidity from './WithdrawLiquidity';

export type LiquidityModalProps = {
  data: SwapPoolColumn;
  onClose: () => void;
};

const modalsUi: Partial<Record<ModalTypes, FunctionalComponent<LiquidityModalProps>>> = {
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
        actions={<></>}
        content={Component ? <Component {...props} onClose={onClose} /> : <></>}
      />
    );
  }

  return null;
}
