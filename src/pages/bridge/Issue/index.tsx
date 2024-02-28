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
import OpenWallet from '../../../components/Wallet';
import { getErrors, getEventBySectionAndMethod } from '../../../helpers/substrate';
import { useFeePallet } from '../../../hooks/spacewalk/fee';
import { RichIssueRequest, useIssuePallet } from '../../../hooks/spacewalk/issue';
import useBridgeSettings from '../../../hooks/spacewalk/useBridgeSettings';
import { decimalToStellarNative, nativeToDecimal } from '../../../shared/parseNumbers/metric';
import { useAccountBalance } from '../../../shared/useAccountBalance';
import { FeeBox } from '../FeeBox';
import { ConfirmationDialog } from './ConfirmationDialog';
import Disclaimer from './Disclaimer';
import { getIssueValidationSchema } from './IssueValidationSchema';

interface IssueProps {
  network: string;
  wrappedCurrencySuffix: string;
  nativeCurrency: string;
}

export type IssueFormValues = {
  amount: number;
  securityDeposit: number;
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
  const { issueFee, redeemFee, issueGriefingCollateral } = useFeePallet().getFees();
  const { balance } = useAccountBalance();

  const maxIssuable = nativeToDecimal(selectedVault?.issuableTokens || 0).toNumber();

  const { handleSubmit, watch, register, formState, setValue } = useForm<IssueFormValues>({
    resolver: yupResolver(getIssueValidationSchema(maxIssuable, parseFloat(balance || '0.0'))),
  });

  // We watch the amount because we need to re-render the FeeBox constantly
  const amount = watch('amount');

  // The amount represented in the units of the native currency (as integer)
  const amountNative = useMemo(() => {
    return amount ? decimalToStellarNative(amount) : Big(0);
  }, [amount]);

  const disclaimerContent = useMemo(
    () => (
      <ul>
        <li>• Bridge Fee: Currently free, transitioning to 0.1% per transaction soon.</li>
        <li>• Security deposit: 0.5% of the transaction amount locked, returned after successful issue/redeem </li>
        <li>
          • Total issuable amount (in USD): 20000 USD. Join our vault operator program, more
          <a
            target="_blank"
            className="text-accent ml-1"
            href="https://pendulum.gitbook.io/pendulum-docs/build/spacewalk-stellar-bridge/operating-a-vault"
          >
            here
          </a>
        </li>
        <li>• Estimated time for issuing: 2 mins to 3 hrs (after submitting the Stellar payment to the vault).`</li>
      </ul>
    ),
    [issueFee, redeemFee, issueGriefingCollateral],
  );

  const requestIssueExtrinsic = useMemo(() => {
    if (!selectedVault || !api) {
      return undefined;
    }

    return createIssueRequestExtrinsic(amountNative.toString(), selectedVault.id);
  }, [amountNative, api, createIssueRequestExtrinsic, selectedVault]);

  const submitRequestIssueExtrinsic = useCallback(
    (_values: IssueFormValues) => {
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

  useMemo(() => {
    setValue('securityDeposit', amount * issueGriefingCollateral.toNumber());
  }, [amount, issueGriefingCollateral]);

  return (
    <div className="flex items-center justify-center h-full space-walk py-4">
      <ConfirmationDialog
        issueRequest={submittedIssueRequest}
        visible={confirmationDialogVisible}
        onClose={() => setConfirmationDialogVisible(false)}
      />
      <div className="w-full">
        <form className="px-5 flex flex-col" onSubmit={handleSubmit(submitRequestIssueExtrinsic, () => undefined)}>
          <From
            register={register('amount')}
            setValue={(n: number) => setValue('amount', n)}
            assets={wrappedAssets}
            setSelectedAsset={setSelectedAsset}
            selectedAsset={selectedAsset}
            network="Stellar"
            error={
              formState.errors.amount?.message?.toString() || formState.errors.securityDeposit?.message?.toString()
            }
          />
          <input type="hidden" {...register('securityDeposit')} />
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
          <Disclaimer content={disclaimerContent} />
        </form>
      </div>
    </div>
  );
}

export default Issue;
