/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from 'lodash';
import { useContext, useEffect, useMemo, useState } from 'preact/compat';
import { StateUpdater, Dispatch } from 'preact/hooks';
import { Asset } from 'stellar-sdk';
import { useGlobalState } from '../../GlobalStateProvider';
import { convertCurrencyToStellarAsset, shouldFilterOut } from '../../helpers/spacewalk';
import { stringifyStellarAsset } from '../../helpers/stellar';
import { BridgeContext } from '../../pages/spacewalk/bridge';
import { ExtendedRegistryVault, useVaultRegistryPallet } from './useVaultRegistryPallet';
import { ToastMessage, showToast } from '../../shared/showToast';
import { Balance } from '@polkadot/types/interfaces';

export interface BridgeSettings {
  selectedVault?: ExtendedRegistryVault;
  manualVaultSelection: boolean;
  vaults?: ExtendedRegistryVault[];
  vaultsForCurrency?: ExtendedRegistryVault[];
  wrappedAssets?: Asset[];
  selectedAsset?: Asset;
  setSelectedAsset: Dispatch<StateUpdater<Asset | undefined>>;
  setSelectedVault: Dispatch<StateUpdater<ExtendedRegistryVault | undefined>>;
  setManualVaultSelection: Dispatch<StateUpdater<boolean>>;
}

function useBridgeSettings(): BridgeSettings {
  const [extendedVaults, setExtendedVaults] = useState<ExtendedRegistryVault[]>();
  const [manualVaultSelection, setManualVaultSelection] = useState(false);
  const { getVaults, getVaultsWithIssuableTokens, getVaultsWithRedeemableTokens } = useVaultRegistryPallet();
  const [selectedVault, setSelectedVault] = useState<ExtendedRegistryVault>();
  const { selectedAsset, setSelectedAsset } = (useContext(BridgeContext) || {}) as any;
  const { tenantName } = useGlobalState();

  useEffect(() => {
    const combinedVaults: ExtendedRegistryVault[] = [];
    Promise.all([getVaultsWithIssuableTokens(), getVaultsWithRedeemableTokens()])
      .then(([vaultsWithIssuableTokens, vaultsWithRedeemableTokens]) => {
        getVaults().forEach((vaultFromRegistry: any) => {
          const vaultWithIssuable = vaultsWithIssuableTokens?.find(([id, _]) => id.eq(vaultFromRegistry.id));
          const vaultWithRedeemable = vaultsWithRedeemableTokens?.find(([id, _]) => id.eq(vaultFromRegistry.id));
          const extended: ExtendedRegistryVault = vaultFromRegistry;
          extended.issuableTokens = vaultWithIssuable ? (vaultWithIssuable[1] as unknown as Balance) : undefined;
          extended.redeemableTokens = vaultWithRedeemable ? (vaultWithRedeemable[1] as unknown as Balance) : undefined;
          combinedVaults.push(extended);
        });
        setExtendedVaults(combinedVaults);
      })
      .catch(() => {
        showToast(ToastMessage.BRIDGE_CONNECTION_ERROR);
      });
  }, [getVaults, setExtendedVaults, getVaultsWithIssuableTokens, getVaultsWithRedeemableTokens]);

  const wrappedAssets = useMemo(() => {
    if (!extendedVaults) return;
    const assets = extendedVaults
      .map((vault) => {
        const currency = vault.id.currencies.wrapped;
        return convertCurrencyToStellarAsset(currency);
      })
      .filter((asset): asset is Asset => {
        return asset != null && !shouldFilterOut(tenantName, asset);
      });
    // Deduplicate assets
    return _.uniqBy(assets, (asset: Asset) => stringifyStellarAsset(asset));
  }, [tenantName, extendedVaults]);

  const vaultsForCurrency = useMemo(() => {
    if (!extendedVaults) return;

    return extendedVaults.filter((vault) => {
      if (!selectedAsset) {
        return false;
      }

      const vaultCurrencyAsAsset = convertCurrencyToStellarAsset(vault.id.currencies.wrapped);
      return vaultCurrencyAsAsset && vaultCurrencyAsAsset.equals(selectedAsset);
    });
  }, [selectedAsset, extendedVaults]);

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
  }, [manualVaultSelection, selectedAsset, selectedVault, setSelectedAsset, vaultsForCurrency, wrappedAssets]);

  return {
    selectedVault,
    manualVaultSelection,
    vaults: extendedVaults,
    vaultsForCurrency,
    wrappedAssets,
    selectedAsset,
    setSelectedAsset,
    setSelectedVault,
    setManualVaultSelection,
  };
}

export default useBridgeSettings;
