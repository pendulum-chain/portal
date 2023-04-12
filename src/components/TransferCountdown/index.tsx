import { VoidFn } from '@polkadot/api-base/types';
import { SpacewalkPrimitivesIssueIssueRequest, SpacewalkPrimitivesRedeemRedeemRequest } from '@polkadot/types/lookup';
import { DateTime } from 'luxon';
import { h } from 'preact';
import { useMemo } from 'react';
import { useEffect, useState } from 'react';
import { calculateDeadline } from '../../helpers/spacewalk';
import { useSecurityPallet } from '../../hooks/spacewalk/security';

interface TransferCountdownProps {
  request: SpacewalkPrimitivesIssueIssueRequest | SpacewalkPrimitivesRedeemRedeemRequest;
}

const TransferCountdown = ({ request }: TransferCountdownProps) => {
  const { subscribeActiveBlockNumber } = useSecurityPallet();
  const [activeBlockNumber, setActiveBlockNumber] = useState<number>(0);
  const [remainingDurationString, setRemainingDurationString] = useState<string>('');

  useEffect(() => {
    let unsub: VoidFn = () => undefined;
    subscribeActiveBlockNumber((blockNumber) => {
      setActiveBlockNumber(blockNumber);
    }).then((u) => (unsub = u));

    return unsub;
  }, [subscribeActiveBlockNumber]);

  const deadline = useMemo(() => {
    const openTime = request.opentime.toNumber() || 0;
    const period = request.period.toNumber() || 0;
    const end = calculateDeadline(activeBlockNumber, openTime, period, 12);

    return end;
  }, [activeBlockNumber, request]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newDeadlineString = deadline.diff(DateTime.now()).toFormat('hh:mm:ss');
      setRemainingDurationString(newDeadlineString);
    });

    return () => clearInterval(interval);
  }, [deadline]);

  return <div className="transfer-timer">{remainingDurationString}</div>;
};

export default TransferCountdown;
