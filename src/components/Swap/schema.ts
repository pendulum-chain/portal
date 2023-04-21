import * as Yup from 'yup';
import { SwapFormValues } from './types';

const schema = Yup.object<SwapFormValues>().shape({
  from: Yup.string().required(),
  fromAmount: Yup.number().positive().required(),
  to: Yup.string().required(),
  //slippage: Yup.number().nullable(),
  //deadline: Yup.number().nullable(),
});

export default schema;
