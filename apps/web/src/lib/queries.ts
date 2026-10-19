import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from './api';
import type { HttpMethod } from './api';
import { useUI } from '../stores/ui';

/** Variables accepted by the generic write mutation. */
export interface WriteMutationVars {
  path: string;
  method?: HttpMethod;
  body?: unknown;
}

/**
 * Generic read hook — wraps useQuery with the api client.
 * Uses the path as the query key so cache entries are path-scoped.
 */
export function useResource<T = any>(path: string, enabled = true) {
  return useQuery<T>({
    queryKey: [path],
    queryFn: () => api<T>(path),
    enabled,
  });
}

/**
 * Generic write mutation — POST/PATCH/PUT/DELETE via the api client.
 * Invalidates only the queries whose key starts with the mutated path prefix
 * so unrelated cached data is not unnecessarily refetched.
 */
export function useWrite() {
  const cache = useQueryClient();
  const notify = useUI((s) => s.notify);

  return useMutation<unknown, Error, WriteMutationVars>({
    mutationFn: ({ path, method = 'POST', body }) => api(path, method, body),
    onSuccess: (_data, { path }) => {
      // Derive the base resource path (strip trailing /id segments) to scope invalidation.
      const parts = path.split('/');
      const baseKey = parts.length > 3 ? parts.slice(0, -1).join('/') : path;
      cache.invalidateQueries({ queryKey: [baseKey], exact: false });
    },
    onError: (error) => notify(error.message),
  });
}
