import { useState } from 'react';
import { useStore } from '@nanostores/react';
import { toast } from 'react-toastify';
import Modal from './Modal';
import { isDeleteModalOpen, deleteUrl } from '../../store';

type DeletModalProps = {
  token: string;
};

const DeleteModal = ({ token }: DeletModalProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const $deleteUrl = useStore(deleteUrl);

  const deleteEventHandler = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch($deleteUrl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        isDeleteModalOpen.set(false);
        window.location.reload();
      }
    } catch (error) {
      toast.error('Something went wrong... Try again');
    } finally {
      setIsDeleting(false);
    }
  };

  const closeModalHandler = () => {
    isDeleteModalOpen.set(false);
  };
  return (
    <>
      <Modal>
        <div className="w-full flex justify-center text-red-400 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="30"
            height="30"
            viewBox="0 0 128 128"
            fill="#FA5252"
          >
            <path d="M 49 1 C 47.34 1 46 2.34 46 4 C 46 5.66 47.34 7 49 7 L 79 7 C 80.66 7 82 5.66 82 4 C 82 2.34 80.66 1 79 1 L 49 1 z M 24 15 C 16.83 15 11 20.83 11 28 C 11 35.17 16.83 41 24 41 L 101 41 L 101 104 C 101 113.37 93.37 121 84 121 L 44 121 C 34.63 121 27 113.37 27 104 L 27 52 C 27 50.34 25.66 49 24 49 C 22.34 49 21 50.34 21 52 L 21 104 C 21 116.68 31.32 127 44 127 L 84 127 C 96.68 127 107 116.68 107 104 L 107 40.640625 C 112.72 39.280625 117 34.14 117 28 C 117 20.83 111.17 15 104 15 L 24 15 z M 24 21 L 104 21 C 107.86 21 111 24.14 111 28 C 111 31.86 107.86 35 104 35 L 24 35 C 20.14 35 17 31.86 17 28 C 17 24.14 20.14 21 24 21 z M 50 55 C 48.34 55 47 56.34 47 58 L 47 104 C 47 105.66 48.34 107 50 107 C 51.66 107 53 105.66 53 104 L 53 58 C 53 56.34 51.66 55 50 55 z M 78 55 C 76.34 55 75 56.34 75 58 L 75 104 C 75 105.66 76.34 107 78 107 C 79.66 107 81 105.66 81 104 L 81 58 C 81 56.34 79.66 55 78 55 z"></path>
          </svg>
        </div>
        <h1 className="text-center text-gray-800 dark:text-gray-100 font-lg font-bold tracking-normal leading-tight mb-4">
          Confirm deletion
        </h1>
        <p className="mb-5 text-sm text-gray-600 dark:text-gray-400 text-center font-normal">
          Are you sure you want to delete this record? This action cannot be
          undone.
        </p>
        <div className="flex items-center justify-center w-full">
          <button
            onClick={deleteEventHandler}
            className="focus:outline-none transition duration-150 ease-in-out hover:bg-red-400 bg-red-500 rounded text-white px-4 sm:px-8 py-2 text-xs sm:text-sm"
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
          <button
            onClick={closeModalHandler}
            className="focus:outline-none ml-3 bg-gray-100 dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-600 transition duration-150 text-gray-600 dark:text-gray-400 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </>
  );
};

export default DeleteModal;
