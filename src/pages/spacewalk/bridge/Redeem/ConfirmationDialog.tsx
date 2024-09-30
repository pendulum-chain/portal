import { Button } from 'react-daisyui';
import { useNavigate } from 'react-router-dom';
import { useMemo } from 'preact/hooks';
import { useGlobalState } from '../../../../GlobalStateProvider';
import { PublicKey } from '../../../../components/PublicKey';
import { convertCurrencyToStellarAsset } from '../../../../helpers/spacewalk';
import { RichRedeemRequest } from '../../../../hooks/spacewalk/useRedeemPallet';
import { nativeStellarToDecimal } from '../../../../shared/parseNumbers/metric';
import { Dialog } from '../../../../components/Dialog';
import { PENDULUM_SUPPORT_CHAT_URL } from '../../../../shared/constants';
import { PAGES_PATHS } from '../../../../app';

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

  const content = useMemo(
    () => (
      <>
        <div className="text-center">
          <div className="text-xl">
            You will receive {totalAmount} {asset?.getCode()}
          </div>
          {asset && asset.getIssuer() && (
            <div className="flex items-center justify-center text-sm">
              <div>issued by</div> <PublicKey variant="short" publicKey={asset?.getIssuer()} />
            </div>
          )}
          <div className="mt-4 text-sm">Your request is being processed</div>
        </div>
        <div className="mt-6">
          <div className="mt-2 text-sm text-center">
            This typically takes only a few minutes. Contact
            <a href={PENDULUM_SUPPORT_CHAT_URL} target="_blank" rel="noreferrer" className="mx-1 text-primary">
              support
            </a>
            if your transaction is still pending after 10 minutes.
          </div>
        </div>
      </>
    ),
    [asset, totalAmount],
  );

  const actions = useMemo(
    () => (
      <Button
        color="primary"
        onClick={() => {
          navigateTo(`/${tenantName}/${PAGES_PATHS.TRANSACTIONS}`);
        }}
      >
        View Progress
      </Button>
    ),
    [navigateTo, tenantName],
  );

  return <Dialog headerText="To Stellar" visible={visible} onClose={onClose} content={content} actions={actions} />;
}
