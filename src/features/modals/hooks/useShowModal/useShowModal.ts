import NiceModal from '@ebay/nice-modal-react';
import { useCallback } from 'react';

export function useShowModal() {
  const showModal = useCallback((modalType: string, modalProps: any) => {
    return NiceModal.show(modalType, modalProps);
  }, []);

  return showModal;
}
