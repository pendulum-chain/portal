import * as Yup from 'yup';
import { WithdrawBackstopPoolValues } from './types';

const schema = Yup.object<WithdrawBackstopPoolValues>().shape({
  amount: Yup.number().min(0).max(100).required(),
  address: Yup.string().min(1).required(),
});

export default schema;
