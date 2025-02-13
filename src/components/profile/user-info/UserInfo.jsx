import { useState } from 'react';
import EditButton from '../../../components/general-ui/EditButton';
import { UpdateImageModel } from './UpdateImageModal';
import { AnimatePresence } from 'framer-motion';
import { FaEnvelope } from 'react-icons/fa';

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
  const [backgroundModal, setBackgroundModal] = useState(false);

  const modals = (
    <AnimatePresence>
      {backgroundModal && (
        <UpdateImageModel
          image={backgroundImage}
          handleClose={() => setBackgroundModal(false)}
          label="edit_background_image"
          imageField={'background_image'}
        />
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
            handleClick={() => setBackgroundModal(true)}
          />
        )}
      </div>

      {/* Profile Image */}
      <div className="absolute transform -translate-y-24 md:-translate-y-16 left-1/2 md:left-auto md:rtl:right-8 md:ltr:left-8 md:translate-x-0 -translate-x-1/2">
        <img
          src={profileImage}
          alt={username}
          className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
        />
      </div>

      {/* Lower part - Content */}
      <div className="flex space-x-1 rtl:space-x-reverse bg-white dark:bg-elementBlack rounded-b-lg shadow-md">
        <div className=" bg-logoOrange min-h-full min-w-28 hidden md:flex  md:rtl:mr-[40px] md:ltr:ml-[40px]" />

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
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-gray-900 flex items-center gap-1 text-[14px]"
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
