import Big from 'big.js';
import { useEffect, useMemo } from 'preact/compat';
import { StateUpdater, Dispatch } from 'preact/hooks';
import { Asset } from '@stellar/stellar-sdk';
import { uniqBy } from 'lodash';
import { useGlobalState } from '../../GlobalStateProvider';
import { convertCurrencyToStellarAsset, shouldFilterOut } from '../../helpers/spacewalk';
import { stringifyStellarAsset } from '../../helpers/stellar';
import { equalExtendedVaults, ExtendedRegistryVault, useVaultRegistryPallet } from './useVaultRegistryPallet';
import { ToastMessage, showToast } from '../../shared/showToast';
import { BridgeDirection, useBridgeContext } from '../../pages/spacewalk/bridge';

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
  bridgeDirection: BridgeDirection;
}

/// Finds the best vault for the given asset based on the issuable or redeemable tokens of each vault.
function findBestVaultForAsset(
  vaults: ExtendedRegistryVault[],
  asset: Asset,
  bridgeDirection: BridgeDirection,
): ExtendedRegistryVault | undefined {
  const vaultsWithAsset = vaults.filter((vault) => {
    const vaultCurrencyAsAsset = convertCurrencyToStellarAsset(vault.id.currencies.wrapped);
    return vaultCurrencyAsAsset && vaultCurrencyAsAsset.equals(asset);
  });

  if (vaultsWithAsset.length === 0) {
    return;
  }

  return vaultsWithAsset.reduce((bestVault, currentVault) => {
    if (!bestVault) {
      return currentVault;
    }

    if (bridgeDirection === BridgeDirection.Issue) {
      if (currentVault.issuableTokens?.gt(bestVault.issuableTokens || new Big(0))) {
        return currentVault;
      }
    } else {
      if (currentVault.redeemableTokens?.gt(bestVault.redeemableTokens || new Big(0))) {
        return currentVault;
      }
    }

    return bestVault;
  });
}

function useBridgeSettings(): BridgeSettings {
  const { getVaults, getVaultsWithIssuableTokens, getVaultsWithRedeemableTokens } = useVaultRegistryPallet();
  const {
    selectedAsset,
    setSelectedAsset,
    selectedVault,
    setSelectedVault,
    manualVaultSelection,
    setManualVaultSelection,
    bridgeDirection,
    extendedVaults,
    setExtendedVaults,
  } = useBridgeContext();

  const { tenantName } = useGlobalState();

  useEffect(() => {
    const combinedVaults: ExtendedRegistryVault[] = [];
    Promise.all([getVaultsWithIssuableTokens(), getVaultsWithRedeemableTokens()])
      .then(([vaultsWithIssuableTokens, vaultsWithRedeemableTokens]) => {
        getVaults().forEach((vaultFromRegistry) => {
          const vaultWithIssuable = vaultsWithIssuableTokens?.find(([id, _]) => id.eq(vaultFromRegistry.id));
          const vaultWithRedeemable = vaultsWithRedeemableTokens?.find(([id, _]) => id.eq(vaultFromRegistry.id));
          const extended: ExtendedRegistryVault = vaultFromRegistry;
          extended.issuableTokens = vaultWithIssuable
            ? new Big((vaultWithIssuable[1].toJSON() as { amount: string }).amount)
            : undefined;
          extended.redeemableTokens = vaultWithRedeemable
            ? new Big((vaultWithRedeemable[1].toJSON() as { amount: string }).amount)
            : undefined;
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
    return uniqBy(assets, (asset: Asset) => stringifyStellarAsset(asset));
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
        if (vaultsForCurrency.length > 0 && selectedAsset) {
          const bestVault = findBestVaultForAsset(vaultsForCurrency, selectedAsset, bridgeDirection);
          setSelectedVault(bestVault);
        }
        if (!selectedAsset && wrappedAssets.length > 0) {
          // Try to select the xlm asset by default
          const xlmAsset = wrappedAssets.find((asset) => asset.getCode() === 'XLM');
          setSelectedAsset(xlmAsset || wrappedAssets[0]);
        }
      } else {
        // If the user manually selected a vault, but it's not available anymore, we reset the selection
        if (
          selectedVault &&
          !vaultsForCurrency.some((a) => equalExtendedVaults(a, selectedVault)) &&
          vaultsForCurrency.length > 0
        ) {
          setSelectedVault(vaultsForCurrency[0]);
        }
      }
    }
  }, [
    bridgeDirection,
    manualVaultSelection,
    selectedAsset,
    selectedVault,
    setSelectedAsset,
    setSelectedVault,
    vaultsForCurrency,
    wrappedAssets,
  ]);

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
    bridgeDirection,
  };
}

export default useBridgeSettings;
