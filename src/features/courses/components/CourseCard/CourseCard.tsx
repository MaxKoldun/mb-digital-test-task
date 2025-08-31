import { type Course } from '@features/courses/types';
import { Price } from '@/components';
import { Typography } from '@/components';
import { PrimaryButton } from '@/components';

function CourseCard(props: { course: Course }) {
  const { course } = props;

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
          onClick={() => {
            console.log('click');
          }}
          className="mt-auto flex justify-center items-center gap-1 еуче"
        >
          <span>Purchase</span>
          <Typography variant="body1" className="m-0">
            <Price currency={course.currency} amount={course.price} />
          </Typography>
        </PrimaryButton>
      </div>
    </div>
  );
}

export default CourseCard;
