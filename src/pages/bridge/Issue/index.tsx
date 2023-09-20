/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupResolver } from '@hookform/resolvers/yup';
import Big from 'big.js';
import _ from 'lodash';
import { useCallback, useEffect, useMemo, useState } from 'preact/hooks';
import { Button, Checkbox } from 'react-daisyui';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Asset } from 'stellar-sdk';
import { useGlobalState } from '../../../GlobalStateProvider';
import { useNodeInfoState } from '../../../NodeInfoProvider';
import From, { IssueFormValues } from '../../../components/Form/From';
import { VaultSelector } from '../../../components/Selector';
import OpenWallet from '../../../components/Wallet';
import { convertCurrencyToStellarAsset } from '../../../helpers/spacewalk';
import { stringifyStellarAsset } from '../../../helpers/stellar';
import { getErrors, getEventBySectionAndMethod } from '../../../helpers/substrate';
import { RichIssueRequest, useIssuePallet } from '../../../hooks/spacewalk/issue';
import { ExtendedRegistryVault, useVaultRegistryPallet } from '../../../hooks/spacewalk/vaultRegistry';
import { decimalToStellarNative } from '../../../shared/parseNumbers';
import { ConfirmationDialog } from './ConfirmationDialog';
import { FeeBox } from './FeeBox';
import { getIssueValidationSchema } from './IssueValidationSchema';

interface IssueProps {
  network: string;
  wrappedCurrencySuffix: string;
  nativeCurrency: string;
}

function Issue(props: IssueProps): JSX.Element {
  const { network, wrappedCurrencySuffix, nativeCurrency } = props;

  const [selectedVault, setSelectedVault] = useState<ExtendedRegistryVault>();
  const [selectedAsset, setSelectedAsset] = useState<Asset>();
  const [manualVaultSelection, setManualVaultSelection] = useState(false);
  const [confirmationDialogVisible, setConfirmationDialogVisible] = useState(false);
  const [submissionPending, setSubmissionPending] = useState(false);
  const [submittedIssueRequest, setSubmittedIssueRequest] = useState<RichIssueRequest | undefined>(undefined);
  const [vaults, setExtendedVaults] = useState<ExtendedRegistryVault[]>();

  const { createIssueRequestExtrinsic, getIssueRequest } = useIssuePallet();
  const { getVaults, getVaultsWithIssuableTokens } = useVaultRegistryPallet();
  const { walletAccount, dAppName } = useGlobalState();

  const { api } = useNodeInfoState().state;

  const { handleSubmit, watch, register, formState, setValue } = useForm<IssueFormValues>({
    defaultValues: {
      amount: 0,
    },
    resolver: yupResolver(getIssueValidationSchema(10)),
  });

  // We watch the amount because we need to re-render the FeeBox constantly
  const amount = watch('amount');
  console.log(amount);
  useEffect(() => {
    const combinedVaults: ExtendedRegistryVault[] = [];
    getVaultsWithIssuableTokens().then((vaultsWithIssuableTokens) => {
      getVaults().forEach((vaultFromRegistry) => {
        const found = vaultsWithIssuableTokens?.find(([id, _]) => id.eq(vaultFromRegistry.id));
        const extended: ExtendedRegistryVault = vaultFromRegistry;
        extended.issuableTokens = found ? found[1] : undefined;
        combinedVaults.push(extended);
      });
      setExtendedVaults(combinedVaults);
    });
  }, [getVaults, setExtendedVaults, getVaultsWithIssuableTokens]);

  // The amount represented in the units of the native currency (as integer)
  const amountNative = useMemo(() => {
    return amount ? decimalToStellarNative(amount) : Big(0);
  }, [amount]);

  const wrappedAssets = useMemo(() => {
    if (!vaults) return;
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
    if (!vaults) return;

    return vaults.filter((vault) => {
      if (!selectedAsset) {
        return false;
      }

      const vaultCurrencyAsAsset = convertCurrencyToStellarAsset(vault.id.currencies.wrapped);
      return vaultCurrencyAsAsset && vaultCurrencyAsAsset.equals(selectedAsset);
    });
  }, [selectedAsset, vaults]);

  useEffect(() => {
    if (vaultsForCurrency && wrappedAssets) {
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
    }
  }, [manualVaultSelection, selectedAsset, selectedVault, vaultsForCurrency, wrappedAssets]);

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
            inputProps={register('amount')}
            error={formState.errors.amount?.message}
            setValue={(n: number) => setValue('amount', n)}
            max={10} // Account Balance
          />
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
          {manualVaultSelection && vaultsForCurrency && (
            <VaultSelector
              vaults={vaultsForCurrency}
              onChange={setSelectedVault}
              selectedVault={selectedVault}
              showMaxTokensFor="issuableTokens"
            />
          )}
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
              // disabled={!!form.formState.errors.from}
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

export default Issue;
