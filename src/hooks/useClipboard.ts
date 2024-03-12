import { useMemo } from 'preact/hooks';
import { ToastMessage, showToast } from '../shared/showToast';

export function useClipboard() {
  return useMemo(
    () => ({
      async copyToClipboard(value: string, notificationMessage?: string) {
        try {
          await navigator.clipboard.writeText(value);
          const message = notificationMessage || `Copied ${value} to clipboard`;
          showToast(ToastMessage.INFO, message);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          showToast(ToastMessage.ERROR, error);
        }
      },
    }),
    [],
  );
}
