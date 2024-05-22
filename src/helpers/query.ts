import { QueryClient, QueryKey } from '@tanstack/react-query';

export function refetchDelayed(queryClient: QueryClient, queryKey: QueryKey, delayMilliseconds = 2000) {
  setTimeout(() => {
    queryClient.refetchQueries(queryKey);
  }, delayMilliseconds);
}
