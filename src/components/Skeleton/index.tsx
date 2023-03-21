import { CSSProperties, HTMLAttributes } from 'preact/compat';

export type SkeletonProps = {
  style?: CSSProperties;
} & Omit<HTMLAttributes<HTMLDivElement>, 'style'>;

export const Skeleton = ({ className, children, ...rest }: SkeletonProps) => (
  <div {...rest} className={`bg-base-200 dark:bg-base-200 rounded-lg ${className} animate-pulse`}>
    <div className="invisible">{children}</div>
  </div>
);
