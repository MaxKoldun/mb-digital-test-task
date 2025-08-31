import { memo } from 'react';
import { ToastContainer as ReactToastifyToastContainer } from 'react-toastify';

export const ToastContainer = memo((props) => {
  return (
    <ReactToastifyToastContainer
      position="bottom-center"
      hideProgressBar
      limit={1}
      newestOnTop
      closeOnClick
      draggable
      autoClose={2000}
      theme="colored"
      draggablePercent={20}
      {...props}
    />
  );
});

ToastContainer.displayName = 'ToastContainer';
