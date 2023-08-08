import { useNavigate } from 'react-router-dom';
import { useGlobalState } from '../../../GlobalStateProvider';
import { config } from '../../../config';
import { nablaConfig } from '../../../config/apps/nabla';
import { mockERC20 } from '../../../contracts/nabla/MockERC20';
import { useGetTenantData } from '../../../hooks/useGetTenantData';
import { Asset } from '../../../models/Asset';
import { createOptions } from '../../../services/api/helpers';
import { decimalToNative } from '../../../shared/parseNumbers';
import { UseContractWriteProps, useContractWrite } from '../../../shared/useContractWrite';

const amount = decimalToNative(1000).toString();
const mintFn: UseContractWriteProps<typeof mockERC20>['fn'] = ({ contract, api, walletAccount }) =>
  contract.tx.mint(createOptions(api), walletAccount.address, amount);

const TokenItem = ({ token }: { token: Asset }) => {
  const { mutate, isLoading } = useContractWrite({
    abi: mockERC20,
    address: token.address,
    fn: mintFn,
    onError: console.error,
  });
  return (
    <div className="flex items-center justify-between gap-3" key={token.address}>
      <div>
        <p>{token.name}</p>
        <p className="w-full truncate text-xs text-gray-500">{token.address}</p>
      </div>
      <div>
        <button
          className={`btn btn-secondary btn-sm ${isLoading ? 'loading' : ''}`}
          disabled={isLoading}
          onClick={() => mutate(undefined)}
        >
          {isLoading ? 'Loading' : 'Mint 1000'}
        </button>
      </div>
    </div>
  );
};

const DevPage = () => {
  const nav = useNavigate();
  const wallet = useGlobalState().walletAccount;
  const { assets } = useGetTenantData(nablaConfig) || {};

  if (!config.isDev) nav('/');
  if (!wallet?.address) {
    return <>Please connect your wallet.</>;
  }
  return (
    <div className="my-6 flex flex-wrap items-start gap-4">
      <div className="card w-full max-w-[36rem] bg-base-200 shadow-xl">
        <div className="card-body">
          <h3 className="mb-2 text-2xl">Tokens</h3>
          {assets?.map((token) => (
            <TokenItem key={token.address} token={token} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DevPage;
