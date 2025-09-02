import type { FC } from 'react';
import NiceModal from '@ebay/nice-modal-react';
import { VideoModal } from '../../components/VideoModal';
import { MODAL_TYPES } from '../../constants/MODAL_TYPES';

interface ModalConfig {
  id: string;
  component: FC<any>;
}

class ModalManagementService {
  init() {
    const modals: ModalConfig[] = [
      { id: MODAL_TYPES.VIDEO_MODAL, component: VideoModal },
    ];

    modals.forEach((modal) => {
      this.registerModal(modal.id, modal.component);
    });
  }

  registerModal(modalId: string, ModalComponent: FC<any>) {
    NiceModal.register(modalId, ModalComponent);
  }
}

export default new ModalManagementService();
