import { ApiPromise } from '@polkadot/api';
import { SubmittableExtrinsic } from '@polkadot/api/promise/types';
import { WalletAccount } from '@talismn/connect-wallets';
import { StateUpdater } from 'preact/hooks';
import { getErrors } from '../../../helpers/substrate';
import { ToastMessage, showToast } from '../../../shared/showToast';

export const doSubmitExtrinsic = (
  api: ApiPromise,
  extrinsic: SubmittableExtrinsic | undefined,
  walletAccount: WalletAccount,
  setSubmissionPending: StateUpdater<boolean>,
  setConfirmationDialogVisible: StateUpdater<boolean>,
) => {
  setSubmissionPending(true);

  return (
    extrinsic
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ?.signAndSend(walletAccount.address, { signer: walletAccount.signer as any }, (result) => {
        console.log('result', result);
        const { status, events } = result;

        console.log('status', status);
        console.log('events', events);

        const errors = getErrors(events, api);

        console.log('errors', errors);
        if (status.isInBlock) {
          if (errors.length > 0) {
            const errorMessage = `Transaction failed with errors: ${errors.join('\n')}`;
            showToast(ToastMessage.ERROR, errorMessage);
          }
        } else if (status.isFinalized) {
          setSubmissionPending(false);

          if (errors.length === 0) {
            setConfirmationDialogVisible(true);
          }
        }
      })
      .catch((error) => {
        console.error('Transaction submission failed', error);
        showToast(ToastMessage.TX_SUBMISSION_FAILED);
        setSubmissionPending(false);
      })
  );
};
