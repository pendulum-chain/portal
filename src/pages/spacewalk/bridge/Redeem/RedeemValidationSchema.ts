import * as Yup from 'yup';
import { RedeemFormValues } from '.';
import { StellarPublicKeyPattern } from '../../../../helpers/stellar';
import { transformNumber } from '../../../../helpers/yup';

export function getRedeemValidationSchema(maxRedeemable: number, balance: number) {
  return Yup.object<RedeemFormValues>().shape({
    amount: Yup.number()
      .typeError('Value is invalid.')
      .transform(transformNumber)
      .positive('You need to enter a positive number.')
      .max(maxRedeemable, "The vault doesn't have enough redeemable tokens.")
      .max(balance, "You don't have enough balance."),
    to: Yup.string()
      .required('This field is required.')
      .matches(StellarPublicKeyPattern, 'The supplied address is not a valid Stellar address.'),
  });
}
