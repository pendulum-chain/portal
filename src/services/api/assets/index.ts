import { SwapPoolColumn } from '../../../components/Pools/Swap/columns';
import { Asset } from '../../../models/Asset';
import { BackstopPool } from '../../../models/BackstopPool';
import { ContractPromise } from '@polkadot/api-contract';
import { ApiPromise } from '@polkadot/api';
import contractAddresses from '../../../../contracts/nabla-contract-addresses.json';
import mockErc20Metadata from '../../../../contracts/MockERC20.json';
import swapPoolMetadata from '../../../../contracts/SwapPool.json';
import { WeightV2 } from '@polkadot/types/interfaces';
import { nativeToDecimal, prettyNumbers } from '../../../helpers/parseNumbers';

// Define shared query options
const createOptions = (api: ApiPromise) => ({
  gasLimit: api.createType('WeightV2', {
    refTime: '100000000000',
    proofSize: '1000000',
  }) as WeightV2,
  storageDepositLimit: null,
});

// ! TODO
export const assetsApi = {
  getSwapTokens: async (api: ApiPromise, network: 'foucoco', walletAccount?: string): Promise<Asset[]> => {
    const addressesForNetwork = contractAddresses[network];
    return addressesForNetwork.tokensWithMeta;
  },
  getSwapPools: async (
    api: ApiPromise,
    network: 'foucoco', // This would be extended to support other networks
    userAddress: string,
  ): Promise<SwapPoolColumn[]> => {
    const swapPoolColumns: SwapPoolColumn[] = [];

    const addressesForNetwork = contractAddresses[network];
    const swapPoolsWithMeta = addressesForNetwork.swapPoolsWithMeta;
    const tokensWithMeta = addressesForNetwork.tokensWithMeta;

    const options = createOptions(api);

    for (const swapPoolMeta of swapPoolsWithMeta) {
      const swapPoolContract = new ContractPromise(api, swapPoolMetadata, swapPoolMeta.address);
      const tokenContract = new ContractPromise(api, mockErc20Metadata, swapPoolMeta.asset);

      // Query totalSupply of swap pool
      const totalSupplyQueryResult = await swapPoolContract.query.totalSupply(userAddress, options);
      const totalSupply =
        totalSupplyQueryResult.result.isOk && totalSupplyQueryResult.output
          ? parseFloat(totalSupplyQueryResult.output.toString())
          : 0;

      // Query shares of user in swap pool
      const userSharesQuery = await swapPoolContract.query.balanceOf(userAddress, options, userAddress);
      const userShares =
        userSharesQuery.result.isOk && userSharesQuery.output ? parseFloat(userSharesQuery.output.toString()) : 0;
      // Convert shares to amount
      const myAmountQuery = await swapPoolContract.query.sharesTargetWorth(userAddress, options, userShares);
      const myAmount =
        myAmountQuery.result.isOk && myAmountQuery.output ? parseFloat(myAmountQuery.output.toString()) : 0;

      // Query amount of the swap pools related token the user holds
      const walletAmountQueryResult = await tokenContract.query.balanceOf(userAddress, options, userAddress);
      const walletAmountOfToken =
        walletAmountQueryResult.result.isOk && walletAmountQueryResult.output
          ? parseFloat(walletAmountQueryResult.output.toString())
          : 0;

      const asset = tokensWithMeta.find((token) => token.address === swapPoolMeta.asset);
      const swapPool: SwapPoolColumn = {
        address: swapPoolMeta.address,
        apr: swapPoolMeta.apr,
        asset: asset!,
        balance: totalSupply,
        coverage: 0.0,
        liabilities: 0.0,
        myAmount: prettyNumbers(nativeToDecimal(myAmount).toNumber()),
        wallet: prettyNumbers(nativeToDecimal(walletAmountOfToken).toNumber()),
      };
      swapPoolColumns.push(swapPool);
    }

    return swapPoolColumns;
  },
  getBackstopPools: async (): Promise<BackstopPool[]> => {
    const backstopPools: BackstopPool[] = [];
    return backstopPools;
  },
};
