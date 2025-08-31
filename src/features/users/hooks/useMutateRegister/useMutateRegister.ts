import { useState } from 'react';
import { ApiService } from '@/services';
import type { RegisterUser } from '../../type';

export function useMutateRegister(options = {}) {
  const { onSuccess = () => {}, onError = () => {} } = options;
  const [loading, setLoading] = useState(false);

  async function handleRegister(data: RegisterUser) {
    setLoading(true);

    const response = await ApiService.users.signup(data);

    console.log({ response });

    // if (response.error && response.error.code === ERROR_CODES.FORMAT_ERROR) {
    //     const fieldError = response.error.fields[0];

    //     onError({
    //         code: fieldError.type,
    //     });
    // }

    // if (response.error && response.error.code !== ERROR_CODES.FORMAT_ERROR) {
    //     onError(response.error);
    // }

    // if (!response.error) {
    //     onSuccess(response);
    // }

    setLoading(false);
  }

  return {
    data: {},
    isLoading: loading,
    mutateAsync: handleRegister,
    error: null,
  };
}
