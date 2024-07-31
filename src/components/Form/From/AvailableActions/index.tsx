import Big from 'big.js';
import { trimToMaxDecimals, USER_INPUT_MAX_DECIMALS } from '../../../../shared/parseNumbers/maxDecimals';
import { stringifyBigWithSignificantDecimals } from '../../../../shared/parseNumbers/metric';

interface AvailableActionsProps {
  max?: number | Big;
  maxDecimals?: number;
  setValue?: (n: string) => void;
  hideAvailableBalance?: boolean;
}

export const AvailableActions = ({
  max,
  maxDecimals = USER_INPUT_MAX_DECIMALS.PENDULUM,
  setValue,
  hideAvailableBalance,
}: AvailableActionsProps) => {
  const handleSetValue = (percentage: number) => {
    if (max !== undefined && setValue !== undefined) {
      const maxBig = Big(max);
      const trimmedValue = trimToMaxDecimals(maxBig.mul(percentage).toString(), maxDecimals);
      setValue(trimmedValue);
    }
  };

  const handleSetHalf = () => handleSetValue(0.5);
  const handleSetMax = () => handleSetValue(1);

  return (
    <div className="flex gap-1 text-sm">
      {max !== undefined && setValue !== undefined && (
        <>
          {hideAvailableBalance ? (
            <></>
          ) : (
            <span className="mr-1">Available: {stringifyBigWithSignificantDecimals(Big(max), 2)}</span>
          )}
          <button className="text-primary hover:underline" onClick={handleSetHalf} type="button">
            50%
          </button>
          <button className="text-primary hover:underline" onClick={handleSetMax} type="button">
            MAX
          </button>
        </>
      )}
    </div>
  );
};
