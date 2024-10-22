import { useState, useEffect } from 'preact/compat';
import { Card } from 'react-daisyui';

import { ExternalIcon } from '../../assets/ExternalIcon';

export interface CardExternalLinkProps {
  title: string;
  children: JSX.Element;
  href: string | Promise<string>;
}

export function CardExternalLink({ children, href }: CardExternalLinkProps) {
  const [finalHref, setFinalHref] = useState<string>('');

  useEffect(() => {
    if (typeof href === 'string') {
      setFinalHref(href);
    } else {
      href.then(setFinalHref);
    }
  }, [href]);

  return (
    <a href={finalHref} target="_blank" rel="noreferrer">
      <Card className="mt-2 flex h-20 flex-row items-center rounded-md bg-base-300/60 px-4 hover:opacity-70">
        {children}
        <ExternalIcon className="ml-auto mr-1 h-5 w-5 dark:fill-white" />,
      </Card>
    </a>
  );
}
