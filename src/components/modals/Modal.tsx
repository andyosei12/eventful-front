import { useState } from 'react';
import { useStore } from '@nanostores/react';
import { isDeleteModalOpen, event } from '../../store';
import { toast } from 'react-toastify';

const Modal = ({ children }: { children: React.ReactNode }) => {
  const closeModalHandler = () => {
    isDeleteModalOpen.set(false);
  };

  return (
    <div
      className="py-12 fixed inset-0 bg-gray-500 bg-opacity-75 transition duration-150 ease-in-out z-40  top-0 right-0 bottom-0 left-0 overflow-hidden"
      id="modal"
      onClick={closeModalHandler}
    >
      <div role="alert" className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
        <div className="relative py-8 px-8 md:px-16 bg-white dark:bg-gray-800 dark:border-gray-700 shadow-md rounded border border-gray-400">
          {children}

          <div
            className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-500 transition duration-150 ease-in-out"
            onClick={closeModalHandler}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Close"
              className="icon icon-tabler icon-tabler-x"
              width={20}
              height={20}
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <line x1={18} y1={6} x2={6} y2={18} />
              <line x1={6} y1={6} x2={18} y2={18} />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;
