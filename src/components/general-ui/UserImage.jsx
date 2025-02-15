import { useSelector } from 'react-redux';
import { AiOutlineUser } from 'react-icons/ai';

import { getBaseUrl } from '../../util/http';

export default function UserImage({ className, image }) {
  const user = useSelector((state) => state.auth.user);

  return (
    <>
      {image && image !== '' ? (
        <img src={getBaseUrl() + image} className={'w-12 h-12 rounded-full '} />
      ) : (
        <div
          className={
            ' rounded-full flex items-center justify-center bg-gray-300  text-white dark:bg-gray-700  ' +
            className
          }
        >
          <AiOutlineUser className="w-9 h-9" />
        </div>
      )}
    </>
  );
}
