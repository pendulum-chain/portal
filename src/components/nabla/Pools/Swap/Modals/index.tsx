import { FunctionalComponent } from 'preact';
import { Modal } from 'react-daisyui';
import { useModal } from '../../../../../services/modal';
import ModalCloseButton from '../../../../Button/ModalClose';
import AddLiquidity from '../AddLiquidity';
import Redeem from '../Redeem';
import WithdrawLiquidity from '../WithdrawLiquidity';
import { LiquidityModalProps } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const modalsUi: Record<number, FunctionalComponent<any>> = {
  2: AddLiquidity,
  3: WithdrawLiquidity,
  4: Redeem,
};

const PoolsModals = () => {
  const [{ type, props }, setModal] = useModal<LiquidityModalProps>();

  const Component = type ? modalsUi[type] : undefined;
  return (
    <>
      <Modal open={!!Component}>
        <Modal.Header className="mb-0">
          <ModalCloseButton onClick={() => setModal()} />
        </Modal.Header>
        <Modal.Body>{Component ? <Component {...props} /> : null}</Modal.Body>
      </Modal>
    </>
  );
};
export default PoolsModals;
