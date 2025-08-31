import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { type AppDispatch } from '@/store';
import CourseList from '@/features/courses/components/CourseList';
import { Typography } from '@/components';
import { useGetCourses } from '@/features/courses';
import { Loader } from '@/components';
import { SecondaryButton } from '@/components';
import { useMutateLogout } from '@/features/users';
import { ROUTES } from '@/constants/routes';
import { buyCourse } from '@/features/users/store/asyncActions';

function CoursesPage() {
  const navigate = useNavigate();
  const { mutateAsync, isLoading: logoutLoading } = useMutateLogout({
    onSuccess: handleLogoutSuccess,
  });
  const dispatch = useDispatch<AppDispatch>();
  const { data, isLoading } = useGetCourses();

  function handleLogoutSuccess() {
    navigate(ROUTES.login);
  }

  async function handleLogout() {
    await mutateAsync();
  }

  function handlePurchase(courseId: number) {
    dispatch(buyCourse(courseId));
  }

  return (
    <div className="mx-2 p-4">
      <div className="w-full mb-4 flex justify-between items-center">
        <Typography className="m-0" variant="heading1">
          Available courses
        </Typography>
        <SecondaryButton loading={logoutLoading} onClick={handleLogout}>
          Log out
        </SecondaryButton>
      </div>
      {isLoading || !data ? (
        <div className="w-full flex justify-center items-center min-h-[500px]">
          <Loader />
        </div>
      ) : (
        <CourseList courses={data} onPurchase={handlePurchase} />
      )}
    </div>
  );
}

export default CoursesPage;
