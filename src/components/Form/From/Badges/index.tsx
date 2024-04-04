interface BadgesProps {
  minBadge?: {
    value: string;
    onClick?: () => void;
  };
  maxBadge?: {
    value: string;
    onClick?: () => void;
  };
  disabled?: boolean;
}

export const Badges: React.FC<BadgesProps> = ({ minBadge, maxBadge, disabled }) => (
  <>
    {minBadge && minBadge.value ? (
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
    {maxBadge && maxBadge.value ? (
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
