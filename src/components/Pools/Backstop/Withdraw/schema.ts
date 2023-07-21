import * as Yup from 'yup';
import { transformNumber } from '../../../../helpers/validation';
import { WithdrawLiquidityValues } from './types';

const schema = Yup.object<WithdrawLiquidityValues>().shape({
  amount: Yup.number().positive().required().transform(transformNumber),
});

export default schema;
