import { Button, Modal } from 'react-daisyui';
import { joinOn } from '../../../../helpers/array';
import { BackstopPool } from '../../../../models/BackstopPool';
import Deposit from './Deposit';
import Withdraw from './Withdraw';

export type ModalProps = {
  type?: 'deposit' | 'withdraw';
  pool?: BackstopPool;
  onClose: () => void;
};

const BackstopPoolModal = ({ pool, type, onClose }: ModalProps): JSX.Element | null => {
  const isDeposit = type === 'deposit';
  return (
    <Modal open={!!pool}>
      <Modal.Header className="mb-0">
        <Button size="sm" shape="circle" className="absolute right-2 top-2" onClick={onClose} type="button">
          ✕
        </Button>
        <h3 className="text-2xl font-normal">
          {isDeposit ? 'Deposit' : 'Withdraw'}: {joinOn(pool?.assets, 'symbol')}
        </h3>
      </Modal.Header>
      <Modal.Body>{!!pool && (isDeposit ? <Deposit pool={pool} /> : <Withdraw pool={pool} />)}</Modal.Body>
    </Modal>
  );
};
export default BackstopPoolModal;