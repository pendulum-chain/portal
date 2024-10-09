import { Modal } from 'react-daisyui';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { CloseButton } from '../CloseButton';

interface DialogProps {
  visible: boolean;
  onClose: () => void;
  headerText?: string;
  content: JSX.Element;
  actions?: JSX.Element;
  form?: {
    onSubmit: (event?: Event) => void | Promise<void>;
    className?: string;
  };
  id?: string;
}

export const Dialog: FC<DialogProps> = ({ visible, onClose, headerText, content, actions, id, form }) => {
  const ref = useRef<HTMLDialogElement>(null);

  // If it was the form submission we want to only close the dialog without calling onClose
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClose = useCallback(
    (dialog: HTMLDialogElement) => {
      if (isSubmitting) {
        setIsSubmitting(false);
        dialog.close();
        return;
      }

      dialog.close();
      onClose();
    },
    [isSubmitting, onClose],
  );

  const closeListener = useCallback(() => {
    const dialog = ref.current;
    if (dialog) {
      handleClose(dialog);
    }
  }, [handleClose]);

  // Manage native <dialog> events and visibility
  useEffect(() => {
    const dialog = ref.current;
    if (dialog) {
      dialog.addEventListener('close', closeListener);
      if (visible && !dialog.open) {
        dialog.showModal();
      } else if (!visible && dialog.open) {
        dialog.close();
      }

      return () => {
        dialog.removeEventListener('close', closeListener);
      };
    }
  }, [visible, closeListener, headerText]);

  const handleFormSubmit = (event: Event) => {
    if (form) {
      setIsSubmitting(true);
      event.preventDefault();
      form.onSubmit(event);
    }
  };

  const container = document.getElementById('modals');
  if (!container) return null;

  const modalBody = (
    <>
      <Modal.Body>{content}</Modal.Body>
      <Modal.Actions className="justify-center mt-4">{actions}</Modal.Actions>
    </>
  );

  return createPortal(
    <Modal className={`border border-[--modal-border] bg-base-200`} id={id} ref={ref}>
      <Modal.Header className={`claim-title mb-5 flex text-2xl ${headerText ? 'justify-between' : 'justify-end'}`}>
        {headerText} <CloseButton onClick={onClose} />
      </Modal.Header>
      {form ? (
        <form onSubmit={handleFormSubmit} className={form.className} formMethod="dialog">
          {modalBody}
        </form>
      ) : (
        modalBody
      )}
    </Modal>,
    container,
  );
};
