import { h } from 'preact';
import _ from 'lodash';
import { Button, Checkbox, Modal } from 'react-daisyui';
import { useCallback, useEffect, useMemo, useState } from 'preact/hooks';
import LabelledInputField from '../../components/LabelledInputField';
import { RichRedeemRequest, useRedeemPallet } from '../../hooks/spacewalk/redeem';
import { useVaultRegistryPallet } from '../../hooks/spacewalk/vaultRegistry';
import { VaultRegistryVault } from '@polkadot/types/lookup';
import { convertCurrencyToStellarAsset } from '../../helpers/spacewalk';
import { Asset } from 'stellar-sdk';
import {
  convertRawHexKeyToPublicKey,
  isCompatibleStellarAmount,
  isPublicKey,
  StellarPublicKeyPattern,
  stringifyStellarAsset,
} from '../../helpers/stellar';
import { useFeePallet } from '../../hooks/spacewalk/fee';
import { decimalToStellarNative, nativeStellarToDecimal, nativeToDecimal } from '../../helpers/parseNumbers';
import Big from 'big.js';
import { SubmittableExtrinsic } from '@polkadot/api/promise/types';
import { useGlobalState } from '../../GlobalStateProvider';
import { useNodeInfoState } from '../../NodeInfoProvider';
import { getErrors, getEventBySectionAndMethod } from '../../helpers/substrate';
import { toast } from 'react-toastify';
import { CopyableAddress, PublicKey } from '../../components/PublicKey';
import { AssetSelector, VaultSelector } from '../../components/Selector';
import { Controller, useForm } from 'react-hook-form';
import OpenWallet from '../../components/OpenWallet';

interface FeeBoxProps {
  bridgedAsset?: Asset;
  // The amount of the bridged asset denoted in the smallest unit of the asset
  amountNative: Big;
  extrinsic?: SubmittableExtrinsic;
  network: string;
  nativeCurrency: string;
  wrappedCurrencyPrefix?: string;
}

function FeeBox(props: FeeBoxProps): JSX.Element {
  const { bridgedAsset, extrinsic, nativeCurrency, wrappedCurrencyPrefix, network } = props;
  const amount = props.amountNative;

  const wrappedCurrencyName = bridgedAsset ? (wrappedCurrencyPrefix || '') + bridgedAsset.getCode() : '';

  const { getFees, getTransactionFee } = useFeePallet();
  const fees = getFees();

  const [transactionFee, setTransactionFee] = useState<Big>(Big(0));

  useEffect(() => {
    if (!extrinsic) {
      return;
    }

    getTransactionFee(extrinsic).then((fee) => {
      setTransactionFee(nativeToDecimal(fee));
    });
  }, [extrinsic, getTransactionFee, setTransactionFee]);

  const bridgeFee = useMemo(() => {
    return nativeStellarToDecimal(amount.mul(fees.redeemFee));
  }, [amount, fees]);

  const totalAmount = useMemo(() => {
    if (amount.cmp(0) === 0) {
      return 0;
    }

    return nativeStellarToDecimal(amount).sub(bridgeFee);
  }, [amount, bridgeFee]);

  return (
    <div className="shadow bg-base-100 rounded-lg p-4 my-4 flex flex-col">
      <div className="flex justify-between">
        <span>To {network}</span>
        <span>
          {totalAmount.toString()} {wrappedCurrencyName}
        </span>
      </div>
      <div className="flex justify-between mt-2">
        <span>Bridge Fee</span>
        <span>
          {bridgeFee.toString()} {bridgedAsset?.getCode()}
        </span>
      </div>
      <div className="flex justify-between mt-2">
        <span>Transaction Fee</span>
        <span>
          {transactionFee.toFixed(12)} {nativeCurrency}
        </span>
      </div>
    </div>
  );
}

interface ConfirmationDialogProps {
  redeemRequest: RichRedeemRequest | undefined;
  onClose: () => void;
  visible: boolean;
}

