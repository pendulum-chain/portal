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
import LabelledInputField from '../../../components/LabelledInputField';
import OpenWallet from '../../../components/Wallet';
import { isPublicKey } from '../../../helpers/stellar';
import { getErrors, getEventBySectionAndMethod } from '../../../helpers/substrate';
import { RichRedeemRequest, useRedeemPallet } from '../../../hooks/spacewalk/redeem';
import useBridgeSettings from '../../../hooks/spacewalk/useBridgeSettings';
import { decimalToStellarNative, nativeToDecimal } from '../../../shared/parseNumbers';
import { FeeBox } from '../FeeBox';
import { ConfirmationDialog } from './ConfirmationDialog';
import { getRedeemValidationSchema } from './RedeemValidationSchema';

export type RedeemFormValues = {
  amount: number;
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

  const { createRedeemRequestExtrinsic, getRedeemRequest } = useRedeemPallet();
  const { selectedVault, selectedAsset, wrappedAssets, setSelectedAsset } = useBridgeSettings();
  const { walletAccount, dAppName } = useGlobalState();
  const { api } = useNodeInfoState().state;

  const { handleSubmit, watch, register, formState, setValue } = useForm<RedeemFormValues>({
    defaultValues: {},
    resolver: yupResolver(getRedeemValidationSchema(10)),
  });

  const { wrappedCurrencySuffix, nativeCurrency, network } = props;

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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      .catch((error) => {
        console.error('Transaction submission failed', error);
        toast('Transaction submission failed:' + error.toString(), {
          type: 'error',
        });
        setSubmissionPending(false);
      });
  }, [api, getRedeemRequest, requestRedeemExtrinsic, selectedVault, walletAccount]);

  return (
    <div className="flex items-center justify-center h-full space-walk py-4 w-full">
      <ConfirmationDialog
        redeemRequest={submittedRedeemRequest}
        visible={confirmationDialogVisible}
        onClose={() => setConfirmationDialogVisible(false)}
      />
      <div className="w-full">
        <form className="px-5 flex flex-col" onSubmit={handleSubmit(submitRequestRedeemExtrinsic, () => {})}>
          <From
            register={register('amount')}
            setValue={(n: number) => setValue('amount', n)}
            max={10} // Max issuable tokens
            assets={wrappedAssets}
            setSelectedAsset={setSelectedAsset}
            selectedAsset={selectedAsset}
            network={network}
            assetSuffix={wrappedCurrencySuffix}
            error={formState.errors.amount?.message}
          />
          <div className="flex align-center mt-4">
            <span className="text-sm">{`Max redeemable: ${nativeToDecimal(
              selectedVault?.redeemableTokens?.toString() || 0,
            ).toFixed(2)} 
              ${selectedAsset?.code}`}</span>
          </div>
          <LabelledInputField
            label="Stellar Address"
            error={formState.errors.to?.message}
            placeholder="Enter target Stellar address"
            type="text"
            style={{ marginTop: 8 }}
            className="border-base-400 bg-base-200"
          />
          <FeeBox
            amountNative={amountNative}
            bridgedAsset={selectedAsset}
            extrinsic={requestRedeemExtrinsic}
            network="Stellar"
            nativeCurrency={nativeCurrency}
          />
          <Validation errors={formState.errors} className="" />
          {walletAccount ? (
            <Button
              className="w-full"
              color="primary"
              loading={submissionPending}
              onSubmit={handleSubmit(submitRequestRedeemExtrinsic)}
              type="submit"
            >
              Bridge
            </Button>
          ) : (
            <OpenWallet dAppName={dAppName} />
          )}
        </form>
      </div>
    </div>
  );
}

export default Redeem;
