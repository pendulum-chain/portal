import { h } from "preact";
import { Button, Checkbox, Form, Modal } from "react-daisyui";
import { useCallback, useEffect, useMemo, useState } from "preact/hooks";
import LabelledInputField from "../../components/LabelledInputField";
import LabelledSelector from "../../components/LabelledSelector";
import { RichIssueRequest, useIssuePallet } from "../../hooks/spacewalk/issue";
import { useVaultRegistryPallet } from "../../hooks/spacewalk/vaultRegistry";
import { VaultRegistryVault } from "@polkadot/types/lookup";
import { convertCurrencyToStellarAsset } from "../../helpers/spacewalk";
import { Asset } from "stellar-sdk";
import { stringifyStellarAsset } from "../../helpers/stellar";
import { useFeePallet } from "../../hooks/spacewalk/fee";
import { toUnit } from "../../helpers/parseNumbers";
import Big from "big.js";
import { SubmittableExtrinsic } from "@polkadot/api/promise/types";
import { useGlobalState } from "../../GlobalStateProvider";
import { useNodeInfoState } from "../../NodeInfoProvider";
import { getErrors, getEventBySectionAndMethod } from "../../helpers/substrate";
import { toast } from "react-toastify";
import { H256 } from "@polkadot/types/interfaces";

interface AssetSelectorProps {
  selectedAsset?: Asset;
  onChange: (asset: Asset) => void;
  assets: Asset[];
  style?: React.CSSProperties;
}

function AssetSelector(props: AssetSelectorProps): JSX.Element {
  const { assets, selectedAsset } = props;

  const items = assets.map((asset) => {
    return {
      displayName: asset.getCode(),
      id: stringifyStellarAsset(asset),
    };
  });

  const selectedAssetItem = selectedAsset
    ? {
        displayName: selectedAsset.getCode(),
        id: stringifyStellarAsset(selectedAsset),
      }
    : undefined;

  return (
    <LabelledSelector
      items={items}
      label="Asset"
      onChange={(newItem) => {
        const newAsset = assets.find((asset) => {
          return stringifyStellarAsset(asset) === newItem.id;
        });
        newAsset && props.onChange(newAsset);
      }}
      value={selectedAssetItem}
      style={props.style}
    />
  );
}

interface VaultSelectorProps {
  vaults: VaultRegistryVault[];
  selectedVault?: VaultRegistryVault;
  onChange: (vault: VaultRegistryVault) => void;
}

function VaultSelector(props: VaultSelectorProps): JSX.Element {
  const { vaults, selectedVault } = props;

  const items = vaults.map((vault) => {
    return {
      displayName: vault.id.accountId.toString(),
      id: vault.id,
    };
  });

  const selectedVaultItem = selectedVault
    ? {
        displayName: selectedVault.id.accountId.toString(),
        id: selectedVault.id,
      }
    : undefined;

  return (
    <LabelledSelector
      items={items}
      onChange={(newItem) => {
        const newVault = vaults.find((vault) => {
          return vault.id === newItem.id;
        });
        newVault && props.onChange(newVault);
      }}
      value={selectedVaultItem}
    />
  );
}

interface FeeBoxProps {
  bridgedAsset?: Asset;
  amountString: string;
  extrinsic?: SubmittableExtrinsic;
}

