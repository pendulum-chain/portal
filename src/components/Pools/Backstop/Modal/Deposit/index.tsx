import { BackstopPool } from '../../../../../models/BackstopPool';
import BackstopPoolForm from './Form';

export type DepositProps = {
  pool: BackstopPool;
};

const Deposit = ({ pool }: DepositProps): JSX.Element | null => {
  return (
    <div className="py-4">
      <BackstopPoolForm pool={pool} />
    </div>
  );
};
export default Deposit;
