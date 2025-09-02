export type RegisterFormUser = {
  email: string;
  password: string;
};

export type LoginFormData = RegisterFormUser;

export type UserCourse = {
  id: string | number;
  progress?: number;
  purchased?: boolean;
  isLoading?: boolean;
};

export type User = RegisterFormUser & {
  id: string;
  courses: Record<string | number, UserCourse>;
};
