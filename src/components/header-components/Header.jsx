import i18next from 'i18next';
import { useTranslation } from 'react-i18next';

import DarkLightModeButton from './DarkLightModeButton';
import NotificationButton from './NotificationButton';
import UserImageButton from './UserImageButton';

import FullLogoImage from '../../assets/images/full-logo-image.png';
import FullLogoImageWhite from '../../assets/images/full-logo-image-white.png';
import FullLogoImageArabic from '../../assets/images/full-logo-image-arabic.png';
import FullLogoImageArabicWhite from '../../assets/images/full-logo-image-arabic-white.png';

export default function Header() {
  const { t } = useTranslation();

  return (
    <div className=" flex flex-row-reverse items-center justify-between w-full  p-3 px-6 lg:px-10 xl:px-16  dark:text-slate-300 h-16">
      {/* <!-- user image and notification and light/dark mode--> */}
      <div className="flex items-center w-full md:w-fit">
        <ul className="flex flex-row w-full items-center justify-between md:justify-normal  md:space-x-5 rtl:space-x-reverse">
          <li>
            <UserImageButton />
          </li>
          <li>
            <ul className="flex flex-row space-x-5 rtl:space-x-reverse">
              <li>
                <NotificationButton />
              </li>
              <li>
                <DarkLightModeButton />
              </li>
            </ul>
          </li>
        </ul>
      </div>

      {/* search for companies bar */}
      <div>
        <form>
          <div className="hidden group relative md:flex space-x-2 rtl:space-x-reverse items-center border focus-within:border-2 border-gray-300 dark:border-darkBorder rounded-md px-2 py-2 shadow-sm">
            <div>
              <svg
                className="w-4 h-4 text-gray-500 dark:text-slate-200 font-light"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <div>
              <input
                type="search"
                className="text-sm  dark:bg-elementBlack  placeholder:text-slate-500 dark:placeholder:text-slate-200 dark:bg-customGray focus:outline-none placeholder:text-xs w-72 font-light transition-colors duration-300"
                placeholder={t('search_for_companies')}
              />
            </div>
          </div>
        </form>
      </div>

      {/* logo */}
      <div className="hidden md:flex items-center">
        {/* <SmallLogoImage style="w-10 h-10 rtl:scale-x-[-1]" /> */}
        {i18next.dir() === 'ltr' ? (
          <>
            <img className="w-40 hidden dark:inline" src={FullLogoImageWhite} />
            <img className="w-40 dark:hidden" src={FullLogoImage} />
          </>
        ) : (
          <div className="font-extrabold text-2xl tracking-wider">
            <img
              className="w-40 hidden dark:inline"
              src={FullLogoImageArabicWhite}
            />
            <img className="w-40 dark:hidden" src={FullLogoImageArabic} />
          </div>
        )}
      </div>
    </div>
  );
}
