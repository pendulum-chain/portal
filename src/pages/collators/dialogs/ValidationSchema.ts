import * as Yup from 'yup';
import { transformNumber } from '../../../helpers/yup';

export type FormValues = {
  amount?: number;
};

export function getStakingValidationSchema(max: number) {
  return Yup.object<FormValues>().shape({
    amount: Yup.number()
      .typeError('Value is invalid.')
      .transform(transformNumber)
      .positive('You need to enter a positive number.')
      .required('This field is required.')
      .max(max, 'Amount is higher than available.'),
  });
}

export function getClaimingValidationSchema(max: number) {
  return Yup.object<FormValues>().shape({
    amount: Yup.number()
      .typeError('Value is invalid.')
      .transform(transformNumber)
      .positive('You need to enter a positive number.')
      .required('This field is required.')
      .max(max, 'Amount is higher than available.'),
  });
}
