import { useMemo } from 'preact/compat';
import { Button, Divider } from 'react-daisyui';
import { QRCodeSVG } from 'qrcode.react';

import { CopyableAddress, PublicKey } from '../../../components/PublicKey';
import TransferCountdown from '../../../components/TransferCountdown';
import { convertCurrencyToStellarAsset, deriveShortenedRequestId } from '../../../helpers/spacewalk';
import { convertRawHexKeyToPublicKey } from '../../../helpers/stellar';
import { RichIssueRequest } from '../../../hooks/spacewalk/useIssuePallet';
import { nativeStellarToDecimal } from '../../../shared/parseNumbers/metric';
import { Dialog } from '../../collators/dialogs/Dialog';

interface GenerateQRCodeAddress {
  vault_stellar_account: string;
  issue_amount: string;
  asset_code: string;
  asset_issuer: string;
  issue_request_memo: string;
}

function generateQRCodeAddress({
  vault_stellar_account,
  issue_amount,
  asset_code,
  asset_issuer,
  issue_request_memo,
}: GenerateQRCodeAddress) {
  return `web+stellar:pay?destination=${vault_stellar_account}&amount=${issue_amount}&asset_code=${asset_code}&asset_issuer=${asset_issuer}&memo=${issue_request_memo}&memo_type=MEMO_TEXT`;
}

interface ConfirmationDialogProps {
  issueRequest: RichIssueRequest | undefined;
  onClose: () => void;
  visible: boolean;
  onConfirm: () => void;
}

export function ConfirmationDialog(props: ConfirmationDialogProps): JSX.Element {
  const { issueRequest, visible, onClose, onConfirm } = props;

  const totalAmount = useMemo(
    () =>
      issueRequest
        ? nativeStellarToDecimal(issueRequest.request.amount.add(issueRequest.request.fee).toString()).toString()
        : '',
    [issueRequest],
  );

  const asset = useMemo(() => {
    const currency = issueRequest?.request.asset;
    return currency && convertCurrencyToStellarAsset(currency);
  }, [issueRequest]);

  const destination = useMemo(() => {
    const rawDestinationAddress = issueRequest?.request.stellarAddress;
    return rawDestinationAddress ? convertRawHexKeyToPublicKey(rawDestinationAddress.toHex()).publicKey() : '';
  }, [issueRequest]);

  const expectedStellarMemo = useMemo(() => {
    if (!issueRequest) {
      return '';
    }
    // For issue requests we use a shorter identifier for the memo
    return deriveShortenedRequestId(issueRequest.id);
  }, [issueRequest]);

  const qrCodeAddress = useMemo(
    () =>
      generateQRCodeAddress({
        vault_stellar_account: destination,
        issue_amount: totalAmount,
        asset_code: asset?.getCode().toString() || '',
        asset_issuer: asset?.getIssuer() || '',
        issue_request_memo: expectedStellarMemo,
      }),
    [asset, destination, expectedStellarMemo, totalAmount],
  );

  const content = useMemo(
    () => (
      <>
        <div className="text-center">
          <div className="text-xl">
            Send {totalAmount} {asset?.getCode()}
          </div>
          <div className="text-sm">
            {asset && asset.getIssuer() && (
              <>
                issued by <PublicKey variant="short" publicKey={asset?.getIssuer()} />
              </>
            )}
          </div>
          <div className="text mt-4">With the text memo</div>
          {issueRequest && <CopyableAddress variant="short" publicKey={expectedStellarMemo} />}
          <div className="text mt-4">In a single transaction to</div>
          <CopyableAddress variant="short" publicKey={destination} />

          {qrCodeAddress ? (
            <>
              <p className="text-center mt-4">OR</p>
              <div className="mt-4 flex justify-center">
                <QRCodeSVG value={qrCodeAddress} />
              </div>
            </>
          ) : null}
          {qrCodeAddress ? (
            <>
              <p className="text-center mt-4">OR</p>{' '}
              <a href={qrCodeAddress} className="btn btn-primary">
                Sign tx
              </a>
            </>
          ) : null}

          <div className="mt-4">Within {issueRequest && <TransferCountdown request={issueRequest?.request} />}</div>
        </div>

        <Divider />
        <div>
          {asset?.getAssetType() !== 'native' && (
            <div className="text-sm">
              Warning: Make sure that the {asset?.code} you are sending are issued by the correct issuer.
            </div>
          )}
        </div>

        <div className="text-sm mt-4">Note:</div>
        <ul className="text-sm list-disc list-inside">
          <li className="mt-1">
            Stellar transactions require memos for accurate processing. Failure to include the transaction memo may
            result in the loss of your coins.
          </li>
          <li className="mt-1">
            Estimated time for issuing is in a minute after submitting the Stellar payment to the vault, contact
            <a href="https://t.me/pendulum_chain" target="_blank" rel="noreferrer" className="mx-1 text-primary">
              support
            </a>
            if your transaction is still pending after 10 minutes.
          </li>
        </ul>
      </>
    ),
    [asset, destination, expectedStellarMemo, issueRequest, qrCodeAddress, totalAmount],
  );

  const actions = useMemo(
    () => (
      <Button color="primary" onClick={onConfirm}>
        I have made the payment
      </Button>
    ),
    [onConfirm],
  );

  return <Dialog headerText="Deposit" visible={visible} onClose={onClose} content={content} actions={actions} />;
}
