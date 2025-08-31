// Такі обгортки у вигляді хуків потрібно, щоб ізолювати логіку фетча даних, також тут можу розміщуватись бібліотека для кешування, наприлкад useSWR чи react-query
import { useEffect, useState } from 'react';
import { ApiService } from '@/services';
import type { Course } from '../../types';

export function useGetCourses() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Course[]>();
  const [error, setError] = useState();

  async function fetchCourses() {
    setLoading(true);
    const response = await ApiService.courses.list();

    if (!response.error) {
      setData(response.data);
    } else {
      setError(response.error);
    }

    setLoading(false);
  }

  useEffect(() => {
    fetchCourses();
  }, []);

  return {
    data: data,
    isLoading: loading,
    refetch: fetchCourses,
    error: error,
  };
}
