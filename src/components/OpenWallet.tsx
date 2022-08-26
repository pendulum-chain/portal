import { useEffect, useState } from "preact/hooks"
import { Button } from "react-daisyui"
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp'
import { keyring as Keyring } from '@polkadot/ui-keyring'
import { ApiPromise, WsProvider } from '@polkadot/api'
import jsonrpc from '@polkadot/types/interfaces/jsonrpc'

const OpenWallet = () => {
  const [addresses, setAddress] = useState([]);

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
    return (
      <Button animation={false} title={addresses[0].address}>
        {addresses[0].meta.name.split(' ')[0]}
        <img style={{ marginLeft: 10, width: 24, height: 24 }} src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjE1IDE1IDE0MCAxNDAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDE3MCAxNzA7em9vbTogMTsiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+LmJnMHtmaWxsOiNGRjhDMDB9IC5zdDB7ZmlsbDojRkZGRkZGfTwvc3R5bGU+PGc+PGNpcmNsZSBjbGFzcz0iYmcwIiBjeD0iODUiIGN5PSI4NSIgcj0iNzAiPjwvY2lyY2xlPjxnPjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik04NSwzNC43Yy0yMC44LDAtMzcuOCwxNi45LTM3LjgsMzcuOGMwLDQuMiwwLjcsOC4zLDIsMTIuM2MwLjksMi43LDMuOSw0LjIsNi43LDMuM2MyLjctMC45LDQuMi0zLjksMy4zLTYuNyBjLTEuMS0zLjEtMS42LTYuNC0xLjUtOS43QzU4LjEsNTcuNiw2OS41LDQ2LDgzLjYsNDUuM2MxNS43LTAuOCwyOC43LDExLjcsMjguNywyNy4yYzAsMTQuNS0xMS40LDI2LjQtMjUuNywyNy4yIGMwLDAtNS4zLDAuMy03LjksMC43Yy0xLjMsMC4yLTIuMywwLjQtMywwLjVjLTAuMywwLjEtMC42LTAuMi0wLjUtMC41bDAuOS00LjRMODEsNzMuNGMwLjYtMi44LTEuMi01LjYtNC02LjIgYy0yLjgtMC42LTUuNiwxLjItNi4yLDRjMCwwLTExLjgsNTUtMTEuOSw1NS42Yy0wLjYsMi44LDEuMiw1LjYsNCw2LjJjMi44LDAuNiw1LjYtMS4yLDYuMi00YzAuMS0wLjYsMS43LTcuOSwxLjctNy45IGMxLjItNS42LDUuOC05LjcsMTEuMi0xMC40YzEuMi0wLjIsNS45LTAuNSw1LjktMC41YzE5LjUtMS41LDM0LjktMTcuOCwzNC45LTM3LjdDMTIyLjgsNTEuNiwxMDUuOCwzNC43LDg1LDM0Ljd6IE04Ny43LDEyMS43IGMtMy40LTAuNy02LjgsMS40LTcuNSw0LjljLTAuNywzLjQsMS40LDYuOCw0LjksNy41YzMuNCwwLjcsNi44LTEuNCw3LjUtNC45QzkzLjMsMTI1LjcsOTEuMiwxMjIuNCw4Ny43LDEyMS43eiI+PC9wYXRoPjwvZz48L2c+PC9zdmc+Cg==" alt="" />
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
