import { SwapPool } from '../../../../../../gql/graphql';
import { nativeToDecimal } from '../../../../../shared/parseNumbers';

export interface BackstopPoolRedeemProps {
  pool: SwapPool;
  amount?: number;
  onSubmit: () => void;
}

const BackstopPoolRedeem = ({ pool, amount, onSubmit }: BackstopPoolRedeemProps): JSX.Element | null => {
  const { backstop } = pool;
  if (!amount || !backstop.reserves || nativeToDecimal(backstop.reserves, pool.token.decimals).toNumber() <= amount) {
    return null;
  }
  return (
    <div className="text-center">
      <button type="button" onClick={onSubmit} className="btn btn-link mb-2 text-center">
        Redeem from backstop pool
      </button>
    </div>
  );
};
export default BackstopPoolRedeem;
