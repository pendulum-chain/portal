import _ from 'lodash';
import { StateUpdater, useEffect, useMemo, useState } from 'react';
import { Asset } from 'stellar-sdk';
import { convertCurrencyToStellarAsset } from '../../helpers/spacewalk';
import { stringifyStellarAsset } from '../../helpers/stellar';
import { ExtendedRegistryVault, useVaultRegistryPallet } from './vaultRegistry';

export interface BridgeSettings {
  selectedVault?: ExtendedRegistryVault;
  manualVaultSelection: boolean;
  vaults?: ExtendedRegistryVault[];
  vaultsForCurrency?: ExtendedRegistryVault[];
  wrappedAssets?: Asset[];
  selectedAsset?: Asset;
  setSelectedAsset: StateUpdater<Asset | undefined>;
  setSelectedVault: StateUpdater<ExtendedRegistryVault | undefined>;
  setManualVaultSelection: StateUpdater<boolean>;
}

function useVaults(): BridgeSettings {
  const [vaults, setExtendedVaults] = useState<ExtendedRegistryVault[]>();
  const [manualVaultSelection, setManualVaultSelection] = useState(false);
  const { getVaults, getVaultsWithIssuableTokens } = useVaultRegistryPallet();
  const [selectedAsset, setSelectedAsset] = useState<Asset>();
  const [selectedVault, setSelectedVault] = useState<ExtendedRegistryVault>();

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

  return {
    selectedVault,
    manualVaultSelection,
    vaults,
    vaultsForCurrency,
    wrappedAssets,
    selectedAsset,
    setSelectedAsset,
    setSelectedVault,
    setManualVaultSelection,
  };
}

export default useVaults;
