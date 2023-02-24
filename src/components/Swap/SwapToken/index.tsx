import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Fragment } from 'preact';
import pendulumIcon from '../../../assets/pendulum-icon.svg';
import { Skeleton } from '../../Skeleton';

export interface SwapTokenProps {
  token: string;
  // select balance procentage to swap
  onValueSelect?: (proc: number) => void;
  onOpenSelector: () => void;
  className?: string;
  children?: ReactNode;
  value: JSX.Element | string | number;
  isLoading?: boolean;
}

const SwapToken = ({
  token,
  onValueSelect,
  onOpenSelector,
  className,
  children,
  isLoading,
  value,
}: SwapTokenProps): JSX.Element | null => {
  return (
    <>
      <div className={`rounded-lg bg-gray-100 px-4 py-3 ${className}`}>
        <div className="w-full flex justify-between">
          <div className="flex-grow text-4xl font-2">{value}</div>
          <button
            className="btn btn-xs h-4 min-h-none bg-gray-200 rounded-full pl-0 pr-1 flex items-center mt-0.5"
            onClick={onOpenSelector}
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
          </button>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500 mt-px">
            {isLoading ? (
              <Skeleton className="bg-gray-200">10000</Skeleton>
            ) : (
              '$124.58'
            )}
          </div>
          <div className="flex gap-1 text-sm text-gray-500">
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
        {children}
      </div>
    </>
  );
};
export default SwapToken;
