import Big from 'big.js';
import { yupResolver } from '@hookform/resolvers/yup';
import { isEmpty } from 'lodash';
import { useEffect } from 'preact/compat';
import { useCallback, useMemo, useState } from 'preact/hooks';
import { Button } from 'react-daisyui';
import { useForm } from 'react-hook-form';
import { Signer } from '@polkadot/types/types';
import { useGlobalState } from '../../../../GlobalStateProvider';
import { useNodeInfoState } from '../../../../NodeInfoProvider';
import From from '../../../../components/Form/From';
import LabelledInputField from '../../../../components/LabelledInputField';
import OpenWallet from '../../../../components/Wallet';
import { assetDisplayName } from '../../../../helpers/spacewalk';
import { isPublicKey } from '../../../../helpers/stellar';
import { getErrors, getEventBySectionAndMethod } from '../../../../helpers/substrate';
import { RichRedeemRequest, useRedeemPallet } from '../../../../hooks/spacewalk/useRedeemPallet';
import useBridgeSettings from '../../../../hooks/spacewalk/useBridgeSettings';
import useBalances from '../../../../hooks/useBalances';
import { decimalToStellarNative, nativeToDecimal } from '../../../../shared/parseNumbers/metric';
import { USER_INPUT_MAX_DECIMALS } from '../../../../shared/parseNumbers/maxDecimals';
import { isU128Compatible } from '../../../../shared/parseNumbers/isU128Compatible';
import { ToastMessage, showToast } from '../../../../shared/showToast';
import { FeeBox } from '../FeeBox';
import { prioritizeXLMAsset } from '../helpers';
import { ConfirmationDialog } from './ConfirmationDialog';
import { getRedeemValidationSchema } from './RedeemValidationSchema';

export type RedeemFormValues = {
  amount: string;
  to: string;
};

interface RedeemProps {
  network: string;
  wrappedCurrencySuffix: string;
  nativeCurrency: string;
}

function Redeem(props: RedeemProps): JSX.Element {
  const [confirmationDialogVisible, setConfirmationDialogVisible] = useState(false);
  const [submissionPending, setSubmissionPending] = useState(false);
  const [submittedRedeemRequest, setSubmittedRedeemRequest] = useState<RichRedeemRequest | undefined>(undefined);
  const [selectedAssetsBalance, setSelectedAssetsBalance] = useState(0);

  const { createRedeemRequestExtrinsic, getRedeemRequest } = useRedeemPallet();
  const { selectedVault, selectedAsset, wrappedAssets, setSelectedAsset } = useBridgeSettings();

  const { walletAccount } = useGlobalState();
  const { api } = useNodeInfoState().state;
  const { balances } = useBalances();
  const { wrappedCurrencySuffix, nativeCurrency, network } = props;

  useEffect(() => {
    const selectedAssetName = assetDisplayName(selectedAsset, '', wrappedCurrencySuffix);
    const { amount } = balances?.find(({ token }) => token === selectedAssetName) || { amount: 0 };
    setSelectedAssetsBalance(amount);
  }, [balances, selectedAsset, wrappedCurrencySuffix, selectedAssetsBalance]);

  const redeemableTokens = selectedVault?.redeemableTokens?.toJSON?.().amount ?? selectedVault?.redeemableTokens;
  const maxRedeemable = nativeToDecimal(redeemableTokens || 0).toNumber();

  const { handleSubmit, watch, register, formState, setValue, trigger } = useForm<RedeemFormValues>({
    defaultValues: {},
    resolver: yupResolver(getRedeemValidationSchema(maxRedeemable, selectedAssetsBalance)),
    mode: 'onChange',
  });

  // We watch the amount because we need to re-render the FeeBox constantly
  const amount = watch('amount');
  const stellarAddress = watch('to');

  // The amount represented in the units of the native currency (as integer)
  const amountNative = useMemo(() => {
    return amount ? decimalToStellarNative(amount) : Big(0);
  }, [amount]);

  const requestRedeemExtrinsic = useMemo(() => {
    if (!selectedVault || !api || !stellarAddress || !isPublicKey(stellarAddress)) {
      return undefined;
    }

    return createRedeemRequestExtrinsic(amountNative.toString(), stellarAddress, selectedVault.id);
  }, [amountNative, api, createRedeemRequestExtrinsic, selectedVault, stellarAddress]);

  const submitRequestRedeemExtrinsic = useCallback(() => {
    if (!requestRedeemExtrinsic || !api || !selectedVault) {
      return;
    }

    if (!walletAccount) {
      return;
    }

    setSubmissionPending(true);

    requestRedeemExtrinsic
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
          const requestRedeemEvents = getEventBySectionAndMethod(events, 'redeem', 'RequestRedeem');

          // We only expect one event but loop over all of them just in case
          for (const requestRedeemEvent of requestRedeemEvents) {
            // We do not have a proper type for this event, so we have to cast it to any
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const redeemId = (requestRedeemEvent.data as any).redeemId;

            getRedeemRequest(redeemId).then((redeemRequest) => {
              setSubmittedRedeemRequest(redeemRequest);
            });
          }

          setSubmissionPending(false);

          if (errors.length === 0) {
            setConfirmationDialogVisible(true);
          }
        }
      })
      .catch((error: unknown) => {
        console.error('Transaction submission failed', error);
        showToast(ToastMessage.ERROR, `Transaction submission failed: ${String(error)}`);
        setSubmissionPending(false);
      });
  }, [api, getRedeemRequest, requestRedeemExtrinsic, selectedVault, walletAccount]);

  return (
    <div className="space-walk flex h-full w-full items-center justify-center py-4">
      <ConfirmationDialog
        redeemRequest={submittedRedeemRequest}
        visible={confirmationDialogVisible}
        onClose={() => setConfirmationDialogVisible(false)}
      />
      <div className="w-full">
        <form className="flex flex-col px-5" onSubmit={handleSubmit(submitRequestRedeemExtrinsic)}>
          <From
            {...{
              formControl: {
                max: selectedAssetsBalance,
                register: register('amount'),
                setValue: (n: string) => {
                  setValue('amount', n);
                  trigger('amount');
                },
                error: formState.errors.amount?.message,
                maxDecimals: USER_INPUT_MAX_DECIMALS.STELLAR,
              },
              asset: {
                assets: prioritizeXLMAsset(wrappedAssets),
                selectedAsset,
                setSelectedAsset,
                assetSuffix: wrappedCurrencySuffix,
              },
              description: {
                network,
              },
              badges: {},
            }}
          />
          <label className="align-center label flex">
            <span className="text-sm">{`Max redeemable: ${maxRedeemable.toFixed(2)}
              ${selectedAsset?.code || ''}`}</span>
          </label>
          <LabelledInputField
            register={register('to')}
            label="Stellar Address"
            error={formState.errors.to?.message}
            placeholder="Enter target Stellar address"
            type="text"
            style={{ marginTop: 8 }}
            className="border-[--base-400] bg-base-200"
            autoComplete="off"
          />
          <FeeBox
            amountNative={amountNative}
            bridgedAsset={selectedAsset}
            extrinsic={requestRedeemExtrinsic}
            network="Stellar"
            nativeCurrency={nativeCurrency}
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
        </form>
      </div>
    </div>
  );
}

export default Redeem;
