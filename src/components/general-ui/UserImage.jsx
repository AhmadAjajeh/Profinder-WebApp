import { useSelector } from 'react-redux';
import { AiOutlineUser } from 'react-icons/ai';

import { getBaseUrl } from '../../util/http';

export default function UserImage({ className }) {
  const user = useSelector((state) => state.auth.user);

  if (!user.profile_image || user.profile_image === '')
    return (
      <div
        className={
          className +
          ' rounded-full flex items-center justify-center bg-gray-300 p-1 text-white dark:bg-gray-700'
        }
      >
        <AiOutlineUser className="w-10 h-10" />
      </div>
    );

  return <img src={getBaseUrl() + user.profile_image} className={className} />;
}
