import { ApiPromise } from '@polkadot/api';
import { SubmittableExtrinsic } from '@polkadot/api/promise/types';
import { WalletAccount } from '@talismn/connect-wallets';
import { Dispatch } from 'react';
import { getErrors } from '../../../helpers/substrate';
import { ToastMessage, showToast } from '../../../shared/showToast';

export const doSubmitExtrinsic = (
  api: ApiPromise,
  extrinsic: SubmittableExtrinsic | undefined,
  walletAccount: WalletAccount,
  setSubmissionPending: Dispatch<boolean>,
  setConfirmationDialogVisible: Dispatch<boolean>,
  hideToast?: boolean,
) => {
  setSubmissionPending(true);

  return new Promise<void>((resolve, reject) =>
    extrinsic
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ?.signAndSend(walletAccount.address, { signer: walletAccount.signer as any }, (result) => {
        const { status, events } = result;

        const errors = getErrors(events, api);

        if (status.isInBlock) {
          if (errors.length > 0) {
            const errorMessage = `Transaction failed with errors: ${errors.join('\n')}`;
            showToast(ToastMessage.ERROR, errorMessage);
            throw errorMessage;
          }
        } else if (status.isFinalized) {
          setSubmissionPending(false);

          if (errors.length === 0) {
            setConfirmationDialogVisible(true);
            resolve();
          }
        }
      })
      .catch((error) => {
        !hideToast && showToast(ToastMessage.TX_SUBMISSION_FAILED);
        setSubmissionPending(false);
        reject(error.message);
      }),
  );
};
