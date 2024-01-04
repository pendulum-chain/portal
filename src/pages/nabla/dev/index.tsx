import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import { Button, Dropdown } from 'react-daisyui';
import { useNavigate } from 'react-router-dom';
import { Token } from '../../../../gql/graphql';
import { config } from '../../../config';
import { defaultDecimals } from '../../../config/apps/nabla';
import { erc20WrapperAbi } from '../../../contracts/nabla/ERC20Wrapper';
import { useGlobalState } from '../../../GlobalStateProvider';
import { useTokens } from '../../../hooks/nabla/useTokens';
import { decimalToNative } from '../../../shared/parseNumbers';
import { useContractWrite } from '../../../shared/useContractWrite';

const TokenItem = ({ token }: { token: Token }) => {
  const { address } = useGlobalState().walletAccount || {};
  const { mutate, isLoading } = useContractWrite({
    abi: erc20WrapperAbi,
    address: token.id,
    method: 'mint',
    onError: console.error,
  });
  return (
    <div className="flex items-center justify-between gap-3" key={token.id}>
      <div>
        <p>{token.name}</p>
        <p className="w-full truncate text-xs text-gray-500">{token.id}</p>
      </div>
      <div>
        <div className="flex items-center">
          <Button
            className={`rounded-e-none${isLoading ? ' loading' : ''}`}
            size="sm"
            color="secondary"
            type="button"
            disabled={isLoading}
            onClick={() => mutate([address, decimalToNative(1000, defaultDecimals).toString()])}
          >
            {isLoading ? 'Loading' : 'Mint 1000'}
          </Button>
          <Dropdown vertical="bottom" end>
            <label tabIndex={0} className={`btn btn-secondary btn-sm rounded-s-none`}>
              <EllipsisVerticalIcon className="w-4 h-4" />
            </label>
            <Dropdown.Menu tabIndex={0} className="p-0 shadow rounded-lg w-24">
              <li>
                <div
                  role="button"
                  className={`btn-sm`}
                  onClick={() => mutate([address, decimalToNative(10000, defaultDecimals).toString()])}
                >
                  10000
                </div>
              </li>
              <li>
                <div
                  role="button"
                  className={`btn-sm`}
                  onClick={() => mutate([address, decimalToNative(100000, defaultDecimals).toString()])}
                >
                  100000
                </div>
              </li>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

const DevPage = () => {
  const navigate = useNavigate();
  const wallet = useGlobalState().walletAccount;
  const { data } = useTokens();
  const { tokens } = data || {};

  if (config.isProd) navigate('/');
  if (!wallet?.address) {
    return <>Please connect your wallet.</>;
  }
  return (
    <div className="my-6 flex flex-wrap items-start gap-4">
      <div className="card w-full max-w-[36rem] bg-base-200 shadow-xl">
        <div className="card-body">
          <h3 className="mb-2 text-2xl">Tokens</h3>
          {tokens?.map((token) => <TokenItem key={token.id} token={token} />)}
        </div>
      </div>
    </div>
  );
};

export default DevPage;
