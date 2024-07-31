import { useEffect, useCallback, useMemo, useState } from 'preact/compat';
import { yupResolver } from '@hookform/resolvers/yup';
import { Signer } from '@polkadot/types/types';
import Big from 'big.js';
import { isEmpty } from 'lodash';
import { Button } from 'react-daisyui';
import { FieldErrors, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { useGlobalState } from '../../../../GlobalStateProvider';
import { useNodeInfoState } from '../../../../NodeInfoProvider';
import From from '../../../../components/Form/From';
import OpenWallet from '../../../../components/Wallet';
import { getErrors, getEventBySectionAndMethod } from '../../../../helpers/substrate';
import { RichIssueRequest, useIssuePallet } from '../../../../hooks/spacewalk/useIssuePallet';
import useBridgeSettings from '../../../../hooks/spacewalk/useBridgeSettings';
import { useCalculateGriefingCollateral } from '../../../../hooks/spacewalk/useCalculateGriefingCollateral';
import { decimalToStellarNative, nativeToDecimal } from '../../../../shared/parseNumbers/metric';
import { useAccountBalance } from '../../../../shared/useAccountBalance';
import { ToastMessage, showToast } from '../../../../shared/showToast';
import { isU128Compatible } from '../../../../shared/parseNumbers/isU128Compatible';
import { USER_INPUT_MAX_DECIMALS } from '../../../../shared/parseNumbers/maxDecimals';
import { PAGES_PATHS } from '../../../../app';

import { FeeBox } from '../FeeBox';
import { filterHiddenAssets, prioritizeXLMAsset } from '../helpers';

import Disclaimer from './Disclaimer';
import { ConfirmationDialog } from './ConfirmationDialog';
import { getIssueValidationSchema } from './IssueValidationSchema';

interface IssueProps {
  network: string;
  wrappedCurrencySuffix: string;
  nativeCurrency: string;
}

export type IssueFormValues = {
  amount: string;
  securityDeposit: number;
  to: number;
};

const getFirstErrorMessage = (
  formState: { isDirty: boolean; errors: FieldErrors<IssueFormValues> },
  errorKeys: (keyof IssueFormValues)[],
) => {
  if (!formState.isDirty) return;

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
  const { walletAccount, tenantName } = useGlobalState();
  const { api, tokenSymbol } = useNodeInfoState().state;
  const { selectedVault, selectedAsset, setSelectedAsset, wrappedAssets } = useBridgeSettings();
  const { balances } = useAccountBalance();
  const { transferable } = balances;

  const issuableTokens = selectedVault?.issuableTokens?.toJSON?.().amount ?? selectedVault?.issuableTokens;

  const maxIssuable = nativeToDecimal(issuableTokens || 0).toNumber();

  const { handleSubmit, watch, register, formState, setValue, trigger } = useForm<IssueFormValues>({
    resolver: yupResolver(getIssueValidationSchema(maxIssuable, parseFloat(transferable || '0.0'), tokenSymbol)),
    mode: 'onChange',
  });

  // We watch the amount because we need to re-render the FeeBox constantly
  const amount = watch('amount');

  // The amount represented in the units of the native currency (as integer)
  const amountNative = useMemo(() => {
    return amount ? decimalToStellarNative(amount) : Big(0);
  }, [amount]);

  const griefingCollateral = useCalculateGriefingCollateral(amountNative, selectedAsset);

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

  useEffect(() => {
    setValue('securityDeposit', griefingCollateral.toNumber());
    trigger('securityDeposit');
  }, [amount, griefingCollateral, setValue, trigger]);

  useEffect(() => {
    // Trigger form validation when the selected asset changes
    trigger();
  }, [trigger, selectedAsset, maxIssuable]);

  return (
    <div className="space-walk flex h-full items-center justify-center py-4">
      <ConfirmationDialog
        issueRequest={submittedIssueRequest}
        visible={confirmationDialogVisible}
        onClose={() => setConfirmationDialogVisible(false)}
        onConfirm={() => {
          setConfirmationDialogVisible(false);
          navigateTo(`/${tenantName}/${PAGES_PATHS.TRANSACTIONS}`);
        }}
      />
      <div className="w-full">
        <form className="flex flex-col px-5" onSubmit={handleSubmit(submitRequestIssueExtrinsic, () => undefined)}>
          <From
            {...{
              formControl: {
                maxDecimals: USER_INPUT_MAX_DECIMALS.STELLAR,
                register: register('amount'),
                setValue: (n: string) => setValue('amount', n),
                error:
                  getFirstErrorMessage(formState, ['amount', 'securityDeposit']) ||
                  (!isU128Compatible(amountNative) ? 'Exceeds the max allowed value.' : ''),
              },
              asset: {
                assets: prioritizeXLMAsset(filterHiddenAssets(wrappedAssets)),
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
          <label className="align-center label flex">
            <span className="text-sm">{`Max issuable: ${maxIssuable.toFixed(2)} ${selectedAsset?.code || ''}`}</span>
          </label>

          <FeeBox
            amountNative={amountNative}
            bridgedAsset={selectedAsset}
            extrinsic={requestIssueExtrinsic}
            nativeCurrency={nativeCurrency}
            network={network}
            securityDeposit={griefingCollateral}
            wrappedCurrencySuffix={wrappedCurrencySuffix}
          />
          {walletAccount ? (
            <Button
              className="w-full"
              color="primary"
              loading={submissionPending}
              type="submit"
              disabled={!isEmpty(formState.errors) || !isU128Compatible(amountNative) || submissionPending}
            >
              Bridge
            </Button>
          ) : (
            <OpenWallet />
          )}
          <Disclaimer tenant={tenantName} />
        </form>
      </div>
    </div>
  );
}

export default Issue;
