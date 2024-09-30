export type PoolProgressProps = {
  symbol: string;
  amount: string;
  className?: string;
};

export const PoolProgress = ({ symbol, amount, className = '' }: PoolProgressProps) => {
  return (
    <div className="mt-6 flex items-center justify-center">
      <div className={`inline-flex gap-2 rounded-xl bg-neutral-100 p-4 dark:bg-neutral-700 ${className}`}>
        <span className="font-outfit truncate font-medium" title={String(amount)}>
          <strong className="mr-1 text-3xl">{amount}</strong>
          <span className="text-xl">{symbol}</span>
        </span>
      </div>
    </div>
  );
};
