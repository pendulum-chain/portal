import { useState, useEffect } from 'react';

export function useResolvedUrl(url: string | Promise<string>) {
  const [finalUrl, setFinalUrl] = useState<string>('');

  useEffect(() => {
    if (typeof url === 'string') {
      setFinalUrl(url);
    } else {
      url.then(setFinalUrl);
    }
  }, [url]);

  return finalUrl;
}