function FeeBox(props: FeeBoxProps): JSX.Element {
  const { bridgedAsset, extrinsic } = props;

  // TODO - get this from somewhere
  const network = "Amplitude"; // or Pendulum
  const nativeCurrency = network === "Amplitude" ? "AMPE" : "PEN";
  const wrappedCurrencyPrefix = network === "Amplitude" ? "a" : "p";

  const wrappedCurrencyName = bridgedAsset
    ? wrappedCurrencyPrefix + bridgedAsset.getCode()
    : "";

  const { getFees, getTransactionFee } = useFeePallet();
  const fees = getFees();

  const [transactionFee, setTransactionFee] = useState<number>(0);

  useEffect(() => {
    if (!extrinsic) {
      return;
    }

    getTransactionFee(extrinsic).then((fee) => {
      setTransactionFee(toUnit(fee));
    });
  }, [extrinsic, getTransactionFee, setTransactionFee]);

  const amount = useMemo(() => {
    try {
      return new Big(props.amountString);
    } catch (e) {
      return new Big(0);
    }
  }, [props.amountString]);

  const bridgeFee = useMemo(() => {
    return toUnit(amount.mul(fees.issueFee));
  }, [amount, fees]);

  const griefingCollateral = useMemo(() => {
    return toUnit(amount.mul(fees.issueGriefingCollateral));
  }, [amount, fees]);

  const totalAmount = useMemo(() => {
    if (amount.cmp(0) === 0) {
      return 0;
    }

    return amount
      .sub(bridgeFee)
      .sub(griefingCollateral)
      .sub(transactionFee)
      .toNumber();
  }, [amount, bridgeFee, griefingCollateral, transactionFee]);

  return (
    <div className="shadow bg-base-200 rounded-lg p-4 my-4 flex flex-col">
      <div className="flex justify-between">
        <span>To {network}</span>
        <span>
          {totalAmount.toFixed(4)} {wrappedCurrencyName}
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
  visible: boolean;
  toggleVisible: () => void;
  issueRequest: RichIssueRequest | undefined;
}

function ConfirmationDialog(props: ConfirmationDialogProps): JSX.Element {
  const { issueRequest, visible, toggleVisible } = props;

  return (
    <Modal open={visible}>
      <Modal.Header className="font-bold">Deposit</Modal.Header>

      <Modal.Body>Send {issueRequest?.request.amount.toString()} </Modal.Body>

      <Modal.Actions>
        <Button onClick={toggleVisible}>Yay!</Button>
      </Modal.Actions>
    </Modal>
  );
}

function Issue(): JSX.Element {
  const [amount, setAmount] = useState<string>("0");
  const [selectedVault, setSelectedVault] = useState<VaultRegistryVault>();
  const [selectedAsset, setSelectedAsset] = useState<Asset>();
  const [manualVaultSelection, setManualVaultSelection] = useState(false);
  const [confirmationDialogVisible, setConfirmationDialogVisible] =
    useState(false);
  const [submissionPending, setSubmissionPending] = useState(false);

  const [submittedIssueRequestId, setSubmittedIssueRequestId] =
    useState<H256 | null>(null);

  const { createIssueRequestExtrinsic, getIssueRequest } = useIssuePallet();
  const { getVaults } = useVaultRegistryPallet();
  const { walletAccount } = useGlobalState().state;
  const { api } = useNodeInfoState().state;

  const vaults = getVaults();

  const wrappedAssets = useMemo(() => {
    return vaults
      .map((vault) => {
        const currency = vault.id.currencies.wrapped;
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

  const requestIssueExtrinsic = useMemo(() => {
    if (!selectedVault || !amount) {
      return undefined;
    }

    return createIssueRequestExtrinsic(amount, selectedVault.id);
  }, [amount, createIssueRequestExtrinsic, selectedVault]);

  const submitRequestIssueExtrinsic = useCallback(() => {
    if (!requestIssueExtrinsic || !walletAccount || !api) {
      return;
    }

    setSubmissionPending(true);

    requestIssueExtrinsic
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
            const requestIssueEvents = getEventBySectionAndMethod(
              events,
              "issue",
              "RequestIssue"
            );

            for (const requestIssueEvent of requestIssueEvents) {
              // We do not have a proper type for this event, so we have to cast it to any
              const issueId = (requestIssueEvent.data as any).issueId;
              setSubmittedIssueRequestId(issueId);
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
        toast("Transaction submission failed", { type: "error" });
        setSubmissionPending(false);
      });
  }, [api, requestIssueExtrinsic, walletAccount]);

  const submittedIssueRequestData = useMemo(() => {
    if (!submittedIssueRequestId || !api) {
      return undefined;
    }

    const issueRequest = getIssueRequest(submittedIssueRequestId);
    return issueRequest;
  }, [submittedIssueRequestId, api, getIssueRequest]);

  return (
    <div className="flex items-center justify-center h-full space-walk grid place-items-center p-5">
      <ConfirmationDialog
        issueRequest={submittedIssueRequestData}
        visible={confirmationDialogVisible}
        toggleVisible={() => setConfirmationDialogVisible(false)}
      />
      <div style={{ width: 500 }}>
        <div className="box">
          <div className="px-5 flex flex-col">
            <div className="flex items-center">
              <LabelledInputField
                autoSelect
                label="From Stellar"
                type="number"
                value={amount}
                onChange={setAmount}
                style={{ flexGrow: 2 }}
              />
              <AssetSelector
                selectedAsset={selectedAsset}
                assets={wrappedAssets}
                onChange={setSelectedAsset}
                style={{ flexGrow: 1 }}
              />
            </div>
            <Form className="shadow bg-base-200 rounded-lg p-4 my-4">
              <Form.Label title="Manually select vault">
                <Checkbox
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.target instanceof HTMLInputElement) {
                      setManualVaultSelection(e.target.checked);
                    }
                  }}
                  checked={manualVaultSelection}
                />
              </Form.Label>
            </Form>
            {manualVaultSelection && (
              <VaultSelector
                vaults={vaultsForCurrency}
                onChange={setSelectedVault}
                selectedVault={selectedVault}
              />
            )}
            <FeeBox
              amountString={amount}
              bridgedAsset={selectedAsset}
              extrinsic={requestIssueExtrinsic}
            />
          </div>
          <div className="parity">
            <Button
              color="primary"
              disabled={!walletAccount}
              loading={submissionPending}
              onClick={submitRequestIssueExtrinsic}
            >
              <span className="uppercase">Confirm</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

  export default Issue;
