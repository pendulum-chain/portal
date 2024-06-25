import { hexToU8a } from '@polkadot/util';
import { DateTime } from 'luxon';
import { useEffect, useMemo, useState } from 'preact/compat';

import { useGlobalState } from '../../../../GlobalStateProvider';
import PendingDialogIcon from '../../../../assets/dialog-status-pending';
import { CopyableAddress } from '../../../../components/PublicKey';
import TransferCountdown from '../../../../components/TransferCountdown';
import {
  calculateDeadline,
  convertCurrencyToStellarAsset,
  deriveShortenedRequestId,
} from '../../../../helpers/spacewalk';
import { convertRawHexKeyToPublicKey } from '../../../../helpers/stellar';
import { toTitle } from '../../../../helpers/string';
import { useSecurityPallet } from '../../../../hooks/spacewalk/useSecurityPallet';
import { nativeToDecimal } from '../../../../shared/parseNumbers/metric';
import { TransferType } from '../TransactionsColumns';
import { TransferDialogProps, BaseTransferDialog } from './TransferDialog';
import { PENDULUM_SUPPORT_CHAT_URL } from '../../../../shared/constants';

export function PendingTransferDialog(props: TransferDialogProps) {
  const { transfer, visible, onClose } = props;
  const stellarAsset = convertCurrencyToStellarAsset(transfer.original.asset)?.getCode();
  const destinationStellarAddress = convertRawHexKeyToPublicKey(transfer.original.stellarAddress.toHex()).publicKey();
  const amountToSend = nativeToDecimal(transfer.original.amount.add(transfer.original.fee).toNumber());
  const { tenantName } = useGlobalState();
  const { getActiveBlockNumber } = useSecurityPallet();
  const [, setDeadline] = useState<DateTime>();

  useEffect(() => {
    getActiveBlockNumber().then((active) => {
      setDeadline(
        calculateDeadline(active as number, transfer.original.opentime.toNumber(), transfer.original.period.toNumber()),
      );
    });
  }, [getActiveBlockNumber, setDeadline, transfer.original.opentime, transfer.original.period]);

  const expectedStellarMemo = useMemo(() => {
    // For issue requests we use a shorter identifier for the memo
    return deriveShortenedRequestId(hexToU8a(transfer.transactionId));
  }, [transfer]);

  const issueContent = (
    <>
      <>
        <div
          className="text-xl transfer-dialog-contrast-text text-semibold"
          title={amountToSend.toString()}
        >{`Send ${amountToSend.toNumber()} ${stellarAsset}`}</div>
        <div className="mt-2" />
        <div className="transfer-dialog-text flex justify'center text ">
          <div className="mr-2">With the text memo</div>
          <CopyableAddress
            inline={true}
            variant="short"
            publicKey={expectedStellarMemo}
            className="transfer-dialog-text"
          />
        </div>
        <div className="flex justify-center text-md transfer-dialog-text">
          <div className="mr-2">In a single transaction to</div>
          <CopyableAddress
            inline={true}
            className="text-sm p-0 transfer-dialog-text"
            variant="short"
            publicKey={destinationStellarAddress}
          />
        </div>
        <div className="transfer-dialog-text text-md mt-2">
          Within <TransferCountdown request={transfer.original} />
        </div>
      </>

      <label className="transfer-dialog-label rounded px-4 py-2 my-4 text font-semibold ">
        {transfer.type === TransferType.issue ? `To ${toTitle(tenantName)}` : `To Stellar`}
      </label>
      <div className="mt-4" />
      <div className="text-sm px-5 ">
        Note: Estimated time for issuing is in a minute after submitting the Stellar payment to the vault, contact
        <a href={PENDULUM_SUPPORT_CHAT_URL} target="_blank" rel="noreferrer" className="mx-1 text-primary">
          support
        </a>
        if your transaction is still pending after 10 minutes.
      </div>
      <div className="mt-4" />
    </>
  );
  const redeemContent = (
    <>
      <div className="text-xl mb-2">{`${amountToSend} ${stellarAsset}`}</div>
      <div className="text-md">The vault has to complete the transaction in:</div>
      <TransferCountdown request={transfer.original} />
      <div className="mt-2" />

      <div className="mt-2" />
    </>
  );
  return (
    <BaseTransferDialog
      id="pending-transfer-modal"
      transfer={transfer}
      title={'Pending'}
      visible={visible}
      showMemo={transfer.type === TransferType.issue}
      content={transfer.type === TransferType.issue ? issueContent : redeemContent}
      statusIcon={<PendingDialogIcon />}
      onClose={onClose}
      onConfirm={onClose}
    />
  );
}
