import { useState } from 'react';
import EditButton from '../../../components/general-ui/EditButton';
import { UpdateImageModel } from './UpdateImageModal';
import { AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaPen, FaGithub, FaLinkedin, FaGit } from 'react-icons/fa';
import { getBaseUrl } from '../../../util/http';
import UserInfoModal from './UserInforModal';

export default function UserInfo({
  myProfile,
  backgroundImage,
  profileImage,
  username,
  email,
  bio,
  address,
  github,
  linkedin,
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
        <UserInfoModal handleClose={handleCloseModal} />
      )}
    </AnimatePresence>
  );

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
      <div className="absolute transform -translate-y-24 md:-translate-y-16 left-1/2 md:left-auto md:rtl:right-8 md:ltr:left-8 md:translate-x-0 -translate-x-1/2">
        <img
          src={getBaseUrl() + profileImage}
          alt={username}
          className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
        />
        {myProfile && (
          <button
            onClick={() => setModal('profile-image')}
            className="absolute bg-gray-300 p-1 rounded-full  top-24 rtl:right-3 ltr:left-3 border border-gray-500"
          >
            <FaPen className="w-3 h-3 text-gray-700" />
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

          {/* Address */}
          {address && (
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-1">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="text-sm">{address}</span>
            </div>
          )}

          {/* Social Links */}
          <div className="flex gap-4">
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-[14px]"
            >
              <FaLinkedin className="w-5 h-5" />
              LinkedIn
            </a>
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white flex items-center gap-1  text-[14px]"
            >
              <FaGithub className="w-5 h-5" />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
