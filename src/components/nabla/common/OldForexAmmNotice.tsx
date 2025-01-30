import { InformationCircleIcon } from '@heroicons/react/24/outline';

export function OldForexAmmNotice() {
  return (
    <div className="mb-4 flex justify-center">
      <div className="flex w-fit items-center gap-2 rounded-md bg-gray-200 p-2 text-gray-800">
        <InformationCircleIcon className="h-4" />
        <span>
          You can find the old instance of the Forex AMM on{' '}
          <a
            className="text-primary transition hover:underline"
            href="https://old-forex-amm--rococo-souffle-a625f5.netlify.app/pendulum/nabla/swap"
          >
            this
          </a>{' '}
          page.
        </span>
      </div>
    </div>
  );
}
