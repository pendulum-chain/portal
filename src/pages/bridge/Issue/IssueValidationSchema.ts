import * as Yup from 'yup';
import { IssueFormValues } from '.';
import { transformNumber } from '../../../helpers/yup';

export function getIssueValidationSchema(maxIssuable: number) {
  return Yup.object<IssueFormValues>().shape({
    amount: Yup.number()
      .typeError('Value is invalid.')
      .transform(transformNumber)
      .positive()
      .max(maxIssuable, 'The vault cannot issue that amount of the selected asset.'),
  });
}
