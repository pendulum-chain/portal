import pendulumIcon from '../../../assets/pendulum-icon.svg';
const sizes = {
  sm: 'h-[1em]',
  md: 'h-[1.5em]',
  lg: 'h-[2em]',
  xl: 'h-[3em]',
};

export type BadgeProps = {
  size?: keyof typeof sizes;
  className?: string;
  children?: ReactNode;
};

const AssetBadge = ({ size = 'md', className, children }: BadgeProps): JSX.Element | null => {
  return (
    <span
      className={`flex min-w-[70px] items-center justify-between rounded-full bg-neutral-200 pr-[.5em] font-semibold ${
        sizes[size]
      } ${className || ''}`}
    >
      <span className="mr-1 h-full shrink-0 grow rounded-full bg-neutral-300 p-[.1em]">
        <img src={pendulumIcon} alt="Pendulum" className="h-full w-auto" width={42} height={42} />
      </span>
      {children}
    </span>
  );
};
export default AssetBadge;
