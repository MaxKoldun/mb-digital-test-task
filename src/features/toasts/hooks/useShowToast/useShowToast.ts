import { useCallback } from 'react';
import { showToast } from '../../lib';

export function useShowToast() {
  return useCallback(showToast, []);
}
