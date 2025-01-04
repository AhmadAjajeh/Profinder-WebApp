import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import UserImage from '../general-ui/UserImage';
import {
  CompaniesIcon,
  HomeIcon,
  ProfileIcon,
  SavedIcon,
  SettingsIcon,
  WalletIcon,
} from '../general-ui/IconsSvg';

export default function UserImageButton() {
  const [showList, setShowList] = useState(false);

  function handleShowList() {
    setShowList((state) => !state);
  }

  return (
    <div className=" relative">
      {/* <!-- user image button --> */}
      <div className="flex relative">
        <button className="rounded-full text-white" onClick={handleShowList}>
          {/* user image */}
          <UserImage className="w-10 h-10 rounded-full" />
          {/* down arrow svg */}
          <div className="absolute bottom-0 flex items-center justify-center bg-slate-500 border border-white rounded-full w-4 h-4">
            <svg
              className="w-2 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              version="1.0"
              viewBox="0 0 512 512"
            >
              <path d="M17.1 107.2c-4.9.8-10.4 4.7-13.8 9.7-4 5.8-4.2 15.5-.4 21.7 1 1.6 55.1 61.4 120.3 132.9C215.7 373 242.6 402 245.8 403.4c5.3 2.4 15.1 2.4 20.4 0 3.1-1.4 30.3-30.6 123-132.4 65.4-71.8 119.6-131.7 120.4-133.2 2.1-4.1 2.8-10.8 1.4-15.6-1.3-5.1-6.6-11.3-11.6-13.7-5.2-2.4-13.5-2.1-18.6.7-3 1.6-36.6 37.8-114.1 122.8-60.4 66.3-110.2 120.5-110.7 120.5s-50.3-54.2-110.7-120.4C84.9 165.8 34 110.7 32.1 109.6c-4.4-2.5-9.6-3.4-15-2.4z" />
            </svg>
          </div>
        </button>
      </div>
      {/* attached navigation list  */}
      <AnimatePresence>
        {showList && (
          <motion.div
            variants={{
              hidden: { y: 16, opacity: 0.5 },
              visible: { y: 30, opacity: 1 },
            }}
            initial="hidden"
            animate="visible"
            exit="hidden"
            open
            className="absolute bg-white dark:bg-elementBlack border border-gray-300 dark:border-darkBorder shadow-lg rtl:-right-4 ltr:-left-4 md:rtl:-right-6 md:ltr:-left-6 lg:rtl:right-0 lg:ltr:left-0   flex flex-col space-y-3 p-4 rounded-md text-xs text-right text-black dark:text-white  w-40 font-light"
          >
            <NavigationButton
              textKey="home_page"
              Icon={<HomeIcon style={'w-6'} />}
              link="/home"
            />
            <NavigationButton
              textKey="profile"
              Icon={<ProfileIcon style={'w-6'} />}
              link="/profile"
            />
            <NavigationButton
              textKey="settings"
              Icon={<SettingsIcon style={'w-6'} />}
              link="/settings"
            />
            <NavigationButton
              textKey="saved_items"
              Icon={<SavedIcon style={'w-6'} />}
              link="/saved-items"
            />
            <NavigationButton
              textKey="companies"
              Icon={<CompaniesIcon style={'w-6'} />}
              link="/my-companies"
            />
            <NavigationButton
              textKey="wallet"
              Icon={<WalletIcon style={'w-6'} />}
              link="/my-wallet"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function NavigationButton({ Icon, textKey, link }) {
  const { t } = useTranslation();

  return (
    <NavLink
      to={link}
      className={({ isActive }) =>
        `flex flex-row space-x-3 rtl:space-x-reverse items-center font-light hover:text-logoOrange  ${
          isActive ? 'text-logoOrange' : ''
        }`
      }
    >
      {Icon}
      <div>{t(textKey)}</div>
    </NavLink>
  );
}
