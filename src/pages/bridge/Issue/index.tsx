import { yupResolver } from '@hookform/resolvers/yup';
import { Signer } from '@polkadot/types/types';
import Big from 'big.js';
import { isEmpty } from 'lodash';
import { useCallback, useMemo, useState } from 'preact/hooks';
import { Button } from 'react-daisyui';
import { FieldErrors, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { useGlobalState } from '../../../GlobalStateProvider';
import { useNodeInfoState } from '../../../NodeInfoProvider';
import From from '../../../components/Form/From';
import OpenWallet from '../../../components/Wallet';
import { getErrors, getEventBySectionAndMethod } from '../../../helpers/substrate';
import { useFeePallet } from '../../../hooks/spacewalk/useFeePallet';
import { RichIssueRequest, useIssuePallet } from '../../../hooks/spacewalk/useIssuePallet';
import useBridgeSettings from '../../../hooks/spacewalk/useBridgeSettings';
import { decimalToStellarNative, nativeToDecimal } from '../../../shared/parseNumbers/metric';
import { useAccountBalance } from '../../../shared/useAccountBalance';
import { TenantName } from '../../../models/Tenant';
import { ToastMessage, showToast } from '../../../shared/showToast';

import { FeeBox } from '../FeeBox';
import { prioritizeXLMAsset } from '../helpers';

import { ConfirmationDialog } from './ConfirmationDialog';
import Disclaimer from './Disclaimer';
import { getIssueValidationSchema } from './IssueValidationSchema';
import { isU128Compatible } from '../../../shared/parseNumbers/isU128Compatible';
import { USER_INPUT_MAX_DECIMALS } from '../../../shared/parseNumbers/decimal';

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

const getFirstErrorMessage = (
  formState: { errors: FieldErrors<IssueFormValues> },
  errorKeys: (keyof IssueFormValues)[],
) => {
  for (const key of errorKeys) {
    if (formState.errors[key]?.message) {
      return formState.errors[key]?.message?.toString();
    }
  }
  return '';
};

function Issue(props: IssueProps): JSX.Element {
  const { network, wrappedCurrencySuffix, nativeCurrency } = props;

  const [confirmationDialogVisible, setConfirmationDialogVisible] = useState(false);
  const [submissionPending, setSubmissionPending] = useState(false);
  const [submittedIssueRequest, setSubmittedIssueRequest] = useState<RichIssueRequest | undefined>(undefined);

  const navigateTo = useNavigate();
  const { createIssueRequestExtrinsic, getIssueRequest } = useIssuePallet();
  const { walletAccount, dAppName, tenantName } = useGlobalState();
  const { api, tokenSymbol } = useNodeInfoState().state;
  const { selectedVault, selectedAsset, setSelectedAsset, wrappedAssets } = useBridgeSettings();
  const { issueGriefingCollateral } = useFeePallet().getFees();
  const { balance } = useAccountBalance();

  const issuableTokens = selectedVault?.issuableTokens?.toJSON?.().amount ?? selectedVault?.issuableTokens;

  const maxIssuable = nativeToDecimal(issuableTokens || 0).toNumber();

  const { handleSubmit, watch, register, formState, setValue, trigger } = useForm<IssueFormValues>({
    resolver: yupResolver(getIssueValidationSchema(maxIssuable, parseFloat(balance || '0.0'), tokenSymbol)),
    mode: 'onChange',
  });

  // We watch the amount because we need to re-render the FeeBox constantly
  const amount = watch('amount');

  // The amount represented in the units of the native currency (as integer)
  const amountNative = useMemo(() => {
    return amount ? decimalToStellarNative(amount) : Big(0);
  }, [amount]);

  const disclaimerContent = useMemo(
    () => (
      <ul className="list-disc pl-4">
        <li>Bridge Fee: Currently zero fee, transitioning to 0.1% per transaction soon.</li>
        <li>Security deposit: 0.5% of the transaction amount locked, returned after successful issue/redeem. </li>
        <li>
          Total issuable amount (in USD): {tenantName === TenantName.Pendulum ? 50000 : 20000} USD. Join our vault
          operator program, more
          <a
            target="_blank"
            className="text-primary ml-1"
            href="https://pendulum.gitbook.io/pendulum-docs/build/spacewalk-stellar-bridge/operating-a-vault"
            rel="noreferrer"
          >
            here
          </a>
          .
        </li>
        <li>
          Estimated time for issuing: In a minute after submitting the Stellar payment to the vault. Contact
          <a href="https://t.me/pendulum_chain" target="_blank" rel="noreferrer" className="mx-1 text-primary">
            support
          </a>
          if your transaction is still pending after 10 minutes.
        </li>
      </ul>
    ),
    [tenantName],
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
        showToast(ToastMessage.NO_WALLET_SELECTED);
        return;
      }

      setSubmissionPending(true);

      requestIssueExtrinsic
        .signAndSend(walletAccount.address, { signer: walletAccount.signer as Signer }, (result) => {
          const { status, events } = result;

          const errors = getErrors(events, api);
          if (status.isInBlock) {
            if (errors.length > 0) {
              const errorMessage = `Transaction failed with errors: ${errors.join('\n')}`;
              console.error(errorMessage);
              showToast(ToastMessage.ERROR, errorMessage);
            }
          } else if (status.isFinalized) {
            const requestIssueEvents = getEventBySectionAndMethod(events, 'issue', 'RequestIssue');

            // We only expect one event but loop over all of them just in case
            for (const requestIssueEvent of requestIssueEvents) {
              // We do not have a proper type for this event, so we have to cast it to any
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
          showToast(ToastMessage.ERROR, 'Transaction submission failed: ' + error.toString());
          setSubmissionPending(false);
        });
    },
    [api, getIssueRequest, requestIssueExtrinsic, selectedVault, walletAccount],
  );

  useMemo(() => {
    setValue('securityDeposit', amount * issueGriefingCollateral.toNumber());
    trigger('securityDeposit');
  }, [amount, issueGriefingCollateral, setValue, trigger]);

  return (
    <div className="flex items-center justify-center h-full space-walk py-4">
      <ConfirmationDialog
        issueRequest={submittedIssueRequest}
        visible={confirmationDialogVisible}
        onClose={() => setConfirmationDialogVisible(false)}
        onConfirm={() => {
          setConfirmationDialogVisible(false);
          navigateTo(`/${tenantName}/spacewalk/transactions`);
        }}
      />
      <div className="w-full">
        <form className="px-5 flex flex-col" onSubmit={handleSubmit(submitRequestIssueExtrinsic, () => undefined)}>
          <From
            {...{
              formControl: {
                maxDecimals: USER_INPUT_MAX_DECIMALS.STELLAR,
                register: register('amount'),
                setValue: (n: number) => setValue('amount', n),
                error:
                  getFirstErrorMessage(formState, ['amount', 'securityDeposit']) ||
                  (!isU128Compatible(amountNative) ? 'Exceeds the max allowed value.' : ''),
              },
              asset: {
                assets: prioritizeXLMAsset(wrappedAssets),
                selectedAsset,
                setSelectedAsset,
              },
              description: {
                network: 'Stellar',
              },
              badges: {},
            }}
          />
          <input type="hidden" {...register('securityDeposit')} />
          <label className="label flex align-center">
            <span className="text-sm">{`Max issuable: ${maxIssuable.toFixed(2)} ${selectedAsset?.code || ''}`}</span>
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
              className="w-full"
              color="primary"
              loading={submissionPending}
              type="submit"
              disabled={!isEmpty(formState.errors) || !isU128Compatible(amountNative)}
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
