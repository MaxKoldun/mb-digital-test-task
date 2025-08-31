import { memo } from 'react';
import { type Course } from '@features/courses/types';
import { Price } from '@/components';
import { Typography } from '@/components';
import { PrimaryButton } from '@/components';

function CourseCardComponent(props: {
  course: Course;
  isLoading?: boolean;
  isPurchased?: boolean;
  onPurchase: (p: number) => void;
}) {
  const { course, onPurchase, isLoading, isPurchased } = props;

  function handlePurchase() {
    onPurchase(course.id);
  }

  return (
    <div className="h-full flex flex-col">
      <img src="/assets/preview-video.jpg" alt="preview-video" width={'100%'} />
      <div className="flex flex-col flex-grow">
        <Typography className="line-clamp-1" variant="title1">
          {course.title}
        </Typography>
        <Typography
          className="line-clamp-2 text-primary-500"
          variant="caption1"
        >
          {course.description}
        </Typography>
        <PrimaryButton
          onClick={handlePurchase}
          disabled={isPurchased}
          loading={isLoading}
          className="mt-auto flex justify-center items-center gap-1"
        >
          {isPurchased ? (
            <span>Purchased</span>
          ) : (
            <>
              <span>Purchase</span>
              <Typography variant="body1" className="m-0">
                <Price currency={course.currency} amount={course.price} />
              </Typography>
            </>
          )}
        </PrimaryButton>
      </div>
    </div>
  );
}

const CourseCard = memo(
  CourseCardComponent,
  (prev, next) =>
    prev.isLoading === next.isLoading &&
    prev.isPurchased === next.isPurchased &&
    prev.course === next.course
);

export default CourseCard;
