import { type ReactNode } from 'react';
import NiceModal from '@ebay/nice-modal-react';

export function ModalsProvider({ children }: { children: ReactNode }) {
  return <NiceModal.Provider>{children}</NiceModal.Provider>;
}
