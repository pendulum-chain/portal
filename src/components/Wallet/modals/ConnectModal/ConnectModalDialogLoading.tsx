import { Loading } from 'react-daisyui';

interface ConnectModalDialogLoadingProps {
  selectedWallet: string;
}

export const ConnectModalDialogLoading = ({ selectedWallet }: ConnectModalDialogLoadingProps) => (
  <article className="flex flex-col items-center justify-center">
    <Loading variant="dots" />
    <h1 className="text-2xl">Connecting wallet</h1>
    <p className="mt-2.5 w-52 text-center text-sm">Please approve {selectedWallet} and approve transaction.</p>
  </article>
);
