// Я використав тут асинхронний редюсер, просто, щоб показати, що я вмію з ними працювати, зазвичай, я використовую підхід з хуками, як в login i register сторінках
import apiService from '@/services/ApiService/ApiService';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const buyCourse = createAsyncThunk<
  { id: number },
  number,
  { rejectValue: { error: { message: string } } }
>('user/buyCourse', async (courseId: number, { rejectWithValue }) => {
  const response = await apiService.users.buyCourse(courseId);

  if (response.error) {
    return rejectWithValue({ error: { message: response.error.message } });
  }

  return response.data;
});
