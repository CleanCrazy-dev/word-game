import React from 'react';
import { ToastContainer } from 'react-toastify';
import ToastWrapper from './styles';

const Toast = () => {
    return (
        <ToastWrapper>
          <ToastContainer
            position="bottom-center"
            autoClose={false}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            draggable
            pauseOnHover
          />
        </ToastWrapper>
      );
}
export default Toast;
