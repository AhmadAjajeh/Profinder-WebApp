import { AnimatePresence } from "framer-motion";
import DarkLightModeButton from "./DarkLightModeButton";
import NotificationButton from "./NotificationButton";
import SmallLogoImage from "./SmallLogoImage";
import UserImageButton from "./UserImageButton";

export default function SmallScreenHeader() {
  return (
    <div className="flex flex-row-reverse items-center justify-between w-full h-full p-3 px-8 md:hidden ">
      {/* <!-- user image and list --> */}
      <UserImageButton />

      {/* <!-- logo image --> */}
      {/* <div className="flex items-center shadow-sm">
        <SmallLogoImage style="w-9" />
      </div> */}

      {/* <!-- notification and light/dark mode--> */}
      <div>
        <nav className="text-slate-500 dark:text-slate-300">
          <ul className="flex flex-row items-center space-x-6 rtl:space-x-reverse">
            <li>
              <DarkLightModeButton />
            </li>
            <li>
              <NotificationButton />
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
