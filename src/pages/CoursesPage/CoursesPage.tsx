import CourseList from '@/features/courses/components/CourseList';
import { Typography } from '@/components';
import { useGetCourses } from '@/features/courses';

function CoursesPage() {
  const { data, isLoading } = useGetCourses();

  return (
    <div className="mx-2 pb-2">
      <Typography variant="heading1">Available courses</Typography>
      {isLoading || !data ? 'Loading' : <CourseList courses={data} />}
    </div>
  );
}

export default CoursesPage;
