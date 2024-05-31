import * as Yup from 'yup';
import { transformNumber } from '../../../helpers/yup';

export type SwapFormValues = {
  from: string;
  fromAmount: string;
  to: string;
  toAmount: string;
  slippage: number | undefined;
  deadline: number;
};

const schema = Yup.object<SwapFormValues>().shape({
  from: Yup.string().min(5).required(),
  fromAmount: Yup.string().required(),
  to: Yup.string().min(5).required(),
  toAmount: Yup.string().required(),
  slippage: Yup.number().nullable().transform(transformNumber),
  deadline: Yup.number().nullable().transform(transformNumber),
});

export default schema;
