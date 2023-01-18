import { useNodeInfoState } from "../../NodeInfoProvider";
import type { VaultRegistryVault } from "@polkadot/types/lookup";

export function useVaultRegistryPallet() {
  const { state } = useNodeInfoState();
  const { api } = state;

  if (!api) {
    return null;
  }

  const subscribeVaults = async (
    callback: (vaults: VaultRegistryVault[]) => void
  ) => {
    const unsub = await api.query.vaultRegistry.vaults.multi([], (result) => {
      const vaults = result.map(
        (vault) => vault.toJSON() as unknown as VaultRegistryVault
      );

      callback(vaults);
    });

    return unsub;
  };

  const getVaults = async () => {
    return await api.query.vaultRegistry.vaults.entries();
  };

  return {
    subscribeVaults,
    getVaults,
  };
}
