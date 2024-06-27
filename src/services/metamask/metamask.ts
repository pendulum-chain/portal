import { WalletAccount } from '@talismn/connect-wallets';
import { enablePolkadotSnap } from '@chainsafe/metamask-polkadot-adapter';
import type { MetamaskPolkadotSnap } from '@chainsafe/metamask-polkadot-adapter/build/snap';
import type { InjectedMetamaskExtension } from '@chainsafe/metamask-polkadot-adapter/src/types';
import { MetamaskSnapApi } from '@chainsafe/metamask-polkadot-adapter/build/types';
import type { SnapNetworks } from '@chainsafe/metamask-polkadot-types';
import { web3EnablePromise } from '@polkadot/extension-dapp';
import type { InjectedExtension } from '@polkadot/extension-inject/types';
import { SignerPayloadJSON, SignerPayloadRaw, SignerResult } from '@polkadot/types/types';

import { TenantName } from '../../models/Tenant';
import { trimAddress } from '../../helpers/addressFormatter';

export const WALLET_SOURCE_METAMASK = 'metamask';

export function tenantToSnapNetwork(tenantName: TenantName): SnapNetworks {
  const tenantNetworkMap: { [key in TenantName]?: SnapNetworks } = {
    [TenantName.Pendulum]: 'polkadot',
    [TenantName.Amplitude]: 'kusama',
  };

  return tenantNetworkMap[tenantName] || 'kusama';
}

export async function installPolkadotSnap(relayChain: SnapNetworks): Promise<boolean> {
  try {
    await enablePolkadotSnap({ networkName: relayChain });
    return true;
  } catch (err) {
    console.error('Failed to install PolkadotSnap, ', err);
    return false;
  }
}

export async function isPolkadotSnapInstalled(): Promise<boolean> {
  return !!(await getInjectedMetamaskExtension());
}

export async function getInjectedMetamaskExtension(): Promise<InjectedMetamaskExtension | null> {
  const extensions = await web3EnablePromise;
  return getMetamaskExtension(extensions || []) || null;
}

function getMetamaskExtension(extensions: InjectedExtension[]): InjectedMetamaskExtension | undefined {
  return extensions.find((item) => item.name === 'metamask-polkadot-snap') as unknown as
    | InjectedMetamaskExtension
    | undefined;
}

export interface SnapInitializationResponse {
  isSnapInstalled: boolean;
  snap?: MetamaskPolkadotSnap;
}

export async function initiatePolkadotSnap(relayChain: SnapNetworks): Promise<SnapInitializationResponse> {
  try {
    const metamaskPolkadotSnap = await enablePolkadotSnap({ networkName: relayChain });
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
    source: WALLET_SOURCE_METAMASK,
    signer: getSigner(api),
    wallet: undefined,
  };

  return await [injectedMetamaskAccount];
}
