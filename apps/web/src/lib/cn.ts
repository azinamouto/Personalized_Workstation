/**
 * Lightweight className utility.
 * Joins truthy string arguments with a space — drop-in alternative to clsx
 * for simple cases without the extra dependency.
 *
 * @example
 * cn('btn', isActive && 'btn--active', disabled && 'btn--disabled')
 * // => 'btn btn--active'  (when isActive=true, disabled=false)
 */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}
