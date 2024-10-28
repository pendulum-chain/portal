import { FC } from 'react';
import { QRCodeSVG } from 'qrcode.react';

export const StellarUriScheme: FC<{ transactionURIScheme: string | null }> = ({ transactionURIScheme }) => {
  if (!transactionURIScheme) {
    return null;
  }

  return (
    <>
      <p className="mt-4 text-center">OR</p>
      <p className="mt-4 text-center">Scan the QR code with a Stellar wallet</p>
      <div className="mt-4 flex justify-center">
        <div className="rounded-lg bg-white p-2">
          <QRCodeSVG value={transactionURIScheme} />
        </div>
      </div>
    </>
  );
};
