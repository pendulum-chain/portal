import { FC } from 'preact/compat';
import useSwitchChain from '../../../../hooks/useSwitchChain';
import { TenantName } from '../../../../models/Tenant';

export interface BadgeProps {
  value: string;
  onClick?: () => void;
}

interface BadgesProps {
  minBadge?: BadgeProps;
  maxBadge?: BadgeProps;
  disabled?: boolean;
}

const tenantColors = {
  [TenantName.Pendulum]: {
    min: 'border-primary text-primary hover:bg-primary hover:text-white',
    max: 'border-[--text] text-[--text] hover:bg-[--text] hover:text-white',
  },
  [TenantName.Amplitude]: {
    min: 'badge-secondary-content hover:badge-secondary text-black',
    max: 'badge-secondary-content  hover:badge-accent text-black hover:text-black',
  },
};

const getTenantColors = (tenantName: TenantName) => {
  if (tenantName === TenantName.Amplitude || tenantName === TenantName.Foucoco || tenantName === TenantName.Local) {
    return tenantColors[TenantName.Amplitude];
  }

  return tenantColors[tenantName];
};

export const Badges: FC<BadgesProps> = ({ minBadge, maxBadge, disabled }) => {
  const { currentTenant } = useSwitchChain();
  const colors = getTenantColors(currentTenant);

  return (
    <>
      {minBadge && Number(minBadge.value) ? (
        <div
          className={`badge ${disabled ? '' : `${colors.min} cursor-pointer`} text-xs mr-2.5`}
          onClick={() => {
            if (!disabled && minBadge.onClick) {
              minBadge.onClick();
            }
          }}
        >
          Min {minBadge.value}
        </div>
      ) : (
        <></>
      )}
      {maxBadge && Number(maxBadge.value) ? (
        <div
          className={`badge ${disabled ? '' : `${colors.max} cursor-pointer`}  text-xs`}
          onClick={() => {
            if (!disabled && maxBadge.onClick) {
              maxBadge.onClick();
            }
          }}
        >
          Max {maxBadge.value}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
