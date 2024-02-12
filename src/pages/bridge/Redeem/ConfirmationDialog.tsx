import { Button, Modal } from 'react-daisyui';
import { useNavigate } from 'react-router-dom';
import { useGlobalState } from '../../../GlobalStateProvider';
import { PublicKey } from '../../../components/PublicKey';
import { convertCurrencyToStellarAsset } from '../../../helpers/spacewalk';
import { RichRedeemRequest } from '../../../hooks/spacewalk/redeem';
import { nativeStellarToDecimal } from '../../../shared/parseNumbers';

interface ConfirmationDialogProps {
  redeemRequest: RichRedeemRequest | undefined;
  onClose: () => void;
  visible: boolean;
}

export function ConfirmationDialog(props: ConfirmationDialogProps): JSX.Element {
  const { redeemRequest, visible, onClose } = props;
  const navigateTo = useNavigate();
  const { tenantName } = useGlobalState();
  const totalAmount = redeemRequest ? nativeStellarToDecimal(redeemRequest.request.amount.toString()).toString() : '';
  const currency = redeemRequest?.request.asset;
  const asset = currency && convertCurrencyToStellarAsset(currency);

  return (
    <Modal open={visible}>
      <Modal.Header className="font-bold">Back to Stellar</Modal.Header>
      <Button color="ghost" size="md" shape="circle" className="absolute right-4 top-4" onClick={onClose}>
        ✕
      </Button>
      <Modal.Body>
        <div className="text-center text-primary-content">
          <div className="text-xl">
            You will receive {totalAmount} {asset?.getCode()}
          </div>
          {asset && asset.getIssuer() && (
            <>
              issued by <PublicKey variant="short" publicKey={asset?.getIssuer()} />
            </>
          )}
          <div className="text-sm  text-primary-content mt-4">Your request is being processed</div>
        </div>
        <div className="mt-6  text-primary-content">
          <div className="text-sm mt-2">
            We will update the transaction when PEN payment is executed. This typically takes only a few minutes but may
            sometimes take up to 6 hours.
          </div>
        </div>
      </Modal.Body>

      <Modal.Actions className="justify-center">
        <Button
          color="primary"
          onClick={() => {
            navigateTo(`/${tenantName}/spacewalk/transfers`);
          }}
        >
          View Progress
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
