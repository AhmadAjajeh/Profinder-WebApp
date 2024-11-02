import { useTranslation } from "react-i18next";

import UserImage from "./UserImage";
import { NavLink } from "react-router-dom";
import {
  CompaniesIcon,
  HomeIcon,
  ProfileIcon,
  SavedIcon,
  SettingsIcon,
  WalletIcon,
} from "./IconsSvg";

export default function SideNavigation() {
  return (
    <div class="flex flex-col space-y-6 bg-white dark:bg-elementBlack transition-all duration-300 font-light rounded-md p-5 border border-slate-300 dark:border-gray-700 h-fit w-full ">
      {/* <!-- user identity --> */}
      <div class="flex flex-col items-center jusitfy-center text-center">
        <div className="mb-3">
          <UserImage />
        </div>
        <div class="text-sm font-semibold dark:text-white">User Full name</div>
        <div class="text-sm text-gray-500 dark:text-slate-300 font-semibold">
          @username
        </div>
      </div>

      {/* <!-- side bar navigation --> */}
      <div class="flex flex-col space-y-5 px-2 text-xs text-right">
        <SideNavElement
          icon={<HomeIcon style="w-6 fill-current" />}
          text="home_page"
          path="/home"
        />
        <SideNavElement
          icon={<ProfileIcon style="w-6 fill-current" />}
          text="profile"
          path="/profile"
        />
        <SideNavElement
          icon={<SettingsIcon style="w-6 fill-current" />}
          text="settings"
          path="/settings"
        />
        <SideNavElement
          icon={<CompaniesIcon style="w-6 fill-current" />}
          text="companies"
          path="/companies"
        />
        <SideNavElement
          icon={<WalletIcon style="w-6 fill-current" />}
          text="wallet"
          path="/wallet"
        />
        <SideNavElement
          icon={<SavedIcon style="w-6 fill-current" />}
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
        `flex flex-row space-x-3 rtl:space-x-reverse items-center ${
          isActive ? "text-logoOrange" : "text-black dark:text-white"
        }`
      }
    >
      {icon}
      <div>{t(text)}</div>
    </NavLink>
  );
}
