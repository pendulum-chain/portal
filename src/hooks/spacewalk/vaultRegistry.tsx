import type { VaultRegistryVault } from "@polkadot/types/lookup";
import { useEffect, useMemo, useState } from "preact/hooks";
import { AccountId32 } from "@polkadot/types/interfaces";
import { useNodeInfoState } from "../../NodeInfoProvider";
import { convertRawHexKeyToPublicKey } from "../../helpers/stellar";

export function useVaultRegistryPallet() {
  const { api } = useNodeInfoState().state;

  const [vaults, setVaults] = useState<VaultRegistryVault[]>([]);

  useEffect(() => {
    if (!api) {
      return;
    }

    let unsubscribe: () => void;

    api.query.vaultRegistry.vaults.entries().then((entries) => {
      const typedEntries = entries.map(([, value]) => {
        return value.unwrap();
      });

      setVaults(typedEntries);
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
        const publicKeyBinary =
          await api.query.vaultRegistry.vaultStellarPublicKey(accountId);

        if (publicKeyBinary.isNone) {
          return undefined;
        } else {
          return convertRawHexKeyToPublicKey(publicKeyBinary.toHex());
        }
      },
    };
  }, [api, vaults]);

  return memo;
}
