import * as Yup from 'yup';
import { UnlockFormValues } from './UnlockDialog';
import { transformNumber } from '../../../../helpers/yup';

export function getUnlockValidatiomSchema(balance: number) {
  return Yup.object<UnlockFormValues>().shape({
    amount: Yup.number()
      .typeError('Value is invalid.')
      .transform(transformNumber)
      .positive('You need to enter a positive number.')
      .max(balance, "You don't have enough balance."),
  });
}
