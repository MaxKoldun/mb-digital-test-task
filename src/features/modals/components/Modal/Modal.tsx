import { type ReactNode } from 'react';
import ReactModal, { type Props as ReactModalProps } from 'react-modal';
import cx from 'classnames';
import styles from './styles.module.css';

ReactModal.setAppElement('#react-modals');

type ModalProps = {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  overlayClassName?: string;
  overlayClassNameAfterOpen?: string;
  overlayClassNameBeforeClose?: string;
  className?: string;
  classNameAfterOpen?: string;
  classNameBeforeClose?: string;
} & Omit<
  ReactModalProps,
  'isOpen' | 'onRequestClose' | 'className' | 'overlayClassName'
>;

export function Modal({
  children,
  onClose,
  isOpen,
  overlayClassName,
  overlayClassNameAfterOpen,
  overlayClassNameBeforeClose,
  className,
  classNameAfterOpen,
  classNameBeforeClose,
  ...rest
}: ModalProps) {
  return (
    <ReactModal
      isOpen={isOpen}
      shouldCloseOnOverlayClick
      onRequestClose={onClose}
      closeTimeoutMS={200}
      overlayClassName={{
        base: cx(
          'fixed inset-0 z-[9999] flex h-full w-full items-center justify-center',
          styles.OverlayTransition,
          overlayClassName
        ),
        afterOpen: cx(
          styles['OverlayTransition--after-open'],
          overlayClassNameAfterOpen
        ),
        beforeClose: cx(
          styles['OverlayTransition--before-close'],
          overlayClassNameBeforeClose
        ),
      }}
      className={{
        base: cx(
          'mx-4 max-h-[65vh] max-w-[var(--modal-max-width-lg)] overflow-auto rounded-sm bg-grey-0 p-4.5 shadow-modal outline-none',
          styles.ModalTransition,
          className
        ),
        afterOpen: cx(
          styles['ModalTransition--after-open'],
          classNameAfterOpen
        ),
        beforeClose: cx(
          styles['ModalTransition--before-close'],
          classNameBeforeClose
        ),
      }}
      {...rest}
    >
      {children}
    </ReactModal>
  );
}
