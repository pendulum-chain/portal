import * as Yup from 'yup';
import { IssueFormValues } from '.';
import { transformNumber } from '../../../../helpers/yup';

export function getIssueValidationSchema(maxIssuable: number, balance: number, tokenSymbol?: string) {
  return Yup.object<IssueFormValues>().shape({
    amount: Yup.number()
      .typeError('Value is invalid.')
      .transform(transformNumber)
      .positive('You need to enter a positive number.')
      .required('This field is required.')
      .max(maxIssuable, 'The vault cannot issue that amount of the selected asset.'),
    securityDeposit: Yup.number()
      .transform(transformNumber)
      .max(balance, `Insufficient ${tokenSymbol} to cover the security deposit.`),
  });
}
