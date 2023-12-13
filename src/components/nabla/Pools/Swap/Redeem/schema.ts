import * as Yup from 'yup';
import { transformNumber } from '../../../../../helpers/yup';
import { RedeemLiquidityValues } from './types';

const schema = Yup.object<RedeemLiquidityValues>().shape({
  amount: Yup.number().positive().required().transform(transformNumber),
  slippage: Yup.number().transform(transformNumber).nullable(),
});

export default schema;
