import * as Yup from 'yup';
import { WithdrawLiquidityValues } from './types';

const schema = Yup.object<WithdrawLiquidityValues>().shape({
  amount: Yup.number().positive().required(),
});

export default schema;
