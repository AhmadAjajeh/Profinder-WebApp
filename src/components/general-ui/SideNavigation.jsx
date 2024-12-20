import { useTranslation } from 'react-i18next';

import UserImage from './UserImage';
import { NavLink } from 'react-router-dom';
import {
  CompaniesIcon,
  HomeIcon,
  ProfileIcon,
  SavedIcon,
  SettingsIcon,
  WalletIcon,
} from './IconsSvg';
import { useSelector } from 'react-redux';

export default function SideNavigation() {
  const user = useSelector((state) => state.auth.user);
  const profile = useSelector((state) => state.profile.profile);

  return (
    <div class="flex flex-col bg-white dark:bg-elementBlack transition-all duration-300  rounded-md p-5 border border-gray-300 dark:border-darkBorder h-fit w-full  ">
      {/* <!-- user identity --> */}
      <div class="flex flex-col items-center jusitfy-center text-center mb-3">
        <div className="mb-2">
          <UserImage className="w-12 h-12 rounded-full" />
        </div>
        <div class="text-sm font-semibold dark:text-white">
          {profile?.full_name || 'Full Name'}
        </div>
        <div class="text-[12px] text-gray-500 dark:text-slate-300 font-semibold">
          @{user?.username}
        </div>
      </div>

      <div className="h-[1px] bg-gray-300 mb-3"></div>

      {/* <!-- side bar navigation --> */}
      <div class="flex  flex-col space-y-5 px-2 text-[13px]  text-right">
        <SideNavElement
          icon={<HomeIcon style="w-5 fill-current" />}
          text="home_page"
          path="/home"
        />
        <SideNavElement
          icon={<ProfileIcon style="w-5 fill-current" />}
          text="profile"
          path="/profile"
        />
        <SideNavElement
          icon={<SettingsIcon style="w-5 fill-current" />}
          text="settings"
          path="/settings"
        />
        <SideNavElement
          icon={<CompaniesIcon style="w-5 fill-current" />}
          text="companies"
          path="/companies"
        />
        <SideNavElement
          icon={<WalletIcon style="w-5 fill-current" />}
          text="wallet"
          path="/wallet"
        />
        <SideNavElement
          icon={<SavedIcon style="w-5 fill-current" />}
          text="saved_items"
          path="/saved-items"
        />
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
        `flex flex-row space-x-3 rtl:space-x-reverse items-center hover:text-logoOrange dark:hover:text-logoOrange ${
          isActive ? 'text-logoOrange' : 'text-black dark:text-white'
        }`
      }
    >
      {icon}
      <div className="">{t(text)}</div>
    </NavLink>
  );
}
