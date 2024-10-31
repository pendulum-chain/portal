import React from 'react';

interface CollapseProps {
  title: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  titleClassName?: string;
  contentClassName?: string;
  [key: string]: unknown;
}

export function Collapse({ title, children, className, titleClassName, contentClassName, ...rest }: CollapseProps) {
  return (
    <div tabIndex={0} className={`collapse collapse-arrow ${className || ''}`} {...rest}>
      <input type="checkbox" />
      <div className={`collapse-title ${titleClassName || ''}`}>{title}</div>
      <div className={`collapse-content ${contentClassName || ''}`}>{children}</div>
    </div>
  );
}
