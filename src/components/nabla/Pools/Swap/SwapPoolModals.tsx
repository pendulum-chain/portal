import { FunctionalComponent } from 'preact';
import { Modal } from 'react-daisyui';
import { ModalTypes, useModal } from '../../../../services/modal';
import ModalCloseButton from '../../../Button/ModalClose';
import AddLiquidity from './AddLiquidity';
import Redeem from './Redeem';
import WithdrawLiquidity from './WithdrawLiquidity';

import { SwapPoolColumn } from './columns';

export type LiquidityModalProps = {
  data?: SwapPoolColumn;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const modalsUi: Partial<Record<ModalTypes, FunctionalComponent<any>>> = {
  AddLiquidity: AddLiquidity,
  WithdrawLiquidity: WithdrawLiquidity,
  Redeem: Redeem,
};

export function SwapPoolModals() {
  const [{ type, props }, setModal] = useModal<LiquidityModalProps>();

  const Component = type ? modalsUi[type] : undefined;
  return (
    <>
      <Modal className="bg-[--bg-modal]" open={!!Component}>
        <Modal.Header className="mb-0">
          <ModalCloseButton onClick={() => setModal()} />
        </Modal.Header>
        <Modal.Body>{Component ? <Component {...props} /> : null}</Modal.Body>
      </Modal>
    </>
  );
}
