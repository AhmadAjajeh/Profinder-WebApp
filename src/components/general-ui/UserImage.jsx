import { AiOutlineUser } from 'react-icons/ai';

import { getBaseUrl } from '../../util/http';

export default function UserImage({ className, image, outlinePadding }) {
  return (
    <>
      {image && image !== '' ? (
        <img
          src={getBaseUrl() + image}
          className={className + ' rounded-full '}
        />
      ) : (
        <div
          className={
            className +
            ' rounded-full flex items-center justify-center bg-gray-300  text-white dark:bg-gray-700 ' +
            outlinePadding
          }
        >
          <AiOutlineUser className="w-full h-full" />
        </div>
      )}
    </>
  );
}
