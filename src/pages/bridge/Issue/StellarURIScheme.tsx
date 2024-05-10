import { FC } from 'preact/compat';
import { QRCodeSVG } from 'qrcode.react';

export const StellarUriScheme: FC<{ transactionURIScheme: string | null }> = ({ transactionURIScheme }) => {
  if (!transactionURIScheme) {
    return null;
  }

  return (
    <>
      <p className="text-center mt-4">OR</p>
      <div className="mt-4 flex justify-center">
        <QRCodeSVG value={transactionURIScheme} />
      </div>
      <p className="text-center mt-4">OR</p>
      <a href={transactionURIScheme} className="btn btn-primary">
        Sign tx
      </a>
    </>
  );
};
