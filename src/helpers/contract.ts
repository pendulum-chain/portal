// https://github.com/wagmi-dev/viem/blob/7c1c6aab829d177142cdd6e62562ff717e01dc24/src/actions/wallet/sendTransaction.ts
import { Abi } from '@polkadot/api-contract';

export async function writeContract<
  TAccount extends string | undefined,
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends string,
>(
  client: Client<Transport, TChain, TAccount>,
  {
    abi,
    address,
    args,
    dataSuffix,
    functionName,
    ...request
  }: WriteContractParameters<TAbi, TFunctionName, TChain, TAccount, TChainOverride>,
): Promise<WriteContractReturnType> {
  const data = encodeFunctionData({
    abi,
    args,
    functionName,
  } as unknown as EncodeFunctionDataParameters<TAbi, TFunctionName>);
  const hash = await sendTransaction(client, {
    data: `${data}${dataSuffix ? dataSuffix.replace('0x', '') : ''}`,
    to: address,
    ...request,
  } as unknown as SendTransactionParameters<TChain, TAccount, TChainOverride>);
  return hash;
}
