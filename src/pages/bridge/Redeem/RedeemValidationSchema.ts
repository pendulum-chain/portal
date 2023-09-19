import * as Yup from 'yup';
import { IssueFormValues } from '../../../components/Form/From/index';
import { transformNumber } from '../../../helpers/yup';

export function getIssueValidationSchema(max: number) {
  return Yup.object<IssueFormValues>().shape({
    amount: Yup.number()
      .typeError('Value is invalid.')
      .transform(transformNumber)
      .min(10)
      .max(max, "The vault doesn't have enough issuable tokens."),
  });
}
