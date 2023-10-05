/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupResolver } from '@hookform/resolvers/yup';
import Big from 'big.js';
import { useCallback, useMemo, useState } from 'preact/hooks';
import { Button } from 'react-daisyui';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useGlobalState } from '../../../GlobalStateProvider';
import { useNodeInfoState } from '../../../NodeInfoProvider';
import From from '../../../components/Form/From';
import Validation from '../../../components/Form/Validation';
import OpenWallet from '../../../components/Wallet';
import { getErrors, getEventBySectionAndMethod } from '../../../helpers/substrate';
import { RichIssueRequest, useIssuePallet } from '../../../hooks/spacewalk/issue';
import useBridgeSettings from '../../../hooks/spacewalk/useBridgeSettings';
import { decimalToStellarNative, nativeToDecimal } from '../../../shared/parseNumbers';
import { FeeBox } from '../FeeBox';
import { ConfirmationDialog } from './ConfirmationDialog';
import Disclaimer from './Disclaimer';
import { getIssueValidationSchema } from './IssueValidationSchema';

const disclaimerText =
  '1. Sed ut perspiciatis unde omnis iste natus error sit voluptatem\n2. accusantium doloremque laudantium, totam rem aperiam eaque \n3. quae ab illo inventore veritatis et quasi architecto beatae vitae dicta\n4. explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspe';

interface IssueProps {
  network: string;
  wrappedCurrencySuffix: string;
  nativeCurrency: string;
}

export type IssueFormValues = {
  amount: number;
  to: number;
};

function Issue(props: IssueProps): JSX.Element {
  const { network, wrappedCurrencySuffix, nativeCurrency } = props;

  const [confirmationDialogVisible, setConfirmationDialogVisible] = useState(false);
  const [submissionPending, setSubmissionPending] = useState(false);
  const [submittedIssueRequest, setSubmittedIssueRequest] = useState<RichIssueRequest | undefined>(undefined);

  const { createIssueRequestExtrinsic, getIssueRequest } = useIssuePallet();
  const { walletAccount, dAppName } = useGlobalState();
  const { api } = useNodeInfoState().state;
  const { selectedVault, selectedAsset, setSelectedAsset, wrappedAssets } = useBridgeSettings();

  const maxIssuable = nativeToDecimal(selectedVault?.issuableTokens).toNumber();

  const { handleSubmit, watch, register, formState, setValue } = useForm<IssueFormValues>({
    resolver: yupResolver(getIssueValidationSchema(maxIssuable)),
  });

  // We watch the amount because we need to re-render the FeeBox constantly
  const amount = watch('amount');

  // The amount represented in the units of the native currency (as integer)
  const amountNative = useMemo(() => {
    return amount ? decimalToStellarNative(amount) : Big(0);
  }, [amount]);

  const requestIssueExtrinsic = useMemo(() => {
    if (!selectedVault || !api) {
      return undefined;
    }

    return createIssueRequestExtrinsic(amountNative.toString(), selectedVault.id);
  }, [amountNative, api, createIssueRequestExtrinsic, selectedVault]);

  const submitRequestIssueExtrinsic = useCallback(
    (values: IssueFormValues) => {
      if (!requestIssueExtrinsic || !api || !selectedVault) {
        return;
      }

      if (!walletAccount) {
        toast('No wallet account selected', { type: 'error' });
        return;
      }

      setSubmissionPending(true);

      requestIssueExtrinsic
        .signAndSend(walletAccount.address, { signer: walletAccount.signer as any }, (result) => {
          const { status, events } = result;

          const errors = getErrors(events, api);
          if (status.isInBlock) {
            if (errors.length > 0) {
              const errorMessage = `Transaction failed with errors: ${errors.join('\n')}`;
              console.error(errorMessage);
              toast(errorMessage, { type: 'error' });
            }
          } else if (status.isFinalized) {
            const requestIssueEvents = getEventBySectionAndMethod(events, 'issue', 'RequestIssue');

            // We only expect one event but loop over all of them just in case
            for (const requestIssueEvent of requestIssueEvents) {
              // We do not have a proper type for this event, so we have to cast it to any
              const issueId = (requestIssueEvent.data as any).issueId;

              getIssueRequest(issueId).then((issueRequest) => {
                setSubmittedIssueRequest(issueRequest);
              });
            }

            setSubmissionPending(false);

            if (errors.length === 0) {
              setConfirmationDialogVisible(true);
            }
          }
        })
        .catch((error) => {
          console.error('Transaction submission failed', error);
          toast('Transaction submission failed: ' + error.toString(), {
            type: 'error',
          });
          setSubmissionPending(false);
        });
    },
    [api, getIssueRequest, requestIssueExtrinsic, selectedVault, walletAccount],
  );

  return (
    <div className="flex items-center justify-center h-full space-walk py-4">
      <ConfirmationDialog
        issueRequest={submittedIssueRequest}
        visible={confirmationDialogVisible}
        onClose={() => setConfirmationDialogVisible(false)}
      />
      <div className="w-full">
        <form className="px-5 flex flex-col" onSubmit={handleSubmit(submitRequestIssueExtrinsic, () => {})}>
          <From
            register={register('amount')}
            setValue={(n: number) => setValue('amount', n)}
            assets={wrappedAssets}
            setSelectedAsset={setSelectedAsset}
            selectedAsset={selectedAsset}
            network="Stellar"
            error={formState.errors.amount?.message?.toString()}
          />
          <label className="label flex align-center">
            <span className="text-sm">{`Max issuable: ${nativeToDecimal(
              selectedVault?.issuableTokens?.toString() || 0,
            ).toFixed(2)} 
              ${selectedAsset?.code}`}</span>
          </label>

          <FeeBox
            amountNative={amountNative}
            bridgedAsset={selectedAsset}
            extrinsic={requestIssueExtrinsic}
            network={network}
            wrappedCurrencySuffix={wrappedCurrencySuffix}
            nativeCurrency={nativeCurrency}
          />
          <Validation errors={formState.errors} />
          {walletAccount ? (
            <Button
              className="w-full text-primary-content"
              color="primary"
              loading={submissionPending}
              type="submit"
              disabled={!!formState.errors.amount}
            >
              Bridge
            </Button>
          ) : (
            <OpenWallet dAppName={dAppName} />
          )}
          <Disclaimer text={disclaimerText} />
        </form>
      </div>
    </div>
  );
}

export default Issue;
