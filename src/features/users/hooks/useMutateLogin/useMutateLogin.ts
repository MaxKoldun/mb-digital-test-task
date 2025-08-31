import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ApiService } from '@/services';
import { userActions } from '@/features/users/store';
import { useShowToast, TOAST_TYPES } from '@/features/toasts';
import type { LoginFormData } from '../../type';

export function useMutateLogin(options: { onSuccess: () => void }) {
  const showToast = useShowToast();
  const { onSuccess } = options;
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  async function handleLogin(data: LoginFormData) {
    setLoading(true);

    const response = await ApiService.users.login(data);

    if (response.error) {
      showToast(TOAST_TYPES.ERROR, { title: response.error.message });
    }

    if (response.data) {
      dispatch(userActions.setUser(response.data));
      onSuccess();
    }

    setLoading(false);
  }

  return {
    data: {},
    isLoading: loading,
    mutateAsync: handleLogin,
    error: null,
  };
}
