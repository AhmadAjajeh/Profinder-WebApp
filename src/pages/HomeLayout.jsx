import { Outlet } from "react-router-dom";

import ComingSoon from "../components/genera-ui/ComingSoon";
import HomeNavigation from "../components/HomeComponents/HomeNavigation";
import SideNavigation from "../components/genera-ui/SideNavigation";

export default function HomeLayout() {
  return (
    <div className="mx-auto pt-20 min-h-screen p-6 flex flex-row  md:space-x-4 rtl:space-x-reverse lg:px-10 xl:px-20 transition-all duration-300 ">
      {/* far left section */}
      <div className="hidden md:flex  h-80 md:w-[210px] min-w-max lg:min-w-fit sticky top-20">
        <SideNavigation />
      </div>

      <Outlet />
    </div>
  );
}
