interface QueryStateProps {
  /** Any TanStack Query result object — only needs isPending and error. */
  query: { isPending: boolean; error: Error | null };
  /** When true, renders the empty-state callout instead of null. */
  empty?: boolean;
  /** Override the empty-state heading. Defaults to "Nothing here yet". */
  emptyHeading?: string;
  /** Override the empty-state body. Defaults to "Add your first item to get started." */
  emptyMessage?: string;
}

/** Renders a loading skeleton, error alert, empty state, or null depending on query status. */
export function QueryState({
  query,
  empty = false,
  emptyHeading = 'Nothing here yet',
  emptyMessage = 'Add your first item to get started.',
}: QueryStateProps) {
  if (query.isPending) return <div aria-label="Loading" className="skeleton" />;
  if (query.error) return <div role="alert" className="error">{query.error.message}</div>;
  if (empty) return (
    <div className="empty">
      <h3>{emptyHeading}</h3>
      <p>{emptyMessage}</p>
    </div>
  );
  return null;
}
