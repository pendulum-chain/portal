interface AmountSelectorProps {
  maxBalance: bigint;
  balanceDecimals: number;
}

export function AmountSelector() {
  return (
    <div className="relative rounded-lg bg-neutral-100 dark:bg-neutral-700 p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1">
          <NumberInput
            autoFocus
            className="input-ghost w-full flex-grow text-4xl font-outfit px-0 py-3"
            placeholder="Amount"
            registerName="amount"
          />
          <Button
            className="bg-neutral-200 dark:bg-neutral-800 px-3 rounded-2xl"
            size="sm"
            type="button"
            onClick={() =>
              setValue('amount', balance / 2, {
                shouldDirty: true,
                shouldTouch: true,
              })
            }
          >
            50%
          </Button>
          <Button
            className="bg-neutral-200 dark:bg-neutral-800 px-3 rounded-2xl"
            size="sm"
            type="button"
            onClick={() =>
              setValue('amount', balance, {
                shouldDirty: true,
                shouldTouch: true,
              })
            }
          >
            MAX
          </Button>
        </div>
      </div>
      <Range
        color="primary"
        min={0}
        max={100}
        size="sm"
        value={decimalAmount ? (decimalAmount / balance) * 100 : 0}
        onChange={(ev: ChangeEvent<HTMLInputElement>) =>
          setValue('amount', roundNumber((Number(ev.currentTarget.value) / 100) * balance, 4), {
            shouldDirty: true,
            shouldTouch: false,
          })
        }
      />
    </div>
  );
}
