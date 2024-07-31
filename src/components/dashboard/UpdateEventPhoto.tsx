import { useState } from 'react';
import { toast } from 'react-toastify';

type UpdateEventPhotoProps = {
  id?: string;
  curImageUrl?: string;
  token?: string;
};

const UpdateEventPhoto = ({
  id,
  curImageUrl,
  token,
}: UpdateEventPhotoProps) => {
  const [imageUrl, setImageUrl] = useState(curImageUrl);
  const [loading, setLoading] = useState(false);

  const updatePhotoHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const file = (e.target as HTMLFormElement).fileUpload.files[0];
    const formData = new FormData();
    formData.append('image', file);
    try {
      const res = await fetch(
        `${import.meta.env.PUBLIC_API_URL}/events/photo/${id}`,
        {
          method: 'PATCH',
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();

      if (data.image_secure_url) {
        setImageUrl(data.image_secure_url);
        toast.success('Photo updated successfully');
      } else {
        toast.error('Failed to update photo');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      //   clear the input field
      (e.target as HTMLFormElement).reset();
    }
  };
  return (
    <div className="border-b border-gray-900/10 pb-12">
      {/* <h3>Update Event Photo</h3> */}
      <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12">
        <div className="sm:col-span-3 rounded-full">
          <img
            src={imageUrl}
            alt="Current Event Photo"
            className="w-full h-40 object-contain rounded-lg"
          />
        </div>
        <div className="sm:col-span-6">
          <form encType="multipart/form-data" onSubmit={updatePhotoHandler}>
            <div className="col-span-full">
              {/* <label
                htmlFor="event-photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Update Event photo
              </label> */}
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <input
                        id="fileUpload"
                        name="file-upload"
                        type="file"
                        accept=".jpg,.jpeg,.png"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="rounded-md mt-2 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {loading ? 'Updating...' : 'Update Photo'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateEventPhoto;
