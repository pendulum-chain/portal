import type { VaultRegistryVault } from "@polkadot/types/lookup";
import { SpacewalkPrimitivesCurrencyId } from "@polkadot/types/lookup";
import { useEffect, useMemo, useState } from "preact/hooks";
import { AccountId32 } from "@polkadot/types/interfaces";
import { useNodeInfoState } from "../../NodeInfoProvider";
import { convertRawHexKeyToPublicKey } from "../../helpers/stellar";

export function useVaultRegistryPallet() {
  const { api } = useNodeInfoState().state;

  const [vaults, setVaults] = useState<VaultRegistryVault[]>([]);
  const [griefingCollateralCurrency, setGriefingCollateralCurrency] = useState<
    SpacewalkPrimitivesCurrencyId | undefined
  >(undefined);

  useEffect(() => {
    if (!api) {
      return;
    }

    let unsubscribe: () => void;

    api.query.vaultRegistry.vaults.entries().then((entries) => {
      let typedEntries = entries.map(([key, value]) => {
        return value.unwrap();
      });

      setVaults(typedEntries);
    });

    setGriefingCollateralCurrency(
      api.consts.vaultRegistry.getGriefingCollateralCurrencyId
    );

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
          return convertRawHexKeyToPublicKey(publicKeyBinary.toHex());
        }
      },
      getGriefingCollateralCurrency() {
        return griefingCollateralCurrency;
      },
    };
  }, [api, vaults]);

  return memo;
}
