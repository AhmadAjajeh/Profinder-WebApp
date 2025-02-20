import { useSelector } from 'react-redux';
import { AiOutlineUser } from 'react-icons/ai';

import { getBaseUrl } from '../../util/http';

export default function UserImage({ className, image }) {
  return (
    <>
      {image && image !== '' ? (
        <img
          src={getBaseUrl() + image}
          className={className + ' p-0 rounded-full'}
        />
      ) : (
        <div
          className={
            className +
            ' rounded-full flex items-center justify-center bg-gray-300  text-white dark:bg-gray-700 p-1 '
          }
        >
          <AiOutlineUser className="w-full h-full" />
        </div>
      )}
    </>
  );
}
