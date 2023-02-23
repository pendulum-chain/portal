import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Fragment } from 'preact';
import pendulumIcon from '../../../assets/pendulum-icon.svg';
import { Skeleton } from '../../Skeleton';

export interface SwapTokenProps {
  token: string;
  onChange: (val: string) => void;
  onValueSelect?: (val: number) => void;
  className?: string;
  children?: ReactNode;
  isLoading?: boolean;
}

const SwapToken = ({
  token,
  //onChange,
  onValueSelect,
  className,
  children,
  isLoading,
}: SwapTokenProps): JSX.Element | null => {
  return (
    <>
      <div className={`rounded-lg bg-gray-100 px-4 py-3 ${className}`}>
        <div className="flex justify-between">
          <div>
            <div className="text-4xl font-2 mb-px">
              {isLoading ? (
                <Skeleton className="bg-gray-200">1000</Skeleton>
              ) : (
                0.1
              )}
            </div>
            <div className="text-sm text-gray-500">
              {isLoading ? (
                <Skeleton className="bg-gray-200">100.25</Skeleton>
              ) : (
                '$124.58'
              )}
            </div>
          </div>
          <div className="flex flex-col items-end">
            <label
              htmlFor="tokens-modal"
              className="btn btn-xs h-4 min-h-none bg-gray-200 rounded-full pl-0 pr-1 flex items-center"
              onClick={() => console.log('TODO')}
            >
              <span className="rounded-full bg-gray-300 h-full p-px mr-1">
                <img
                  src={pendulumIcon}
                  alt="Pendulum"
                  className="h-full w-auto"
                />
              </span>
              <strong className="font-bold">{token}</strong>
              <ChevronDownIcon className="w-4 h-4 inline ml-px" />
            </label>
            <div className="flex gap-1 mt-3 text-sm text-gray-500">
              {'Balance: 0.01'}
              {onValueSelect && (
                <Fragment>
                  <button
                    className="text-primary hover:underline"
                    onClick={() => onValueSelect(100)}
                  >
                    MAX
                  </button>
                  <button
                    className="text-primary hover:underline"
                    onClick={() => onValueSelect(50)}
                  >
                    50%
                  </button>
                </Fragment>
              )}
            </div>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};
export default SwapToken;
