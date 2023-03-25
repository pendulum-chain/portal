import { Button, Modal } from 'react-daisyui';
import { joinOn } from '../../../../helpers/array';
import { BackstopPool } from '../../../../models/BackstopPool';
import BackstopPoolForm from '../Form';

export type ModalProps = {
  type?: 'deposit' | 'withdraw';
  pool?: BackstopPool;
  onClose: () => void;
};

const BackstopPoolModal = ({ pool, onClose }: ModalProps): JSX.Element | null => {
  return (
    <Modal open={!!pool}>
      <Modal.Header className="mb-0">
        <Button size="sm" shape="circle" className="absolute right-2 top-2" onClick={onClose} type="button">
          ✕
        </Button>
        <h3 className="text-2xl font-normal">{joinOn(pool?.assets, 'name')}</h3>
      </Modal.Header>
      <Modal.Body>
        {!!pool && (
          <div className="py-4">
            <BackstopPoolForm pool={pool} />
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};
export default BackstopPoolModal;
