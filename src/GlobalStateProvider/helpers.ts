import { getWalletBySource, WalletAccount } from '@talismn/connect-wallets';
import { getSdkError } from '@walletconnect/utils';
import { storageService } from '../services/storage/local';
import { walletConnectService } from '../services/walletConnect';
import { initiateMetamaskInjectedAccount } from '../services/metamask';
import { chainIds } from '../config/walletConnect';
import { TenantName } from '../models/Tenant';
import { LocalStorageKeys } from '../hooks/useLocalStorage';

const initTalisman = async (dAppName: string, selected?: string) => {
  const name = storageService.get(LocalStorageKeys.SELECTED_WALLET_NAME);
  if (!name?.length) return;
  const wallet = getWalletBySource(name);
  if (!wallet) return;
  await wallet.enable(dAppName);
  const accounts = await wallet.getAccounts();
  const selectedWallet = accounts.find((a) => a.address === selected) || accounts[0];
  return selectedWallet;
};

const initWalletConnect = async (chainId: string) => {
  const provider = await walletConnectService.getProvider();
  if (!provider?.session) return;
  return await walletConnectService.init(provider?.session, chainId);
};

const initMetamask = async (tenantName: TenantName) => {
  const metamaskWalletAddress = storageService.get(LocalStorageKeys.SELECTED_WALLET_NAME);
  if (metamaskWalletAddress) {
    const injectedAccounts = await initiateMetamaskInjectedAccount(tenantName);
    return injectedAccounts[0];
  }
};

export const initSelectedWallet = async (dAppName: TenantName, tenantName: TenantName, storageAddress: string) => {
  const appName = dAppName || TenantName.Amplitude;
  return (
    (await initTalisman(appName, storageAddress)) ||
    (await initWalletConnect(chainIds[tenantName])) ||
    (await initMetamask(tenantName))
  );
};

export const handleWalletConnectDisconnect = async (walletAccount: WalletAccount | undefined) => {
  if (walletAccount?.wallet?.extensionName === 'WalletConnect') {
    const topic = walletConnectService.session?.topic;
    if (topic) {
      await walletConnectService.provider?.client.disconnect({
        topic,
        reason: getSdkError('USER_DISCONNECTED'),
      });
    }
  }
};
