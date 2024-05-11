import { FunctionalComponent } from 'preact';
import { Modal } from 'react-daisyui';

import { NablaInstanceBackstopPool } from '../../../../hooks/nabla/useNablaInstance';
import { useModal } from '../../../../services/modal';
import ModalCloseButton from '../../../Button/ModalClose';
import AddLiquidity from './AddLiquidity';
import WithdrawLiquidity from './WithdrawLiquidity';

export const ModalTypes = {
  AddLiquidity: 2,
  WithdrawLiquidity: 3,
};

export type LiquidityModalProps = {
  data?: NablaInstanceBackstopPool;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const modalsUi: Record<number, FunctionalComponent<any>> = {
  2: AddLiquidity,
  3: WithdrawLiquidity,
};

export function BackstopPoolModals() {
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
