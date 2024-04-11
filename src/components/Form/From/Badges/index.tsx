export interface BadgeProps {
  value: string;
  onClick?: () => void;
}

interface BadgesProps {
  minBadge?: BadgeProps;
  maxBadge?: BadgeProps;
  disabled?: boolean;
}

export const Badges: React.FC<BadgesProps> = ({ minBadge, maxBadge, disabled }) => (
  <>
    {minBadge && Number(minBadge.value) ? (
      <div
        className={`badge ${
          disabled ? '' : 'badge-secondary-content hover:badge-secondary text-black cursor-pointer'
        } text-xs mr-2.5`}
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
        className={`badge ${
          disabled ? '' : 'badge-secondary-content  hover:badge-accent text-black hover:text-black cursor-pointer '
        }  text-xs`}
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
