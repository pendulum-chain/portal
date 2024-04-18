import { Button } from 'react-daisyui';
import { NavLink } from 'react-router-dom';

import ampe from '../../assets/ampe.svg';
import pen from '../../assets/pen.svg';
import { Arrow } from '../../assets/Arrow';
import { Warning } from '../../assets/Warning';
import { useAccountBalance } from '../../shared/useAccountBalance';
import useSwitchChain from '../../hooks/useSwitchChain';
import { useNodeInfoState } from '../../NodeInfoProvider';
import { TenantName } from '../../models/Tenant';

const tenantColors = {
  [TenantName.Pendulum]: {
    background: 'bg-accent',
    warningFill: '#000000',
    text: 'text-black',
    arrowFill: '#1DE7DF',
    tokenIcon: pen,
    button: 'base-content',
  },
  [TenantName.Amplitude]: {
    background: 'bg-black',
    warningFill: '#4EE59A',
    text: 'text-primary',
    arrowFill: '#4EE59A',
    tokenIcon: ampe,
    button: 'primary',
  },
};

const getTenantColors = (tenantName: TenantName) => {
  if (tenantName === TenantName.Amplitude || tenantName === TenantName.Foucoco || tenantName === TenantName.Local) {
    return tenantColors[TenantName.Amplitude];
  }

  return tenantColors[tenantName];
};

const InsufficientFundsTooltip = ({ tenantName }: { tenantName: TenantName }) => {
  const colors = getTenantColors(tenantName);

  return (
    <div className={`rounded-lg h-8 px-3 flex items-center ${colors.background}`}>
      <div className="mr-2">
        <Warning fill={colors.warningFill} />
      </div>
      <p className={`text-[9px] ${colors.text}`}>
        Insufficient funds to <br /> execute transactions
      </p>
    </div>
  );
};

const JumpingArrow = ({ tenantName }: { tenantName: TenantName }) => {
  const colors = getTenantColors(tenantName);

  return (
    <div className="mx-3">
      <div className="animate-bounce-x">
        <Arrow fill={colors.arrowFill} />
      </div>
    </div>
  );
};

const getTokenIcon = (currentTenant: TenantName) => {
  const icons = getTenantColors(currentTenant);
  return <img src={icons.tokenIcon} className="mr-1.5" />;
};

export const GetToken = () => {
  const { balance } = useAccountBalance();
  const { currentTenant } = useSwitchChain();
  const { tokenSymbol } = useNodeInfoState().state;

  const link = `/${currentTenant}/gas`;

  const isBalanceZero = Number(balance) === 0;

  return (
    <section className="flex items-center">
      {isBalanceZero && (
        <>
          <InsufficientFundsTooltip tenantName={currentTenant} />
          <JumpingArrow tenantName={currentTenant} />
        </>
      )}

      {tokenSymbol ? (
        <NavLink to={link}>
          <Button
            size="sm"
            className={`text-sm px-2 sm:px-3 bg-${getTenantColors(currentTenant).button}`}
            type="button"
          >
            {getTokenIcon(currentTenant)}
            <p className="text-neutral">GET {tokenSymbol}</p>
          </Button>
        </NavLink>
      ) : (
        <></>
      )}
    </section>
  );
};
