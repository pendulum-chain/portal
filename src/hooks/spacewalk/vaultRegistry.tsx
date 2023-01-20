import type { VaultRegistryVault } from "@polkadot/types/lookup";
import { useEffect, useMemo, useState } from "preact/hooks";
import { AccountId32 } from "@polkadot/types/interfaces";
import { useNodeInfoState } from "../../NodeInfoProvider";
import { convertRawToPublicKey } from "../../helpers/stellar";

export function useVaultRegistryPallet() {
  const { api } = useNodeInfoState().state;

  const [vaults, setVaults] = useState<VaultRegistryVault[]>([]);

  useEffect(() => {
    if (!api) {
      return;
    }

    let unsubscribe: () => void;

    api.query.vaultRegistry.vaults.entries().then((entries) => {
      let richEntries = entries.map(([key, value]) => {
        return value.toJSON() as unknown as VaultRegistryVault;
      });

      setVaults(richEntries);
    });

    return () => unsubscribe && unsubscribe();
  }, [api]);

  const memo = useMemo(() => {
    return {
      getVaults() {
        return vaults;
      },
      async getVaultStellarPublicKey(accountId: AccountId32) {
        if (!api) {
          return undefined;
        }
        let publicKeyBinary =
          await api.query.vaultRegistry.vaultStellarPublicKey(accountId);

        if (publicKeyBinary.isNone) {
          return undefined;
        } else {
          return convertRawToPublicKey(publicKeyBinary.toHex());
        }
      },
    };
  }, [api, vaults]);

  return memo;
}
