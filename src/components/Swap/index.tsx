import {
  ChevronDownIcon,
  Cog8ToothIcon,
  InformationCircleIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';
import { Fragment } from 'preact';
import { inputClass } from './styles';
import SwapToken from './SwapToken';
import {
  defaults,
  useSwapComponent,
  UseSwapComponentProps,
} from './useSwapComponent';

const Swap = (props: UseSwapComponentProps): JSX.Element | null => {
  const { storage, dropdown, swapQuery /* tokensQuery */ } =
    useSwapComponent(props);
  const { state = defaults, merge } = storage;
  const [isOpen, { toggle }] = dropdown;
  const swapData = swapQuery.data || {};

  return (
    <div className="card max-w-xl bg-base-100 shadow-xl border rounded-lg">
      <div className="card-body text-gray-800">
        <div className="flex justify-between mb-2">
          <h2 className="card-title text-3xl">Swap</h2>
          <div className="dropdown dropdown-end">
            <button className="btn btn-ghost btn-circle text-gray-600">
              <Cog8ToothIcon className="h-8 w-8" />
            </button>
            <div
              tabIndex={0}
              className="dropdown-content menu p-4 shadow-lg bg-base-100 border rounded-lg w-64"
            >
              <div className="w-full">
                <h4 className="font-semibold">Settings</h4>
                <div className="mt-4 text-sm">
                  <div className="flex gap-2">
                    Slippage tollerance
                    <div className="tooltip" data-tip="! TODO">
                      <QuestionMarkCircleIcon className="w-5 h-5 text-gray-500" />
                    </div>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <button
                      className="btn btn-sm px-3 btn-primary"
                      onClick={() => merge({ slippage: defaults.slippage })}
                    >
                      Auto
                    </button>
                    <div className="relative flex text-gray-600">
                      <input
                        className={`${inputClass} pr-6 w-full`}
                        type="number"
                        step=".1"
                        defaultValue={String(state.slippage)}
                        placeholder="0.5"
                        onChange={(ev) =>
                          merge({ slippage: Number(ev.currentTarget.value) })
                        }
                      />
                      <div className="absolute right-0 top-0 w-5 h-full flex items-center">
                        %
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-sm">
                  <div className="flex gap-2">
                    Transaction Deadline
                    <div className="tooltip" data-tip="! TODO">
                      <QuestionMarkCircleIcon className="w-5 h-5 text-gray-500" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <input
                      className={`${inputClass} w-20 pr-0`}
                      type="number"
                      defaultValue={String(state.deadline)}
                      placeholder="30"
                      onChange={(ev) =>
                        merge({ deadline: Number(ev.currentTarget.value) })
                      }
                    />
                    <span className="text-gray-600">minutes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <SwapToken
          token={state.from}
          onChange={() => console.log('TODO')}
          onValueSelect={() => console.log('TODO')}
        />
        <SwapToken
          isLoading={swapQuery.isLoading}
          token={state.to}
          onChange={() => console.log('TODO')}
        >
          <Fragment>
            <div className="mt-4 h-px -mx-4 bg-gray-200" />
            <div
              className={`collapse text-gray-500 -mx-4 text-sm${
                isOpen ? ' collapse-open' : ''
              }`}
            >
              <div
                className="collapse-title cursor-pointer flex justify-between px-4 pt-3 pb-0"
                onClick={toggle}
              >
                <div className="flex items-center">
                  <div className="tooltip" data-tip="! TODO" title="! TODO">
                    <InformationCircleIcon className="w-5 h-5 mr-1" />
                  </div>
                  1 USDC = 0.00 ETH ($1.00)
                </div>
                <div>
                  ${swapData.price}
                  <ChevronDownIcon className="w-3 h-3 inline ml-1 -mt-px" />
                </div>
              </div>
              <div className="collapse-content flex flex-col gap-4">
                <div className="mt-3 h-px -mx-4 bg-gray-200" />
                <div className="flex justify-between px-4">
                  <div>Expected Output:</div>
                  <div>{swapData.output} USDC</div>
                </div>
                <div className="flex justify-between px-4">
                  <div>Price Impact:</div>
                  <div>{swapData.impact}%</div>
                </div>
                <div className="flex justify-between px-4">
                  <div>Minimum received after slippage (0.56%):</div>
                  <div>{swapData.receive} USDC</div>
                </div>
                <div className="flex justify-between px-4">
                  <div>Network Fee:</div>
                  <div>{swapData.fee}</div>
                </div>
              </div>
            </div>
          </Fragment>
        </SwapToken>
        <button className="btn btn-primary w-full mt-6 text-base">Swap</button>
      </div>
    </div>
  );
};
export default Swap;
