import { memo } from 'react';
import { useState } from 'react';
import { type Course } from '@features/courses/types';
import { Price } from '@/components';
import { Typography } from '@/components';
import { PrimaryButton } from '@/components';
import { Modal } from '@/features/modals';

function CourseCardComponent(props: {
  course: Course;
  isLoading?: boolean;
  isPurchased?: boolean;
  onPurchase: (p: number) => void;
}) {
  const [openModal, setOpenModal] = useState(false);
  const { course, onPurchase, isLoading, isPurchased } = props;

  function handlePurchase() {
    onPurchase(course.id);
  }

  function handleCourseClick() {
    console.log('handleCourseClick');
    setOpenModal(true);
  }

  function handleCloseModal() {
    setOpenModal(false);
  }

  return (
    <>
      <Modal onClose={handleCloseModal} isOpen={openModal}>
        <video
          className="aspect-video"
          controls
          preload="metadata"
          width={'100%'}
          height="100%"
        >
          <source src={course.videoUrl} type="video/mp4" />
          Browser does not support the video
        </video>
      </Modal>
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
    </>
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
