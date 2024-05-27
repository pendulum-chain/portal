import { FunctionalComponent } from 'preact';
import { Modal } from 'react-daisyui';

import { NablaInstanceBackstopPool } from '../../../../hooks/nabla/useNablaInstance';
import { ModalTypes, useModal } from '../../../../services/modal';
import ModalCloseButton from '../../../Button/ModalClose';
import AddLiquidity from './AddLiquidity';
import WithdrawLiquidity from './WithdrawLiquidity';

export type LiquidityModalProps = {
  data?: NablaInstanceBackstopPool;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const modalsUi: Partial<Record<ModalTypes, FunctionalComponent<any>>> = {
  AddLiquidity: AddLiquidity,
  WithdrawLiquidity: WithdrawLiquidity,
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
