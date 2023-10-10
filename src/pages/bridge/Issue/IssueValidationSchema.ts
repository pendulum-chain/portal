import * as Yup from 'yup';
import { IssueFormValues } from '.';
import { transformNumber } from '../../../helpers/yup';

export function getIssueValidationSchema(maxIssuable: number, maxSecurityDeposit: number) {
  return Yup.object<IssueFormValues>().shape({
    amount: Yup.number()
      .typeError('Value is invalid.')
      .transform(transformNumber)
      .positive('You need to enter a positive number.')
      .max(maxIssuable, 'The vault cannot issue that amount of the selected asset.'),
    securityDeposit: Yup.number().max(
      maxSecurityDeposit,
      "Your don't have enough balance to pay for the Security Deposit.",
    ),
  });
}
