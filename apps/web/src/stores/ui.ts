import { create } from 'zustand';

/** Duration in ms before the toast notification auto-dismisses. */
export const TOAST_DURATION_MS = 4000;

interface UIState {
  /** Whether the dashboard is in drag-to-edit mode. */
  editing: boolean;
  setEditing: (value: boolean) => void;
  /** Current toast message. Empty string means no toast is showing. */
  toast: string;
  /** Display a toast notification with the given message. */
  notify: (message: string) => void;
}

export const useUI = create<UIState>((set) => ({
  editing: false,
  setEditing: (editing) => set({ editing }),
  toast: '',
  notify: (toast) => set({ toast }),
}));
