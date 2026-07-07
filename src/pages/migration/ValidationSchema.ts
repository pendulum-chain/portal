import * as Yup from 'yup';
import { transformNumber } from '../../helpers/yup';
import { isValidEip55Address } from '../../helpers/ethereum';

export interface MigrationFormValues {
  amount: number;
  baseAddress: string;
  confirmIrreversible: boolean;
}

interface SchemaParams {
  transferable: number;
  total: number;
  minimumMigrationAmount: number;
  existentialDeposit: number;
  tokenSymbol: string;
}

export function getMigrationValidationSchema({
  transferable,
  total,
  minimumMigrationAmount,
  existentialDeposit,
  tokenSymbol,
}: SchemaParams) {
  return Yup.object<MigrationFormValues>().shape({
    amount: Yup.number()
      .transform(transformNumber)
      .positive('The amount must be positive')
      .required('The amount is required')
      .min(minimumMigrationAmount, `The minimum migration amount is ${minimumMigrationAmount} ${tokenSymbol}`)
      .max(transferable, `The amount exceeds your transferable balance of ${transferable.toFixed(4)} ${tokenSymbol}`)
      .test(
        'ed-rule',
        `Migrate your entire balance or leave at least ${existentialDeposit} ${tokenSymbol} behind — a smaller remainder would be lost as dust`,
        (value) => {
          if (value === undefined) return false;
          const remainder = total - value;
          // Tolerance for float representation of 12-decimal amounts.
          return remainder <= 1e-9 || remainder >= existentialDeposit;
        },
      ),
    baseAddress: Yup.string()
      .required('The Base address is required')
      .test(
        'eip55',
        'Not a valid Base (EVM) address — check the 0x-prefixed address and its checksum',
        (value) => Boolean(value && isValidEip55Address(value)),
      ),
    confirmIrreversible: Yup.boolean()
      .required()
      .oneOf([true], 'You must confirm that you understand the migration is irreversible'),
  });
}
