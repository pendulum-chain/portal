import Big from 'big.js';

export const FeeHint = ({ amount }: { amount: string }) => {
  const ONE_TRANSACTION_FEE = 0.0002;
  const fees = new Big(Number(amount || 0)).div(ONE_TRANSACTION_FEE).toFixed(0);

  return (
    <div className="mb-6 flex items-center justify-between rounded-lg bg-base-300 px-4 py-3">
      <p> Covers fees for</p>
      <p> {Number(fees) || 0} transactions</p>
    </div>
  );
};
