import i18next from 'i18next';
import { useTranslation } from 'react-i18next';

import DarkLightModeButton from './DarkLightModeButton';
import NotificationButton from './NotificationButton';
import UserImageButton from './UserImageButton';

import FullLogoImage from '../../assets/images/full-logo-image.png';
import FullLogoImageWhite from '../../assets/images/full-logo-image-white.png';
import FullLogoImageArabic from '../../assets/images/full-logo-image-arabic.png';
import FullLogoImageArabicWhite from '../../assets/images/full-logo-image-arabic-white.png';
import CompaniesSearch from './CompaniesSearch';

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
      <CompaniesSearch />

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
