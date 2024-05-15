import { Modal } from 'react-daisyui';
import { createPortal, useCallback, useEffect, useRef, useState } from 'preact/compat';

import { CloseButton } from '../../../components/CloseButton';

interface DialogProps {
  visible: boolean;
  onClose: () => void;
  headerText?: string;
  content: JSX.Element;
  actions: JSX.Element;
  form?: {
    onSubmit: (event?: Event) => void | Promise<void>;
    className?: string;
  };
  id?: string;
}

export const Dialog: React.FC<DialogProps> = ({ visible, onClose, headerText, content, actions, id, form }) => {
  const ref = useRef<HTMLDialogElement>(null);

  // If it was the form submission we want to only close the dialog without calling onClose
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClose = useCallback(
    (dialog: HTMLDialogElement) => {
      console.log('isSubmitting: ', isSubmitting);
      if (isSubmitting) {
        console.log('dialog.close()');
        setIsSubmitting(false);
        dialog.close();
        return;
      }
      console.log('handleClose(dialog)');
      handleClose(dialog);
    },
    [isSubmitting],
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
        console.log('opening dialog: ', headerText);
        dialog.showModal();
      } else if (!visible && dialog.open) {
        console.log('closing dialog: ', headerText);
        // dialog.close()
      }

      return () => {
        dialog.removeEventListener('close', closeListener);
      };
    }
  }, [handleClose, visible, closeListener, headerText]);

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
    <Modal className={`bg-base-200 border border-[--modal-border]`} id={id} ref={ref} autofocus>
      <Modal.Header className={`text-2xl claim-title flex mb-5 ${headerText ? 'justify-between' : 'justify-end'}`}>
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
