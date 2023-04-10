import { VoidFn } from '@polkadot/api-base/types';
import { SubmittableExtrinsic } from '@polkadot/api/promise/types';
import { VaultRegistryVault } from '@polkadot/types/lookup';
import Big from 'big.js';
import { DateTime } from 'luxon';
import { h } from 'preact';
import { Button, Checkbox, Divider, Modal } from 'react-daisyui';
import { useCallback, useEffect, useMemo, useState } from 'preact/hooks';
import { toast } from 'react-toastify';
import { Asset } from 'stellar-sdk';
import { useGlobalState } from '../../GlobalStateProvider';
import { useNodeInfoState } from '../../NodeInfoProvider';
import LabelledInputField from '../../components/LabelledInputField';
import { RichIssueRequest, useIssuePallet } from '../../hooks/spacewalk/issue';
import { useVaultRegistryPallet } from '../../hooks/spacewalk/vaultRegistry';
import { calculateDeadline, convertCurrencyToStellarAsset, deriveShortenedRequestId } from '../../helpers/spacewalk';
import { convertRawHexKeyToPublicKey, isCompatibleStellarAmount, stringifyStellarAsset } from '../../helpers/stellar';
import OpenWallet from '../../components/OpenWallet';
import { CopyableAddress, PublicKey } from '../../components/PublicKey';
import { AssetSelector, VaultSelector } from '../../components/Selector';
import { decimalToStellarNative, nativeStellarToDecimal, nativeToDecimal } from '../../helpers/parseNumbers';
import { getErrors, getEventBySectionAndMethod } from '../../helpers/substrate';
import { useFeePallet } from '../../hooks/spacewalk/fee';
import { useSecurityPallet } from '../../hooks/spacewalk/security';
import { Controller, useForm } from 'react-hook-form';
import _ from 'lodash';

interface FeeBoxProps {
  bridgedAsset?: Asset;
  // The amount of the bridged asset denoted in the smallest unit of the asset
  amountNative: Big;
  extrinsic?: SubmittableExtrinsic;
  network: string;
  wrappedCurrencyPrefix?: string;
  nativeCurrency: string;
}

