interface AvailableActionsProps {
  max?: number;
  setValue?: (n: number) => void;
  hideAvailableBalance?: boolean;
}

export const AvailableActions = ({ max, setValue, hideAvailableBalance = false }: AvailableActionsProps) => (
  <div className="flex gap-1 text-sm">
    {max !== undefined && setValue !== undefined && (
      <>
        {hideAvailableBalance ? <></> : <span className="mr-1">Available: {max.toFixed(2)}</span>}
        <button className="text-primary hover:underline" onClick={() => setValue(Number(max) * 0.5)} type="button">
          50%
        </button>
        <button className="text-primary hover:underline" onClick={() => setValue(Number(max))} type="button">
          MAX
        </button>
      </>
    )}
  </div>
);
