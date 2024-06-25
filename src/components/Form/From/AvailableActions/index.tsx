import { trimMaxDecimals, USER_INPUT_MAX_DECIMALS } from '../../../../shared/parseNumbers/maxDecimals';

interface AvailableActionsProps {
  max?: number;
  maxDecimals?: number;
  setValue?: (n: number) => void;
}

export const AvailableActions = ({
  max,
  maxDecimals = USER_INPUT_MAX_DECIMALS.PENDULUM,
  setValue,
}: AvailableActionsProps) => {
  const handleSetValue = (percentage: number) => {
    if (max !== undefined && setValue !== undefined) {
      const trimmedValue = trimMaxDecimals(String(max * percentage), maxDecimals);
      setValue(Number(trimmedValue));
    }
  };

  const handleSetHalf = () => handleSetValue(0.5);
  const handleSetMax = () => handleSetValue(1);

  return (
    <div className="flex gap-1 text-sm">
      {max !== undefined && setValue !== undefined && (
        <>
          <span className="mr-1">Available: {max.toFixed(2)}</span>
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
