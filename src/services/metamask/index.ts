import { WalletAccount } from '@talismn/connect-wallets';
import { SignerPayloadJSON, SignerPayloadRaw, SignerResult } from '@polkadot/types/types';
import { enablePolkadotSnap } from '@chainsafe/metamask-polkadot-adapter';
import type { MetamaskPolkadotSnap } from '@chainsafe/metamask-polkadot-adapter/build/snap';
import { MetamaskSnapApi } from '@chainsafe/metamask-polkadot-adapter/build/types';
import type { SnapNetworks, SnapConfig } from '@chainsafe/metamask-polkadot-types';

import { TenantName } from '../../models/Tenant';
import { trimAddress } from '../../helpers/addressFormatter';

export const METAMASK_EXTENSION_NAME = 'metamask';

export function tenantToSnapNetwork(tenantName: TenantName): SnapNetworks {
  const tenantNetworkMap: { [key in TenantName]?: SnapNetworks } = {
    [TenantName.Pendulum]: 'polkadot',
    [TenantName.Amplitude]: 'kusama',
  };

  return tenantNetworkMap[tenantName] || 'kusama';
}

export async function installPolkadotSnap(relayChain: SnapNetworks): Promise<boolean> {
  try {
    await enablePolkadotSnap({ networkName: relayChain } as SnapConfig);
    return true;
  } catch (err) {
    console.error('Failed to install PolkadotSnap, ', err);
    return false;
  }
}

export interface InitiatePolkadotSnapResponse {
  isSnapInstalled: boolean;
  snap?: MetamaskPolkadotSnap;
}

export async function initiatePolkadotSnap(relayChain: SnapNetworks): Promise<InitiatePolkadotSnapResponse> {
  try {
    const metamaskPolkadotSnap = await enablePolkadotSnap({ networkName: relayChain } as SnapConfig);
    return { isSnapInstalled: true, snap: metamaskPolkadotSnap };
  } catch (e) {
    console.error(e);
    return { isSnapInstalled: false };
  }
}

const getProvider = async (tenantName: TenantName) => {
  const provider = await initiatePolkadotSnap(tenantToSnapNetwork(tenantName));

  if (!provider.isSnapInstalled) {
    const installResult = await installPolkadotSnap(tenantToSnapNetwork(tenantName));
    if (!installResult) {
      console.error('Something went wrong, snap could not be installed.');
      return;
    }
  }

  return provider;
};

const getSigner = (api: MetamaskSnapApi) => ({
  signPayload: async (payload: SignerPayloadJSON) => {
    // @ts-expect-error The types are compatible, the library uses an older version of types definition
    const stringResult = await api.signPayloadJSON(payload);
    // Metamask snap doesn't provide a request Id, but just the hex string, so
    // adding id: 1 to be compliant with SignerResult
    return { id: 1, signature: stringResult } as SignerResult;
  },
  signRaw: async (raw: SignerPayloadRaw) => {
    const stringResult = await api.signPayloadRaw(raw);
    // Metamask snap doesn't provide a request Id, but just the hex string, so
    // adding id: 1 to be compliant with SignerResult
    return { id: 1, signature: stringResult } as SignerResult;
  },
});

export async function initiateMetamaskInjectedAccount(tenantName: TenantName): Promise<WalletAccount[]> {
  const provider = await getProvider(tenantName);

  if (!provider?.snap) return [];
  const api = provider.snap.getMetamaskSnapApi();
  const address = await api.getAddress();

  const injectedMetamaskAccount: WalletAccount = {
    address,
    name: trimAddress(address),
    source: METAMASK_EXTENSION_NAME,
    signer: getSigner(api),
    wallet: undefined,
  };

  return await [injectedMetamaskAccount];
}
