import { useMemo } from 'preact/hooks';
import { toast } from 'react-toastify';

export function useClipboard() {
  return useMemo(
    () => ({
      async copyToClipboard(value: string, notificationMessage?: string) {
        try {
          await navigator.clipboard.writeText(value);
          const message = notificationMessage || `Copied ${value} to clipboard`;
          toast(message, { type: 'info' });
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          toast(error, { type: 'error' });
        }
      },
    }),
    [],
  );
}
