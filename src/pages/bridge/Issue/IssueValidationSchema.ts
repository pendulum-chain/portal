import * as Yup from 'yup';
import { IssueFormValues } from '.';
import { transformNumber } from '../../../helpers/yup';

export function getIssueValidationSchema(max: number) {
  return Yup.object<IssueFormValues>().shape({
    amount: Yup.number()
      .typeError('Value is invalid.')
      .transform(transformNumber)
      .positive()
      .max(max, "You don't have enough balance."),
  });
}
