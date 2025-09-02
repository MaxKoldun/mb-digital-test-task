import { memo } from 'react';
import { type Course } from '@features/courses/types';
import { Price } from '@/components';
import { Typography } from '@/components';
import { PrimaryButton } from '@/components';
import { useShowModal, MODAL_TYPES } from '@/features/modals';

function CourseCardComponent(props: {
  course: Course;
  isLoading?: boolean;
  isPurchased?: boolean;
  progress?: number;
  onPurchase: (p: number) => void;
}) {
  const { course, onPurchase, isLoading, isPurchased, progress } = props;
  const showModal = useShowModal();

  function handlePurchase() {
    onPurchase(course.id);
  }

  function handleCourseClick() {
    const urlForModal = progress
      ? `${course.videoUrl}#t=${progress}`
      : course.videoUrl;

    showModal(MODAL_TYPES.VIDEO_MODAL, {
      courseId: course.id,
      videoUrl: urlForModal,
    });
  }

  return (
    <div className="h-full flex flex-col">
      <button
        className="h-full flex flex-col flex-grow bg-transparent border-none mb-auto pb-2"
        onClick={handleCourseClick}
      >
        <img
          src="/assets/preview-video.jpg"
          alt="preview-video"
          width={'100%'}
        />
        <div className="flex flex-col flex-grow">
          <Typography className="line-clamp-1 text-left" variant="title1">
            {course.title}
          </Typography>
          <Typography
            className="line-clamp-2 text-primary-500 text-left"
            variant="caption1"
          >
            {course.description}
          </Typography>
        </div>
      </button>
      <PrimaryButton
        onClick={handlePurchase}
        disabled={isPurchased}
        loading={isLoading}
        className="flex justify-center items-center gap-1"
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
  );
}

const CourseCard = memo(
  CourseCardComponent,
  (prev, next) =>
    prev.progress === next.progress &&
    prev.isLoading === next.isLoading &&
    prev.isPurchased === next.isPurchased &&
    prev.course === next.course
);

export default CourseCard;
