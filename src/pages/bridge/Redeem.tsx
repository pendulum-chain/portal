import { h } from "preact";
import { Button, Checkbox, Divider, Modal } from "react-daisyui";
import { useCallback, useEffect, useMemo, useState } from "preact/hooks";
import LabelledInputField from "../../components/LabelledInputField";
import {
  RichRedeemRequest,
  useRedeemPallet,
} from "../../hooks/spacewalk/redeem";
import { useVaultRegistryPallet } from "../../hooks/spacewalk/vaultRegistry";
import { VaultRegistryVault } from "@polkadot/types/lookup";
import {
  calculateDeadline,
  convertCurrencyToStellarAsset,
} from "../../helpers/spacewalk";
import { Asset } from "stellar-sdk";
import {
  convertRawHexKeyToPublicKey,
  isPublicKey,
  StellarPublicKeyPattern,
} from "../../helpers/stellar";
import { useFeePallet } from "../../hooks/spacewalk/fee";
import {
  decimalToNative,
  decimalToStellarNative,
  nativeStellarToDecimal,
  nativeToDecimal,
} from "../../helpers/parseNumbers";
import Big from "big.js";
import { SubmittableExtrinsic } from "@polkadot/api/promise/types";
import { useGlobalState } from "../../GlobalStateProvider";
import { useNodeInfoState } from "../../NodeInfoProvider";
import { getErrors, getEventBySectionAndMethod } from "../../helpers/substrate";
import { toast } from "react-toastify";
import { CopyableAddress, PublicKey } from "../../components/PublicKey";
import { useSecurityPallet } from "../../hooks/spacewalk/security";
import { VoidFn } from "@polkadot/api-base/types";
import { DateTime } from "luxon";
import { AssetSelector, VaultSelector } from "../../components/Selector";
import { Controller, useForm } from "react-hook-form";

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
  const {
    bridgedAsset,
    extrinsic,
    nativeCurrency,
    wrappedCurrencyPrefix,
    network,
  } = props;
  const amount = props.amountNative;

  const wrappedCurrencyName = bridgedAsset
    ? (wrappedCurrencyPrefix || "") + bridgedAsset.getCode()
    : "";

  const { getFees, getTransactionFee } = useFeePallet();
  const fees = getFees();

  const [transactionFee, setTransactionFee] = useState<number>(0);

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

    return nativeStellarToDecimal(amount) - bridgeFee;
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

  const { subscribeActiveBlockNumber } = useSecurityPallet();
  const [activeBlockNumber, setActiveBlockNumber] = useState<number>(0);
  const [remainingDurationString, setRemainingDurationString] =
    useState<string>("");

  const totalAmount = redeemRequest
    ? nativeToDecimal(
        redeemRequest.request.amount.add(redeemRequest.request.fee).toString()
      ).toString()
    : "";
  const currency = redeemRequest?.request.asset;
  const asset = currency && convertCurrencyToStellarAsset(currency);

  const rawDestinationAddress = redeemRequest?.request.stellarAddress;
  const destination = rawDestinationAddress
    ? convertRawHexKeyToPublicKey(rawDestinationAddress.toHex()).publicKey()
    : "";

  useEffect(() => {
    let unsub: VoidFn = () => undefined;
    subscribeActiveBlockNumber((blockNumber) => {
      setActiveBlockNumber(blockNumber);
    }).then((u) => (unsub = u));

    return unsub;
  }, [subscribeActiveBlockNumber]);

  const deadline = useMemo(() => {
    const openTime = redeemRequest?.request.opentime.toNumber() || 0;
    const period = redeemRequest?.request.period.toNumber() || 0;
    const end = calculateDeadline(activeBlockNumber, openTime, period, 6);

    return end;
  }, [activeBlockNumber, redeemRequest]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newDeadlineString = deadline
        .diff(DateTime.now())
        .toFormat("hh:mm:ss");
      setRemainingDurationString(newDeadlineString);
    });

    return () => clearInterval(interval);
  }, [deadline]);

  return (
    <Modal open={visible}>
      <Modal.Header className="font-bold">Deposit</Modal.Header>
      <Button
        color="ghost"
        size="md"
        shape="circle"
        className="absolute right-4 top-4"
        onClick={onClose}
      >
        ✕
      </Button>
      <Modal.Body>
        <div className="text-center">
          <div className="text-xl">
            Send {totalAmount} {asset?.getCode()}
          </div>
          <div className="text-sm">
            (issued by{" "}
            {asset && (
              <PublicKey variant="short" publicKey={asset?.getIssuer()} />
            )}
            )
          </div>
          <div className="text mt-4">In a single transaction to</div>
          <CopyableAddress variant="short" publicKey={destination} />
          <div>Within {remainingDurationString}</div>
        </div>
        <Divider />
        <div>
          <div className="text-sm">
            Warning: Make sure that the USDC you are sending are issued by the
            correct issuer.
          </div>
        </div>
        <div className="text-sm mt-4">
          Note: If you have already made the payment, please wait for a few
          minutes for it to be confirmed.
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
  const [confirmationDialogVisible, setConfirmationDialogVisible] =
    useState(false);
  const [submissionPending, setSubmissionPending] = useState(false);
  const [submittedRedeemRequest, setSubmittedRedeemRequest] = useState<
    RichRedeemRequest | undefined
  >(undefined);
  const [manualVaultSelection, setManualVaultSelection] = useState(false);

  const { createRedeemRequestExtrinsic, getRedeemRequest } = useRedeemPallet();
  const { getVaults } = useVaultRegistryPallet();
  const { walletAccount } = useGlobalState().state;
  const { api } = useNodeInfoState().state;

  const {
    control,
    formState: { errors },
    handleSubmit,
    getValues,
    watch,
  } = useForm<RedeemFormInputs>({
    defaultValues: {
      amount: "0",
      stellarAddress: "",
    },
  });

  const { network, wrappedCurrencyPrefix, nativeCurrency } = props;

  // We watch the amount because we need to re-render the FeeBox constantly
  const amount = watch("amount");
  const { stellarAddress } = getValues();

  const vaults = getVaults();

  // The amount represented in the units of the native currency (as integer)
  const amountNative = useMemo(() => {
    return amount ? decimalToStellarNative(amount) : Big(0);
  }, [amount]);

  const wrappedAssets = useMemo(() => {
    return vaults
      .map((vault) => {
        const currency = vault.id.currencies.wrapped;
        console.log("currency", currency);
        return convertCurrencyToStellarAsset(currency);
      })
      .filter((asset): asset is Asset => {
        return asset != null;
      });
  }, [vaults]);

  const vaultsForCurrency = useMemo(() => {
    return vaults.filter((vault) => {
      if (!selectedAsset) {
        return false;
      }

      const vaultCurrencyAsAsset = convertCurrencyToStellarAsset(
        vault.id.currencies.wrapped
      );
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
    }
  }, [manualVaultSelection, selectedAsset, vaultsForCurrency, wrappedAssets]);

  const requestRedeemExtrinsic = useMemo(() => {
    if (
      !selectedVault ||
      !api ||
      !stellarAddress ||
      !isPublicKey(stellarAddress)
    ) {
      return undefined;
    }

    return createRedeemRequestExtrinsic(
      amountNative.toString(),
      stellarAddress,
      selectedVault.id
    );
  }, [
    amountNative,
    api,
    createRedeemRequestExtrinsic,
    selectedVault,
    stellarAddress,
  ]);

  const submitRequestRedeemExtrinsic = useCallback(() => {
    if (!requestRedeemExtrinsic || !api || !selectedVault) {
      return;
    }

    if (!walletAccount) {
      toast("No wallet connected", { type: "error" });
      return;
    }

    setSubmissionPending(true);

    requestRedeemExtrinsic
      .signAndSend(
        walletAccount.address,
        { signer: walletAccount.signer as any },
        (result) => {
          const { status, events } = result;

          const errors = getErrors(events, api);
          if (status.isInBlock) {
            if (errors.length > 0) {
              const errorMessage = `Transaction failed with errors: ${errors.join(
                "\n"
              )}`;
              console.error(errorMessage);
              toast(errorMessage, { type: "error" });
            }
          } else if (status.isFinalized) {
            const requestRedeemEvents = getEventBySectionAndMethod(
              events,
              "redeem",
              "RequestRedeem"
            );

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
        }
      )
      .catch((error) => {
        console.error("Transaction submission failed", error);
        toast("Transaction submission failed:" + error.toString(), {
          type: "error",
        });
        setSubmissionPending(false);
      });
  }, [
    api,
    getRedeemRequest,
    requestRedeemExtrinsic,
    selectedVault,
    walletAccount,
  ]);

  return (
    <div className="flex items-center justify-center h-full space-walk grid place-items-center py-4">
      <ConfirmationDialog
        redeemRequest={submittedRedeemRequest}
        visible={confirmationDialogVisible}
        onClose={() => setConfirmationDialogVisible(false)}
      />
      <div style={{ width: 500 }}>
        <form
          className="px-5 flex flex-col"
          onSubmit={handleSubmit(submitRequestRedeemExtrinsic)}
        >
          <div className="flex items-center">
            <Controller
              control={control}
              rules={{ required: "Amount is required" }}
              render={({ field }) => (
                <LabelledInputField
                  autoSelect
                  error={errors.amount?.message}
                  label="From Amplitude"
                  type="number"
                  style={{ flexGrow: 2 }}
                  onChange={(value: string) => field.onChange(value)}
                  value={field.value}
                />
              )}
              name="amount"
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
            <VaultSelector
              vaults={vaultsForCurrency}
              onChange={setSelectedVault}
              selectedVault={selectedVault}
            />
          )}
          <Controller
            control={control}
            rules={{
              required: "Stellar address is required",
              pattern: {
                value: StellarPublicKeyPattern,
                message: "Stellar address is invalid",
              },
            }}
            render={({ field }) => (
              <LabelledInputField
                label="Stellar Address"
                error={errors.stellarAddress?.message}
                placeholder="Enter target Stellar address"
                type="text"
                value={field.value}
                onChange={(value: string) => field.onChange(value)}
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
          <Button
            className="w-full"
            color="primary"
            loading={submissionPending}
            type="submit"
          >
            Bridge
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Redeem;
