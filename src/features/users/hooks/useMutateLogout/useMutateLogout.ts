import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ApiService } from '@/services';
import { userActions } from '@/features/users/store';

export function useMutateLogout() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  async function handleLogout() {
    setLoading(true);

    await ApiService.users.logout();

    dispatch(userActions.clearUser());

    setLoading(false);
  }

  return {
    data: {},
    isLoading: loading,
    mutateAsync: handleLogout,
    error: null,
  };
}
