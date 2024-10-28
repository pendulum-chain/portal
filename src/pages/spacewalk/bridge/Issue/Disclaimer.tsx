import { useCallback, useState } from 'react';
import BellIcon from '../../../../assets/bell';
import { TenantName } from '../../../../models/Tenant';
import { PENDULUM_SUPPORT_CHAT_URL } from '../../../../shared/constants';

type Props = {
  tenant: TenantName;
};

function AmplitudeDisclaimer() {
  return (
    <ul className="list-disc pl-4">
      <li>Bridge Fee: 0.1% of total bridging amount.</li>
      <li>Security Deposit: 0.5% of the transaction amount in AMPE, returned after successful bridging.</li>
      <li>
        Estimated Time: Within a minute after submitting the Stellar transaction. Contact
        <a href={PENDULUM_SUPPORT_CHAT_URL} target="_blank" rel="noreferrer" className="mx-1 text-primary underline">
          support
        </a>
        if your transaction is still pending after 10 minutes.
      </li>
    </ul>
  );
}

function PendulumDisclaimer() {
  return (
    <ul className="list-disc pl-4">
      <li>Bridge Fee: Enjoy zero fees now, 0.1% coming soon.</li>
      <li>Security Deposit: 0.5% of the transaction amount in PEN, refunded after successful bridging.</li>
      <li>
        Estimated Time: Within a minute after submitting the Stellar transaction. Contact
        <a href={PENDULUM_SUPPORT_CHAT_URL} target="_blank" rel="noreferrer" className="mx-1 text-primary/50 underline">
          support
        </a>
        if your transaction is still pending after 10 minutes.
      </li>
    </ul>
  );
}

export default function Disclaimer({ tenant }: Props) {
  const [collapseVisibility, setCollapseVisibility] = useState('');

  const toggle = useCallback(() => {
    if (collapseVisibility === '') {
      setCollapseVisibility('collapse-open');
    } else {
      setCollapseVisibility('');
      const elem = document.activeElement;
      if (elem && elem instanceof HTMLElement) {
        elem.blur();
      }
    }
  }, [collapseVisibility, setCollapseVisibility]);

  return (
    <div
      tabIndex={0}
      onClick={toggle}
      className={`disclaimer collapse collapse-arrow my-4 cursor-pointer rounded-lg bg-base-300 ${collapseVisibility}`}
    >
      <div className="collapse-title flex flex-row items-center">
        <BellIcon />
        <strong className="ml-2">Bridge Terms</strong>
      </div>
      <p className="collapse-content whitespace-pre-line text-sm">
        {tenant === TenantName.Pendulum ? <PendulumDisclaimer /> : <AmplitudeDisclaimer />}
      </p>
    </div>
  );
}
