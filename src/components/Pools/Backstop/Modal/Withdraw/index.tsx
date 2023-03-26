import { BackstopPool } from '../../../../../models/BackstopPool';
import BackstopPoolForm from './Form';

export type WithdrawProps = {
  pool: BackstopPool;
};

const Withdraw = ({ pool }: WithdrawProps): JSX.Element | null => {
  return (
    <div className="py-4">
      <BackstopPoolForm pool={pool} />
    </div>
  );
};
export default Withdraw;
