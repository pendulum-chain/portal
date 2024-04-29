import { Cog8ToothIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import { Button, Dropdown, Input } from 'react-daisyui';
import { InputProps } from 'react-daisyui/dist/Input/Input';
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
        <div className="flex gap-2 mt-2">
          <Button size="sm" color="primary" className="px-3" onClick={() => setSlippage(undefined)} type="button">
            Auto
          </Button>
          <div className="relative flex dark:text-neutral-400 text-neutral-600">
            <Input
              size="sm"
              bordered
              className={`${inputCls} pr-6 w-full`}
              type="text"
              inputmode="numeric"
              step=".1"
              min={config.transaction.settings.slippage.min}
              max={config.transaction.settings.slippage.max}
              placeholder="Auto"
              {...slippageProps}
            />
            <div className="absolute right-0 top-0 w-5 h-full flex items-center">%</div>
          </div>
        </div>
      </div>
      <div className="mt-4 text-sm">
        <div className="flex gap-2">Transaction Deadline</div>
        {deadlineProps && (
          <div className="flex items-center gap-2 mt-2">
            <Input
              size="sm"
              bordered
              className={`${inputCls} w-20 pr-2v `}
              type="text"
              inputmode="numeric"
              placeholder="30"
              min={config.transaction.settings.deadline.min}
              max={config.transaction.settings.deadline.max}
              {...deadlineProps}
            />
            <span className="dark:text-neutral-400 text-neutral-600">minutes</span>
          </div>
        )}
      </div>
    </div>
  );
};

export const TransactionSettingsDropdown = (props: TransactionSettingsProps & { button?: ReactNode }) => (
  <Dropdown vertical="bottom" end>
    {props.button || (
      <button
        className="flex btn btn-sm btn-circle btn-ghost text-gray-600 dark:text-gray-400"
        type="button"
        title="Open settings"
      >
        <Cog8ToothIcon className="h-6 w-6" />
      </button>
    )}
    <Dropdown.Menu tabIndex={0} className="p-4 shadow-lg bg-base-200 border dark:border-neutral-800 rounded-lg w-64">
      <TransactionSettings {...props} />
    </Dropdown.Menu>
  </Dropdown>
);

export default TransactionSettings;
