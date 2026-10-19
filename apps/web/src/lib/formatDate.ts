/**
 * Format an ISO date-time string into a short human-readable form.
 * Uses the browser's locale by default.
 *
 * @example
 * formatDate('2026-10-20T14:00:00Z')           // "Oct 20, 2026"
 * formatDate('2026-10-20T14:00:00Z', 'time')   // "2:00 PM"
 * formatDate('2026-10-20T14:00:00Z', 'full')   // "Oct 20, 2026, 2:00 PM"
 */
export function formatDate(
  iso: string,
  mode: 'date' | 'time' | 'full' = 'date',
): string {
  const date = new Date(iso);
  if (isNaN(date.getTime())) return iso; // return raw string if unparseable

  if (mode === 'time') {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  if (mode === 'full') {
    return date.toLocaleString([], {
      month: 'short', day: 'numeric', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  }
  return date.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
}
