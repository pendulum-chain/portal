export type PoolProgressProps = {
  symbol: string;
  amount: number;
  className?: string;
};

export const PoolProgress = ({ symbol, amount, className = '' }: PoolProgressProps) => {
  return (
    <div className="flex items-center justify-center mt-6">
      <div className={`inline-flex rounded-xl bg-neutral-100 dark:bg-neutral-700 p-4 gap-2 ${className}`}>
        <span className="font-outfit font-medium truncate" title={String(amount)}>
          <strong className="text-3xl mr-1">{amount}</strong>
          <span className="text-xl">{symbol}</span>
        </span>
      </div>
    </div>
  );
};
