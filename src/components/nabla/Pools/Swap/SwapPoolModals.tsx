import { FunctionalComponent } from 'preact';
import { Modal } from 'react-daisyui';
import { useModal } from '../../../../services/modal';
import ModalCloseButton from '../../../Button/ModalClose';
import AddLiquidity from './AddLiquidity';
import Redeem from './Redeem';
import WithdrawLiquidity from './WithdrawLiquidity';

import { SwapPoolColumn } from './columns';

export const ModalTypes = {
  AddLiquidity: 2,
  WithdrawLiquidity: 3,
  Redeem: 4,
};

export type LiquidityModalProps = {
  data?: SwapPoolColumn;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const modalsUi: Record<number, FunctionalComponent<any>> = {
  2: AddLiquidity,
  3: WithdrawLiquidity,
  4: Redeem,
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
