import { useMemo } from 'preact/compat';
import { Button, Modal } from 'react-daisyui';
import { CopyableAddress, PublicKey } from '../../../components/PublicKey';
import { convertCurrencyToStellarAsset } from '../../../helpers/spacewalk';
import { convertRawHexKeyToPublicKey } from '../../../helpers/stellar';
import { RichRedeemRequest } from '../../../hooks/spacewalk/redeem';
import { nativeStellarToDecimal } from '../../../shared/parseNumbers';

interface ConfirmationDialogProps {
  redeemRequest: RichRedeemRequest | undefined;
  onClose: () => void;
  visible: boolean;
}

export function ConfirmationDialog(props: ConfirmationDialogProps): JSX.Element {
  const { redeemRequest, visible, onClose } = props;

  const totalAmount = redeemRequest ? nativeStellarToDecimal(redeemRequest.request.amount.toString()).toString() : '';
  const currency = redeemRequest?.request.asset;
  const asset = currency && convertCurrencyToStellarAsset(currency);

  const destination = useMemo(() => {
    const rawDestinationAddress = redeemRequest?.request.stellarAddress;
    return rawDestinationAddress ? convertRawHexKeyToPublicKey(rawDestinationAddress.toHex()).publicKey() : '';
  }, [redeemRequest?.request.stellarAddress]);

  return (
    <Modal open={visible}>
      <Modal.Header className="font-bold">Back to Stellar</Modal.Header>
      <Button color="ghost" size="md" shape="circle" className="absolute right-4 top-4" onClick={onClose}>
        ✕
      </Button>
      <Modal.Body>
        <div className="text-center">
          <div className="text-xl">
            You will receive {totalAmount} {asset?.getCode()}
          </div>
          {asset && asset.getIssuer() && (
            <>
              issued by <PublicKey variant="short" publicKey={asset?.getIssuer()} />
            </>
          )}
          <div className="text-sm text-secondary mt-4">Your request is being processed</div>
        </div>
        <div className="mt-6 text-secondary">
          <div className="flex items-center justify-between">
            <span>Stellar destination address</span>
            <CopyableAddress variant="short" publicKey={destination} />
          </div>
          <div className="text-sm mt-2">
            We will inform you when the PEN payment is executed. This typically takes only a few minutes but may
            sometimes take up to 6 hours.
          </div>
        </div>
      </Modal.Body>

      <Modal.Actions className="justify-center">
        <Button color="primary" onClick={onClose}>
          View Progress
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
