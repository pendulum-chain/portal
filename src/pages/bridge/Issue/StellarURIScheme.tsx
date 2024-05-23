import { FC } from 'preact/compat';
import { QRCodeSVG } from 'qrcode.react';

export const StellarUriScheme: FC<{ transactionURIScheme: string | null }> = ({ transactionURIScheme }) => {
  if (!transactionURIScheme) {
    return null;
  }

  return (
    <>
      <p className="text-center mt-4">OR</p>
      <p className="text-center mt-4">Scan the QR code with a Stellar wallet</p>
      <div className="mt-4 flex justify-center">
        <div className="p-2 bg-white rounded-lg">
          <QRCodeSVG value={transactionURIScheme} />
        </div>
      </div>
    </>
  );
};
