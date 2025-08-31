import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../type';
import { buyCourse } from './asyncActions';
import type { RootState } from '@/store';
import { showToast, TOAST_TYPES } from '@/features/toasts';

const initialState: User | null = null;

export const activeUserSlice = createSlice({
  name: 'user',
  initialState: initialState as User | null,
  reducers: {
    setUser: (_state, action: PayloadAction<User>) => action.payload,
    clearUser: () => null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(buyCourse.pending, (state, action) => {
        const courseId = action.meta.arg;
        if (!state) return;

        const prevCourse = state.courses[courseId] ?? { id: courseId };

        state.courses[courseId] = {
          ...prevCourse,
          purchased: false,
          isLoading: true,
        };
      })
      .addCase(buyCourse.fulfilled, (state, action) => {
        const courseId = action.payload.id;
        if (!state) return;

        const prevCourse = state.courses[courseId] ?? { id: courseId };

        state.courses[courseId] = {
          ...prevCourse,
          isLoading: false,
          purchased: true,
        };
      })
      .addCase(buyCourse.rejected, (state, action) => {
        const courseId = action.meta.arg;
        if (!state) return;

        const prevCourse = state.courses[courseId] ?? { id: courseId };

        if (action.payload) {
          showToast(TOAST_TYPES.ERROR, {
            title: action.payload.error.message,
          });
        }

        state.courses[courseId] = {
          ...prevCourse,
          purchased: false,
          isLoading: false,
        };
      });
  },
});

export const userSelectors = {
  userCourses: (state: RootState) => (state.user ? state.user.courses : {}), // повертаємо порожній об'єкт, якщо null
};

const userActions = activeUserSlice.actions;
export { userActions };
export default activeUserSlice.reducer;
