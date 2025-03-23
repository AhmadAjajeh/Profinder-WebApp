import { useState } from 'react';
import EditButton from '../../../components/general-ui/EditButton';
import { UpdateImageModel } from './UpdateImageModal';
import { AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaPen, FaUser } from 'react-icons/fa';
import { getBaseUrl } from '../../../util/http';
import UserInfoModal from './UserInforModal';

export default function UserInfo({
  myProfile,
  backgroundImage,
  profileImage,
  username,
  email,
  bio,
  fullname,
}) {
  const [modal, setModal] = useState('');

  function handleCloseModal() {
    setModal('');
  }

  const modals = (
    <AnimatePresence>
      {modal === 'background-image' && (
        <UpdateImageModel
          image={backgroundImage}
          handleClose={handleCloseModal}
          label="edit_background_image"
          imageField={'background_image'}
        />
      )}
      {modal === 'profile-image' && (
        <UpdateImageModel
          image={profileImage}
          handleClose={handleCloseModal}
          label="edit_profile_image"
          imageField="profile_image"
        />
      )}

      {modal === 'user-info' && (
        <UserInfoModal
          handleClose={handleCloseModal}
          fullname={fullname}
          bio={bio}
        />
      )}
    </AnimatePresence>
  );

  if (!username) return <UserInfoShimmer />;

  return (
    <div className="w-full  mx-auto relative">
      {/* modals */}
      {modals}

      {/* Upper part - Background Image */}
      <div
        className="relative h-64 w-full bg-cover bg-center bg-no-repeat bg-gray-300 dark:bg-elementGray flex items-center justify-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        {myProfile && (
          <EditButton
            text="edit_background_image"
            className="absolute top-1 ltr:left-1 rtl:right-1"
            handleClick={() => setModal('background-image')}
          />
        )}
      </div>

      {/* Profile Image */}
      <div className="absolute transform -translate-y-24 md:-translate-y-16 left-1/2 md:left-auto  md:rtl:right-8 md:ltr:left-8 md:translate-x-0 -translate-x-1/2">
        {profileImage && (
          <img
            src={getBaseUrl() + profileImage}
            alt={username}
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
          />
        )}

        {!profileImage && (
          <div className="relative overflow-hidden w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-500 border-white dark:border-darkBorder flex items-center justify-center">
            <FaUser className="absolute top-8 w-24 h-24 text-gray-400 dark:text-gray-100" />
          </div>
        )}

        {myProfile && (
          <button
            onClick={() => setModal('profile-image')}
            className="absolute bg-gray-700 p-1 rounded-full  top-24 rtl:right-3 ltr:left-3 border border-gray-500"
          >
            <FaPen className="w-3 h-3 text-gray-300" />
          </button>
        )}
      </div>

      {/* Lower part - Content */}
      <div className="flex space-x-1 rtl:space-x-reverse bg-white dark:bg-elementBlack rounded-b-lg shadow-md">
        <div className=" bg-logoOrange min-h-full min-w-28 hidden md:flex  md:rtl:mr-[40px] md:ltr:ml-[40px]" />

        {myProfile && (
          <EditButton
            handleClick={() => setModal('user-info')}
            className="absolute w-[100px] sm:w-auto bottom-2 rtl:left-2 ltr:right-2"
            text="edit_profile"
          />
        )}

        <div className="mx-4 max-w-3xl md:ltr:ml-40 md:rtl:mr-40 px-6 pt-16 md:pt-8 pb-4 ">
          {/* User Info */}
          <div className="text-xl font-semibold text-gray-900 dark:text-white ">
            {fullname || username}
          </div>
          {/* Bio */}
          {bio && (
            <p className="text-gray-700 dark:text-gray-300 max-w-xl md:text-[12px] lg:text-[14px] mb-1">
              {bio}
            </p>
          )}

          <div className="gap-1 flex items-center mb-1">
            <FaEnvelope className="text-gray-600 dark:text-gray-300" />
            <p className="text-gray-600 dark:text-gray-200 text-sm">{email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function UserInfoShimmer() {
  return (
    <div className="w-full mx-auto relative">
      {/* Background Image Shimmer */}
      <div className="relative h-64 w-full bg-gray-200 dark:bg-elementGray animate-pulse" />

      {/* Profile Image Shimmer */}
      <div className="absolute transform -translate-y-24 md:-translate-y-16 left-1/2 md:left-auto md:rtl:right-8 md:ltr:left-8 md:translate-x-0 -translate-x-1/2">
        <div className="w-32 h-32 rounded-full bg-gray-300 dark:bg-gray-600 animate-pulse" />
      </div>

      {/* Content Shimmer */}
      <div className="flex space-x-1 rtl:space-x-reverse bg-white dark:bg-elementBlack rounded-b-lg shadow-md">
        <div className="bg-logoOrange min-h-full min-w-28 hidden md:flex md:rtl:mr-[40px] md:ltr:ml-[40px]" />

        <div className="mx-4 max-w-3xl md:ltr:ml-40 md:rtl:mr-40 px-6 pt-16 md:pt-8 pb-4">
          {/* Name Shimmer */}
          <div className="h-7 w-48 bg-gray-300 dark:bg-gray-600 rounded animate-pulse mb-3" />

          {/* Bio Shimmer */}
          <div className="space-y-2 mb-3">
            <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          </div>

          {/* Email Shimmer */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-5 h-5 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
            <div className="h-4 w-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
