import CourseCard from '../CourseCard';
import type { Course } from '../../types';

function CourseList({ courses }: { courses: Course[] }) {
  return (
    <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(var(--card-width),1fr))]">
      {courses.map((course) => {
        return <CourseCard key={course.id} course={course} />;
      })}
    </div>
  );
}

export default CourseList;
