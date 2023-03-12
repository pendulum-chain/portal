import { FunctionalComponent, VNode } from 'preact';
import { Button, Modal } from 'react-daisyui';
import { useModal } from '../../../services/modal';
import AddLiquidity from '../AddLiquidity';
import PoolOverview from '../Overview';
import WithdrawLiquidity from '../WithdrawLiquidity';

export const ModalTypes = {
  Overview: 1,
  AddLiquidity: 2,
  WithdrawLiquidity: 3,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const modalsUi: Record<number, FunctionalComponent<any>> = {
  1: PoolOverview,
  2: AddLiquidity,
  3: WithdrawLiquidity,
};

const PoolsModals = (): VNode | null => {
  const [{ type, props }, setModal] = useModal();

  const Component = type ? modalsUi[type] : undefined;
  return (
    <>
      <Modal open={!!Component}>
        <Modal.Header className="mb-0">
          <Button
            size="sm"
            shape="circle"
            className="absolute right-2 top-2"
            onClick={() => setModal()}
            type="button"
          >
            ✕
          </Button>
        </Modal.Header>
        <Modal.Body>{Component && <Component {...props} />}</Modal.Body>
      </Modal>
    </>
  );
};
export default PoolsModals;
