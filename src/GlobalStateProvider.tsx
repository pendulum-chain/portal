import { getWalletBySource, WalletAccount } from '@talismn/connect-wallets';
import { getSdkError } from '@walletconnect/utils';
import { ComponentChildren, createContext } from 'preact';
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'preact/compat';
import { useLocation } from 'react-router-dom';
import { config } from './config';
import { chainIds } from './config/walletConnect';
import { storageKeys } from './constants/localStorage';
import { useLocalStorage } from './hooks/useLocalStorage';
import { TenantName } from './models/Tenant';
import { ThemeName } from './models/Theme';
import { initiateMetamaskInjectedAccount, WALLET_SOURCE_METAMASK } from './services/metamask';
import { storageService } from './services/storage/local';
import { walletConnectService } from './services/walletConnect';

const SECONDS_IN_A_DAY = 86400;
const EXPIRATION_PERIOD = 2 * SECONDS_IN_A_DAY; // 2 days

export interface GlobalState {
  dAppName: string;
  tenantName: TenantName;
  tenantRPC?: string;
  walletAccount?: WalletAccount;
  setWalletAccount: (data: WalletAccount) => void;
  removeWalletAccount: () => void;
  getThemeName: () => ThemeName;
}

export const defaultTenant = TenantName.Pendulum;
const GlobalStateContext = createContext<GlobalState | undefined>(undefined);

const initTalisman = async (dAppName: string, selected?: string) => {
  const name = storageService.get('@talisman-connect/selected-wallet-name');
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

const initMetamaskWallet = async (tenantName: TenantName) => {
  const metamaskWalletAddress = storageService.get(`metamask-snap-account`);
  if (metamaskWalletAddress) {
    return await initiateMetamaskInjectedAccount(tenantName);
  }
  return;
};

const GlobalStateProvider = ({ children }: { children: ComponentChildren }) => {
  const tenantRef = useRef<string>();
  const [walletAccount, setWallet] = useState<WalletAccount | undefined>(undefined);
  const { pathname } = useLocation();
  const network = pathname.split('/').filter(Boolean)[0]?.toLowerCase();

  const tenantName = useMemo(() => {
    return network && Object.values<string>(TenantName).includes(network) ? (network as TenantName) : defaultTenant;
  }, [network]);

  const dAppName = tenantName;

  const getThemeName = useCallback(
    () => (tenantName ? config.tenants[tenantName]?.theme || ThemeName.Amplitude : ThemeName.Amplitude),
    [tenantName],
  );

  const {
    state: storageAddress,
    set,
    clear,
  } = useLocalStorage<string | undefined>({
    key: `${storageKeys.ACCOUNT}-${tenantName}`,
    expire: EXPIRATION_PERIOD,
  });

  const handleWalletConnectDisconnect = useCallback(async () => {
    if (walletAccount?.wallet?.extensionName === 'WalletConnect') {
      const topic = walletConnectService.session?.topic;
      if (topic) {
        await walletConnectService.provider?.client.disconnect({
          topic,
          reason: getSdkError('USER_DISCONNECTED'),
        });
      }
    }
  }, [walletAccount]);

  const removeWalletAccount = useCallback(async () => {
    await handleWalletConnectDisconnect();
    clear();
    // remove talisman
    storageService.remove('@talisman-connect/selected-wallet-name');
    storageService.remove(`metamask-snap-account`);
    setWallet(undefined);
  }, [clear, handleWalletConnectDisconnect]);

  const setWalletAccount = useCallback(
    (wallet: WalletAccount | undefined) => {
      set(wallet?.address);
      setWallet(wallet);
      if (wallet?.source === WALLET_SOURCE_METAMASK) {
        storageService.set(`metamask-snap-account`, wallet.address);
      }
    },
    [set],
  );

  const accountAddress = walletAccount?.address;
  useEffect(() => {
    const run = async () => {
      if (!storageAddress) {
        removeWalletAccount();
        return;
      }
      // skip if tenant already initialized
      if (tenantRef.current === tenantName || accountAddress) return;
      tenantRef.current = tenantName;
      const appName = dAppName || TenantName.Amplitude;
      const selectedWallet =
        (await initTalisman(appName, storageAddress)) ||
        (await initWalletConnect(chainIds[tenantName])) ||
        (await initMetamaskWallet(tenantName));
      if (selectedWallet) setWallet(selectedWallet);
    };
    run();
  }, [storageAddress, removeWalletAccount, dAppName, tenantName, accountAddress]);

  const providerValue = useMemo<GlobalState>(
    () => ({
      walletAccount,
      tenantName: tenantName,
      tenantRPC: config.tenants[tenantName].rpc,
      setWalletAccount,
      removeWalletAccount,
      getThemeName,
      dAppName,
    }),
    [dAppName, getThemeName, removeWalletAccount, setWalletAccount, tenantName, walletAccount],
  );

  return <GlobalStateContext.Provider value={providerValue}>{children}</GlobalStateContext.Provider>;
};

const useGlobalState = () => {
  const state = useContext(GlobalStateContext);
  if (!state) throw 'GlobalStateProvider not defined!';
  return state;
};

export { GlobalStateContext, GlobalStateProvider, useGlobalState };
