import { Button } from "react-daisyui"
import jsonrpc from '@polkadot/types/interfaces/jsonrpc'
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp'
import { keyring as Keyring } from '@polkadot/ui-keyring'
import { ApiPromise, WsProvider } from '@polkadot/api'

const dispatch = (me: { type: string; payload?: any }) => console.log(me);

const asyncLoadAccounts = async () => {
  try {
    await web3Enable('config.APP_NAME')
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
      _api.isReady.then(_api => dispatch({ type: 'CONNECT_SUCCESS' }))
    })
    _api.on('ready', () => dispatch({ type: 'CONNECT_SUCCESS' }))
    _api.on('error', err => dispatch({ type: 'CONNECT_ERROR', payload: err }))

    const isDevelopment = false;

    Keyring.loadAll({ isDevelopment }, allAccounts)
  } catch (e) {
    console.error(e)
  }
}
asyncLoadAccounts()

const OpenWallet = () => {
  return <Button animation={false}>Connect wallet</Button>
}

export default OpenWallet;
