import { ReactNode, useEffect, useId, useRef } from 'react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
  maxWidth?: string;
}

/**
 * Accessible modal dialog built on the native `<dialog>` element.
 * Opens/closes imperatively via showModal()/close() to preserve browser-native
 * focus trapping and backdrop behaviour.
 */
export function Modal({ isOpen, onClose, title, description, children }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const id = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (isOpen && !dialog?.open) dialog?.showModal();
    else if (!isOpen && dialog?.open) dialog.close();
  }, [isOpen]);

  return (
    <dialog ref={ref} aria-labelledby={id} onCancel={onClose} onClose={onClose} className="modal">
      <header>
        <div>
          <h2 id={id}>{title}</h2>
          {description && <p>{description}</p>}
        </div>
        <button type="button" aria-label="Close dialog" onClick={onClose}>&#x2715;</button>
      </header>
      {children}
    </dialog>
  );
}

/** Side-drawer variant — renders as a modal with drawer styling applied via CSS. */
export function Drawer(props: ModalProps) {
  return <Modal {...props} />;
}

export const Dialog = Modal;