function ConfirmationDialog(props: ConfirmationDialogProps): JSX.Element {
  const { redeemRequest, visible, onClose } = props;

  const totalAmount = redeemRequest ? nativeStellarToDecimal(redeemRequest.request.amount.toString()).toString() : '';
  const currency = redeemRequest?.request.asset;
  const asset = currency && convertCurrencyToStellarAsset(currency);

  const rawDestinationAddress = redeemRequest?.request.stellarAddress;
  console.log('rawDestinationAddress', redeemRequest?.request.stellarAddress);
  const destination = rawDestinationAddress
    ? convertRawHexKeyToPublicKey(rawDestinationAddress.toHex()).publicKey()
    : '';
  console.log('destination', destination);

  return (
    <Modal open={visible}>
      <Modal.Header className="font-bold">Back to Stellar</Modal.Header>
      <Button color="ghost" size="md" shape="circle" className="absolute right-4 top-4" onClick={onClose}>
        ✕
      </Button>
      <Modal.Body>
        <div className="text-center">
          <div className="text-xl">
            You will receive {totalAmount} {asset?.getCode()}
          </div>
          <div className="text-sm">
            (issued by {asset && <PublicKey variant="short" publicKey={asset?.getIssuer()} />})
          </div>
          <div className="text-sm text-secondary mt-4">Your request is being processed</div>
        </div>
        <div className="mt-6 text-secondary">
          <div className="flex items-center justify-between">
            <span>Stellar destination address</span>
            <CopyableAddress variant="short" publicKey={destination} />
          </div>
          <div className="text-sm mt-2">
            We will inform you when the PEN payment is executed. This typically takes only a few minutes but may
            sometimes take up to 6 hours.
          </div>
        </div>
      </Modal.Body>

      <Modal.Actions className="justify-center">
        <Button color="primary" onClick={onClose}>
          View Progress
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

interface RedeemFormInputs {
  amount: string;
  stellarAddress: string;
}

interface RedeemProps {
  network: string;
  wrappedCurrencyPrefix: string;
  nativeCurrency: string;
}

function Redeem(props: RedeemProps): JSX.Element {
  const [selectedVault, setSelectedVault] = useState<VaultRegistryVault>();
  const [selectedAsset, setSelectedAsset] = useState<Asset>();
  const [confirmationDialogVisible, setConfirmationDialogVisible] = useState(false);
  const [submissionPending, setSubmissionPending] = useState(false);
  const [submittedRedeemRequest, setSubmittedRedeemRequest] = useState<RichRedeemRequest | undefined>(undefined);
  const [manualVaultSelection, setManualVaultSelection] = useState(false);

  const { createRedeemRequestExtrinsic, getRedeemRequest } = useRedeemPallet();
  const { getVaults } = useVaultRegistryPallet();
  const { walletAccount } = useGlobalState().state;
  const { api } = useNodeInfoState().state;

  const { control, handleSubmit, getValues, watch } = useForm<RedeemFormInputs>({
    defaultValues: {
      amount: '0',
      stellarAddress: '',
    },
  });

  const { network, wrappedCurrencyPrefix, nativeCurrency } = props;

  // We watch the amount because we need to re-render the FeeBox constantly
  const amount = watch('amount');
  const { stellarAddress } = getValues();

  const vaults = getVaults();

  // The amount represented in the units of the native currency (as integer)
  const amountNative = useMemo(() => {
    return amount ? decimalToStellarNative(amount) : Big(0);
  }, [amount]);

  const wrappedAssets = useMemo(() => {
    const assets = vaults
      .map((vault) => {
        const currency = vault.id.currencies.wrapped;
        console.log('currency', currency);
        return convertCurrencyToStellarAsset(currency);
      })
      .filter((asset): asset is Asset => {
        return asset != null;
      });
    // Deduplicate assets
    return _.uniqBy(assets, (asset: Asset) => stringifyStellarAsset(asset));
  }, [vaults]);

  const vaultsForCurrency = useMemo(() => {
    return vaults.filter((vault) => {
      if (!selectedAsset) {
        return false;
      }

      const vaultCurrencyAsAsset = convertCurrencyToStellarAsset(vault.id.currencies.wrapped);
      return vaultCurrencyAsAsset && vaultCurrencyAsAsset.equals(selectedAsset);
    });
  }, [selectedAsset, vaults]);

  useEffect(() => {
    if (!manualVaultSelection) {
      // TODO build a better algorithm for automatically selecting a vault
      if (vaultsForCurrency.length > 0) {
        setSelectedVault(vaultsForCurrency[0]);
      }
      if (!selectedAsset && wrappedAssets.length > 0) {
        setSelectedAsset(wrappedAssets[0]);
      }
    } else {
      // If the user manually selected a vault, but it's not available anymore, we reset the selection
      if (selectedVault && !vaultsForCurrency.includes(selectedVault) && vaultsForCurrency.length > 0) {
        setSelectedVault(vaultsForCurrency[0]);
      }
    }
  }, [manualVaultSelection, selectedAsset, selectedVault, vaultsForCurrency, wrappedAssets]);

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
    <div className="flex items-center justify-center h-full space-walk grid place-items-center py-4">
      <ConfirmationDialog
        redeemRequest={submittedRedeemRequest}
        visible={confirmationDialogVisible}
        onClose={() => setConfirmationDialogVisible(false)}
      />
      <div style={{ width: 500 }}>
        <form className="px-5 flex flex-col" onSubmit={handleSubmit(submitRequestRedeemExtrinsic)}>
          <div className="flex items-center">
            <Controller
              control={control}
              rules={{
                required: 'Amount is required',
                validate: (value) => {
                  if (!isCompatibleStellarAmount(value)) {
                    return 'Max 7 decimals';
                  }
                },
              }}
              name="amount"
              render={({ field, fieldState: { error } }) => (
                <LabelledInputField
                  autoSelect
                  error={error?.message}
                  label="From Amplitude"
                  type="number"
                  step="any"
                  style={{ flexGrow: 2 }}
                  {...field}
                />
              )}
            />
            <div className="px-1" />
            <AssetSelector
              assetPrefix={wrappedCurrencyPrefix}
              selectedAsset={selectedAsset}
              assets={wrappedAssets}
              onChange={setSelectedAsset}
              style={{ flexGrow: 1 }}
            />
          </div>
          <div className="flex align-center mt-4">
            <Checkbox
              size="sm"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target instanceof HTMLInputElement) {
                  setManualVaultSelection(e.target.checked);
                }
              }}
              checked={manualVaultSelection}
            />
            <span className="ml-2">Manually select vault</span>
          </div>
          {manualVaultSelection && (
            <VaultSelector vaults={vaultsForCurrency} onChange={setSelectedVault} selectedVault={selectedVault} />
          )}
          <Controller
            control={control}
            rules={{
              required: 'Stellar address is required',
              pattern: {
                value: StellarPublicKeyPattern,
                message: 'Stellar address is invalid',
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <LabelledInputField
                label="Stellar Address"
                error={error?.message}
                placeholder="Enter target Stellar address"
                type="text"
                {...field}
                style={{ marginTop: 8 }}
              />
            )}
            name="stellarAddress"
          />
          <FeeBox
            amountNative={amountNative}
            bridgedAsset={selectedAsset}
            extrinsic={requestRedeemExtrinsic}
            network="Stellar"
            nativeCurrency={nativeCurrency}
          />
          {walletAccount ? (
            <Button className="w-full" color="primary" loading={submissionPending} type="submit">
              Bridge
            </Button>
          ) : (
            <OpenWallet networkName={network} />
          )}
        </form>
      </div>
    </div>
  );
}

export default Redeem;
