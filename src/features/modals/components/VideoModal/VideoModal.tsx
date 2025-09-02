import { useDispatch } from 'react-redux';
import { useEffect, useRef } from 'react';
import { type AppDispatch } from '@/store';
import { Modal } from '@features/modals/components';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { SecondaryButton } from '@/components';
import { saveCourseProgress } from '@/features/users/store/asyncActions';

const SAVE_INTRVAL = 5000;

export default NiceModal.create(
  ({ videoUrl, courseId }: { courseId: number; videoUrl: string }) => {
    const dispatch = useDispatch<AppDispatch>();
    const modal = useModal();
    const videoRef = useRef<HTMLVideoElement | null>(null);

    function saveProgress(newProgress: number) {
      dispatch(
        saveCourseProgress({
          courseId,
          progress: newProgress,
        })
      );
    }

    useEffect(() => {
      const intervalId = setInterval(() => {
        if (!videoRef.current) return;

        saveProgress(videoRef.current.currentTime);
      }, SAVE_INTRVAL);

      return () => {
        clearInterval(intervalId);
      };
    }, []);

    function handleClose() {
      modal.hide();
    }

    function handleAfterClose() {
      modal.remove();
    }

    return (
      <>
        <Modal
          isOpen={modal.visible}
          onClose={handleClose}
          onAfterClose={handleAfterClose}
          className="overflow-visible"
        >
          <SecondaryButton
            className="!min-w-[1rem] !min-h-[1rem] w-[1.5rem] h-[1.5rem] !p-0 absolute right-[-0.5rem] top-[-0.5rem]"
            onClick={handleClose}
          >
            X
          </SecondaryButton>
          <div className="pt-2">
            <video
              ref={videoRef}
              className="aspect-video"
              controls
              preload="metadata"
              width={'100%'}
              height="100%"
            >
              <source src={videoUrl} type="video/mp4" />
              Browser does not support the video
            </video>
          </div>
        </Modal>
      </>
    );
  }
);
