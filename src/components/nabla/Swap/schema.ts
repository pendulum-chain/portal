import * as Yup from 'yup';
import { transformNumber } from '../../../helpers/yup';

export type SwapFormValues = {
  from: string;
  fromAmount: number;
  to: string;
  toAmount: number;
  slippage: number | undefined;
  deadline: number;
};

const schema = Yup.object<SwapFormValues>().shape({
  from: Yup.string().min(5).required(),
  fromAmount: Yup.number().positive().required().transform(transformNumber),
  to: Yup.string().min(5).required(),
  toAmount: Yup.number().required(),
  slippage: Yup.number().nullable().transform(transformNumber),
  deadline: Yup.number().nullable().transform(transformNumber),
});

export default schema;
