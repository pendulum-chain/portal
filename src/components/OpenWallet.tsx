import { useEffect, useState } from "preact/hooks"
import { Button } from "react-daisyui"
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp'
import { keyring as Keyring } from '@polkadot/ui-keyring'
import { ApiPromise, WsProvider } from '@polkadot/api'
import jsonrpc from '@polkadot/types/interfaces/jsonrpc'
import type { InjectedAccountWithMeta } from '@polkadot/extension-inject/types'

const OpenWallet = () => {
  const [addresses, setAddress] = useState<InjectedAccountWithMeta[]>([]);

  useEffect(() => {
    (async () => {
      try {
        await web3Enable('Pendulum/Amplitud')
        let allAccounts = await web3Accounts()

        allAccounts = allAccounts.map(({ address, meta }) => ({
          address,
          meta: { ...meta, name: `${meta.name} (${meta.source})` },
        }))

        const provider = new WsProvider('wss://rpc.polkadot.io/');
        const _api = new ApiPromise({
          provider, ...jsonrpc
        })

        _api.on('connected', () => {
          _api.isReady.then(_api => setAddress(allAccounts))
        })
        _api.on('ready', () => true)
        _api.on('error', err => console.error(err));

        const isDevelopment = false;

        Keyring.loadAll({ isDevelopment }, allAccounts)
      } catch (e) {
        console.error(e)
      }
    })();
  }, []);

  if (addresses.length > 0) {
    let name = addresses[0].meta.name;
    name = name?.substring(0, name.length - 14);

    return (
      <Button animation={false} title={addresses[0].address}>
        {name}
        { }
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="15 15 140 140" style={{ marginLeft: 10, width: 24, height: 24 }}>
          <circle fill="#FF8C00" cx="85" cy="85" r="70" />
          <path fill="#FFFFFF" d="M85,34.7c-20.8,0-37.8,16.9-37.8,37.8c0,4.2,0.7,8.3,2,12.3c0.9,2.7,3.9,4.2,6.7,3.3c2.7-0.9,4.2-3.9,3.3-6.7 c-1.1-3.1-1.6-6.4-1.5-9.7C58.1,57.6,69.5,46,83.6,45.3c15.7-0.8,28.7,11.7,28.7,27.2c0,14.5-11.4,26.4-25.7,27.2 c0,0-5.3,0.3-7.9,0.7c-1.3,0.2-2.3,0.4-3,0.5c-0.3,0.1-0.6-0.2-0.5-0.5l0.9-4.4L81,73.4c0.6-2.8-1.2-5.6-4-6.2 c-2.8-0.6-5.6,1.2-6.2,4c0,0-11.8,55-11.9,55.6c-0.6,2.8,1.2,5.6,4,6.2c2.8,0.6,5.6-1.2,6.2-4c0.1-0.6,1.7-7.9,1.7-7.9 c1.2-5.6,5.8-9.7,11.2-10.4c1.2-0.2,5.9-0.5,5.9-0.5c19.5-1.5,34.9-17.8,34.9-37.7C122.8,51.6,105.8,34.7,85,34.7z M87.7,121.7 c-3.4-0.7-6.8,1.4-7.5,4.9c-0.7,3.4,1.4,6.8,4.9,7.5c3.4,0.7,6.8-1.4,7.5-4.9C93.3,125.7,91.2,122.4,87.7,121.7z" />
        </svg>
      </Button>
    );
  }

  return (
    <Button animation={false}>
      Connect wallet
    </Button>
  )
}

export default OpenWallet;