function FeeBox(props: FeeBoxProps): JSX.Element {
  const { bridgedAsset, extrinsic, network, wrappedCurrencyPrefix, nativeCurrency } = props;

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
    return nativeStellarToDecimal(amount.mul(fees.issueFee));
  }, [amount, fees]);

  const griefingCollateral = useMemo(() => {
    return nativeStellarToDecimal(amount.mul(fees.issueGriefingCollateral));
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
        <span>Security Deposit</span>
        <span>
          {griefingCollateral.toString()} {nativeCurrency}
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
  issueRequest: RichIssueRequest | undefined;
  onClose: () => void;
  visible: boolean;
}

function ConfirmationDialog(props: ConfirmationDialogProps): JSX.Element {
  const { issueRequest, visible, onClose } = props;

  const { subscribeActiveBlockNumber } = useSecurityPallet();
  const [activeBlockNumber, setActiveBlockNumber] = useState<number>(0);
  const [remainingDurationString, setRemainingDurationString] = useState<string>('');

  const totalAmount = useMemo(
    () =>
      issueRequest
        ? nativeStellarToDecimal(issueRequest.request.amount.add(issueRequest.request.fee).toString()).toString()
        : '',
    [issueRequest],
  );

  const asset = useMemo(() => {
    const currency = issueRequest?.request.asset;
    return currency && convertCurrencyToStellarAsset(currency);
  }, [issueRequest?.request.asset]);

  const destination = useMemo(() => {
    const rawDestinationAddress = issueRequest?.request.stellarAddress;
    return rawDestinationAddress ? convertRawHexKeyToPublicKey(rawDestinationAddress.toHex()).publicKey() : '';
  }, [issueRequest?.request.stellarAddress]);

  const expectedStellarMemo = useMemo(() => {
    if (!issueRequest) {
      return '';
    }
    // For issue requests we use a shorter identifier for the memo
    return deriveShortenedRequestId(issueRequest.id);
  }, [issueRequest]);

  useEffect(() => {
    let unsub: VoidFn = () => undefined;
    subscribeActiveBlockNumber((blockNumber) => {
      setActiveBlockNumber(blockNumber);
    }).then((u) => (unsub = u));

    return unsub;
  }, [subscribeActiveBlockNumber]);

  const deadline = useMemo(() => {
    const openTime = issueRequest?.request.opentime.toNumber() || 0;
    const period = issueRequest?.request.period.toNumber() || 0;
    const end = calculateDeadline(activeBlockNumber, openTime, period, 12);

    return end;
  }, [activeBlockNumber, issueRequest]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newDeadlineString = deadline.diff(DateTime.now()).toFormat('hh:mm:ss');
      setRemainingDurationString(newDeadlineString);
    });

    return () => clearInterval(interval);
  }, [deadline]);

  return (
    <Modal open={visible}>
      <Modal.Header className="font-bold">Deposit</Modal.Header>
      <Button color="ghost" size="md" shape="circle" className="absolute right-4 top-4" onClick={onClose}>
        ✕
      </Button>
      <Modal.Body>
        <div className="text-center">
          <div className="text-xl">
            Send {totalAmount} {asset?.getCode()}
          </div>
          <div className="text-sm">
            (issued by {asset && <PublicKey variant="short" publicKey={asset?.getIssuer()} />})
          </div>
          <div className="text mt-4">With the text memo</div>
          {issueRequest && <CopyableAddress variant="short" publicKey={expectedStellarMemo} />}
          <div className="text mt-4">In a single transaction to</div>
          <CopyableAddress variant="short" publicKey={destination} />
          <div className="mt-4">Within {remainingDurationString}</div>
        </div>
        <Divider />
        <div>
          <div className="text-sm">
            Warning: Make sure that the USDC you are sending are issued by the correct issuer.
          </div>
        </div>
        <div className="text-sm mt-4">
          Note: If you have already made the payment, please wait for a few minutes for it to be confirmed.
        </div>
      </Modal.Body>

      <Modal.Actions className="justify-center">
        <Button color="primary" onClick={onClose}>
          I have made the payment
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

interface IssueFormInputs {
  amount: string;
}

interface IssueProps {
  network: string;
  wrappedCurrencyPrefix: string;
  nativeCurrency: string;
}

function Issue(props: IssueProps): JSX.Element {
  const { network, wrappedCurrencyPrefix, nativeCurrency } = props;

  const [selectedVault, setSelectedVault] = useState<VaultRegistryVault>();
  const [selectedAsset, setSelectedAsset] = useState<Asset>();
  const [manualVaultSelection, setManualVaultSelection] = useState(false);
  const [confirmationDialogVisible, setConfirmationDialogVisible] = useState(false);
  const [submissionPending, setSubmissionPending] = useState(false);
  const [submittedIssueRequest, setSubmittedIssueRequest] = useState<RichIssueRequest | undefined>(undefined);

  const { createIssueRequestExtrinsic, getIssueRequest } = useIssuePallet();
  const { getVaults } = useVaultRegistryPallet();
  const { walletAccount } = useGlobalState();
  const { api } = useNodeInfoState().state;

  const { control, handleSubmit, watch } = useForm<IssueFormInputs>({
    defaultValues: {
      amount: '0',
    },
  });

  console.log('walletaccount', walletAccount);

  // We watch the amount because we need to re-render the FeeBox constantly
  const amount = watch('amount');
  const vaults = getVaults();

  // The amount represented in the units of the native currency (as integer)
  const amountNative = useMemo(() => {
    return amount ? decimalToStellarNative(amount) : Big(0);
  }, [amount]);

  const wrappedAssets = useMemo(() => {
    const assets = vaults
      .map((vault) => {
        const currency = vault.id.currencies.wrapped;
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

  const requestIssueExtrinsic = useMemo(() => {
    if (!selectedVault || !api) {
      return undefined;
    }

    return createIssueRequestExtrinsic(amountNative.toString(), selectedVault.id);
  }, [amountNative, api, createIssueRequestExtrinsic, selectedVault]);

  const submitRequestIssueExtrinsic = useCallback(() => {
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
  }, [api, getIssueRequest, requestIssueExtrinsic, selectedVault, walletAccount]);

  return (
    <div className="flex items-center justify-center h-full space-walk grid place-items-center py-4">
      <ConfirmationDialog
        issueRequest={submittedIssueRequest}
        visible={confirmationDialogVisible}
        onClose={() => setConfirmationDialogVisible(false)}
      />
      <div style={{ width: 500 }}>
        <form className="px-5 flex flex-col" onSubmit={handleSubmit(submitRequestIssueExtrinsic)}>
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
                  label="From Stellar"
                  type="number"
                  step="any"
                  style={{ flexGrow: 2 }}
                  {...field}
                />
              )}
            />
            <div className="px-1" />
            <AssetSelector
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
          <FeeBox
            amountNative={amountNative}
            bridgedAsset={selectedAsset}
            extrinsic={requestIssueExtrinsic}
            network={network}
            wrappedCurrencyPrefix={wrappedCurrencyPrefix}
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

export default Issue;
