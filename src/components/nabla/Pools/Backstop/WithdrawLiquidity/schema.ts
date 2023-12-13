import * as Yup from 'yup';
import { transformNumber } from '../../../../../helpers/yup';
import { WithdrawLiquidityValues } from './types';

const schema = Yup.object<WithdrawLiquidityValues>().shape({
  address: Yup.string().nullable().min(5),
  slippage: Yup.number().nullable().transform(transformNumber),
  amount: Yup.number().positive().required().transform(transformNumber),
});

export default schema;
