import { web3EnablePromise } from '@polkadot/extension-dapp';
import type { InjectedExtension } from '@polkadot/extension-inject/types';
import type { InjectedMetamaskExtension } from '@chainsafe/metamask-polkadot-adapter/src/types';

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
