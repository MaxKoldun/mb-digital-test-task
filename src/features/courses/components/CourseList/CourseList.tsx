import CourseCard from '../CourseCard';
import { useSelector } from 'react-redux';

import { userSelectors } from '@/features/users/store';
import type { Course } from '../../types';

function CourseList({
  courses,
  onPurchase,
}: {
  courses: Course[];
  onPurchase: (p: number) => void;
}) {
  const userCourses = useSelector(userSelectors.userCourses);

  return (
    <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(var(--card-width),1fr))]">
      {courses.map((course) => {
        const courseState = userCourses[course.id]; // мемоізований для одного курсу

        return (
          <CourseCard
            key={course.id}
            course={course}
            isLoading={courseState?.isLoading}
            isPurchased={courseState?.purchased}
            onPurchase={onPurchase}
          />
        );
      })}
    </div>
  );
}

export default CourseList;
