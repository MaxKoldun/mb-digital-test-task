import { toast } from 'react-toastify';
import { TOAST_TYPES } from '../constants';

const mapToastTypeToFn = {
  [TOAST_TYPES.SUCCESS]: toast.success,
  [TOAST_TYPES.ERROR]: toast.error,
  [TOAST_TYPES.WARNING]: toast.warning,
};

export function showToast(toastType: string, toastProps: { title: string }) {
  const fn = mapToastTypeToFn[toastType] || toast;

  return fn(toastProps.title);
}
