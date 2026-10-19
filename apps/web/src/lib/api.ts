import { supabase } from './supabase';

/** Allowed HTTP methods for API requests. */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

/** Base URL for all API requests. Falls back to relative /api/v1 for same-origin deployments. */
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api/v1';

/**
 * Authenticated fetch wrapper for the Talibon API.
 * Reads the active Supabase session token and attaches it as a Bearer header.
 * Throws an Error with a human-readable message on non-2xx responses.
 */
export async function api<T = any>(path: string, method: HttpMethod = 'GET', body?: unknown): Promise<T> {
  const session = await supabase?.auth.getSession();
  const token = session?.data.session?.access_token;

  if (!token) throw new Error('Please sign in to continue.');

  const response = await fetch(API_BASE_URL + path, {
    method,
    headers: {
      Authorization: 'Bearer ' + token,
      ...(body ? { 'Content-Type': 'application/json' } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const payload = await response.json();

  if (!response.ok) {
    const message = Array.isArray(payload.error?.message)
      ? payload.error.message.join(', ')
      : payload.error?.message || 'Request failed';
    throw new Error(message);
  }

  return payload.data;
}
