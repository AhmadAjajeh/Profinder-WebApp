import { useTranslation } from 'react-i18next';

import UserImage from './UserImage';
import { NavLink } from 'react-router-dom';
import {
  CompaniesIcon,
  CopyIcon,
  HomeIcon,
  LogoutIcon,
  ProfileIcon,
  SavedIcon,
  SettingsIcon,
  WalletIcon,
} from './IconsSvg';
import { useSelector } from 'react-redux';

export default function SideNavigation() {
  const user = useSelector((state) => state.auth.user);
  const { t } = useTranslation();

  return (
    <div class="flex flex-col bg-white  dark:bg-elementBlack transition-all duration-300  rounded-md  p-3 border border-gray-300 dark:border-darkBorder h-fit w-full  ">
      {/* <!-- user identity --> */}
      <div class="flex flex-row items-center jusitfy-center space-x-2 rtl:space-x-reverse mb-6">
        <div className="mb-2 min-w-12">
          <UserImage
            image={user.profile_image}
            className="w-12 h-12"
            outlinePadding="p-2"
          />
        </div>
        <div>
          <div class="text-sm font-semibold dark:text-white">
            {user?.username}
          </div>
          <div class="text-[10px] text-gray-500 dark:text-slate-300 font-light">
            {user?.email}
          </div>
        </div>
      </div>

      {/* <!-- side bar navigation --> */}
      <div class="flex  flex-col space-y-5 text-[13px] ltr:tracking-wide text-right">
        <SideNavElement
          icon={<HomeIcon style="w-6 fill-current" />}
          text="home_page"
          path="/home"
        />
        <SideNavElement
          icon={<ProfileIcon style="w-5 fill-current" />}
          text="profile"
          path={`/profile/${user._id}`}
        />
        <SideNavElement
          icon={<CompaniesIcon style="w-[24px] fill-current" />}
          text="companies"
          path="/companies"
        />
        <SideNavElement
          icon={<WalletIcon style="w-5 fill-current" />}
          text="wallet"
          path="/wallet"
        />
        <div className="h-[1px] bg-gray-300 dark:bg-darkBorder "></div>
        <SideNavElement
          icon={<SettingsIcon style="w-5 fill-current" />}
          text="settings"
          path="/settings"
        />
        <SideNavElement
          icon={<SavedIcon style="w-5 fill-current" />}
          text="saved_items"
          path="/saved-items"
        />
        <NavLink
          to="/auth/login"
          className="grid grid-cols-5 gap-2 items-center text-red-600"
        >
          <div className="col-span-1 flex justify-center">
            <LogoutIcon style="w-[25px]" />
          </div>
          <div className="col-span-4 text-start">{t('logout')}</div>
        </NavLink>
        <div className="h-[1px] bg-gray-300 dark:bg-darkBorder my-3"></div>
      </div>

      <div>
        <div className="flex flex-row dark:text-white  justify-between text-sm my-3">
          <div>{t('profile_link')}</div>
          <button className="text-logoOrange">
            <CopyIcon style="w-4" />
          </button>
        </div>
        <button className="bg-logoOrange w-full text-sm font-semibold text-white py-1 rounded-md">
          {t('share_your_profile')}
        </button>
      </div>
    </div>
  );
}

function SideNavElement({ icon, text, path }) {
  const { t } = useTranslation();
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `grid grid-cols-5 gap-2 items-center hover:text-logoOrange dark:hover:text-logoOrange  transition-all ${
          isActive ? 'text-logoOrange' : 'text-black dark:text-white'
        }`
      }
    >
      <div className="col-span-1 flex justify-center">{icon}</div>
      <div className="col-span-4 text-start ">{t(text)}</div>
    </NavLink>
  );
}
