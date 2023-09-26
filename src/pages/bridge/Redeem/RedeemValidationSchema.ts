import Big from 'big.js';
import * as Yup from 'yup';
import { RedeemFormValues } from '.';
import { StellarPublicKeyPattern, isCompatibleStellarAmount } from '../../../helpers/stellar';
import { transformNumber } from '../../../helpers/yup';

export function getRedeemValidationSchema(max: number) {
  return Yup.object<RedeemFormValues>().shape({
    amount: Yup.number()
      .typeError('Value is invalid.')
      .transform(transformNumber)
      .min(10, 'The specified amount is below the minimum (10).')
      .max(max, "The vault doesn't have enough issuable tokens."),
    to: Yup.string()
      .required('The Stellar target address is required.')
      .matches(StellarPublicKeyPattern, 'The supplied address is not a valid Stellar address.'),
  });
}

function validate(value: string, maxIssuable: number) {
  if (!isCompatibleStellarAmount(value)) {
    return 'Max 7 decimals';
  }
  const bigValue = new Big(value);
  if (bigValue.gt(maxIssuable)) {
    return 'Amount is higher than the vault can issue.';
  }
  if (parseFloat(value) <= 0) {
    return 'Amount should be a positive number.';
  }
}
