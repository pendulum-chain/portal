import { Cog8ToothIcon } from '@heroicons/react/24/outline';
import { Button, Dropdown, Input, InputProps } from 'react-daisyui';
import { config } from '../../../config';

export interface TransactionSettingsProps {
  setSlippage: (slippage: number | undefined) => void;
  slippageProps: InputProps;
  deadlineProps?: InputProps;
}

const inputCls = 'bg-neutral-100 dark:bg-neutral-900 text-right text-neutral-600 dark:text-neutral-200';

const TransactionSettings = ({
  setSlippage,
  slippageProps,
  deadlineProps,
}: TransactionSettingsProps): JSX.Element | null => {
  return (
    <div className="w-full">
      <h4 className="font-semibold">Settings</h4>
      <div className="mt-4 text-sm">
        <div className="flex gap-2">Slippage tolerance</div>
        <div className="mt-2 flex gap-2">
          <Button size="sm" color="primary" className="px-3" onClick={() => setSlippage(undefined)} type="button">
            Auto
          </Button>
          <div className="relative flex text-neutral-600 dark:text-neutral-400">
            <Input
              size="sm"
              bordered
              className={`${inputCls} w-full pr-6`}
              type="text"
              inputMode="numeric"
              step=".1"
              min={config.transaction.settings.slippage.min}
              max={config.transaction.settings.slippage.max}
              placeholder="Auto"
              {...slippageProps}
            />
            <div className="absolute right-0 top-0 flex h-full w-5 items-center">%</div>
          </div>
        </div>
      </div>
      {deadlineProps && (
        <div className="mt-4 text-sm">
          <div className="flex gap-2">Transaction Deadline</div>

          <div className="mt-2 flex items-center gap-2">
            <Input
              size="sm"
              bordered
              className={`${inputCls} pr-2v w-20`}
              type="text"
              inputMode="numeric"
              placeholder="30"
              min={config.transaction.settings.deadline.min}
              max={config.transaction.settings.deadline.max}
              {...deadlineProps}
            />
            <span className="text-neutral-600 dark:text-neutral-400">minutes</span>
          </div>
        </div>
      )}
    </div>
  );
};

export function TransactionSettingsDropdown(props: TransactionSettingsProps & { button?: React.ReactNode }) {
  return (
    <Dropdown vertical="bottom" end>
      {props.button || (
        <button
          className="btn btn-circle btn-ghost btn-sm flex text-gray-600 dark:text-gray-400"
          type="button"
          title="Open settings"
        >
          <Cog8ToothIcon className="h-6 w-6" />
        </button>
      )}
      <Dropdown.Menu tabIndex={0} className="w-64 rounded-lg border bg-base-200 p-4 shadow-lg dark:border-neutral-800">
        <TransactionSettings {...props} />
      </Dropdown.Menu>
    </Dropdown>
  );
}
