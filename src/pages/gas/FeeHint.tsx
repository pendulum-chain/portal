export const FeeHint = ({ amount }: { amount: number }) => {
  const ONE_TRANSACTION_FEE = 0.0002;
  const fees = amount / ONE_TRANSACTION_FEE;

  return (
    <div className="flex items-center justify-between rounded-lg bg-base-300 px-4 py-3 mb-6">
      <p> Covers fees for</p>
      <p> {fees} transactions</p>
    </div>
  );
};
