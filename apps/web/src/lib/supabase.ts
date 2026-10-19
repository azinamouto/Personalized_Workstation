import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!url || !key) {
  console.warn(
    '[supabase] VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY is not set. ' +
    'Authentication will be unavailable.'
  );
}

/**
 * Supabase browser client.
 * Will be `null` when environment variables are not configured —
 * auth-dependent code must guard against this.
 */
export const supabase = url && key ? createClient(url, key) : null;
