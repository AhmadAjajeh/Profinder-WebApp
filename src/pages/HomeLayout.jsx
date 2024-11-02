import { Outlet } from "react-router-dom";

import ComingSoon from "../components/genera-ui/ComingSoon";
import HomeNavigation from "../components/HomeComponents/HomeNavigation";
import SideNavigation from "../components/genera-ui/SideNavigation";

export default function HomeLayout() {
  return (
    <div className="mx-auto pt-24 p-6 flex flex-row md:space-x-4 rtl:space-x-reverse lg:px-10 xl:px-32 transition-all duration-300 ">
      {/* far left section */}
      <div className="hidden md:flex md:w-[210px] lg:min-w-fit ">
        <SideNavigation />
      </div>
      {/* middle section */}
      <div className="w-full md:w-9/12 lg:w-6/12 flex flex-col item-center">
        <HomeNavigation />
        <Outlet />
      </div>
      {/* far right section */}
      <div className="hidden lg:flex lg:w-4/12 xl:w-[364px]  shadow-sm">
        <ComingSoon title={"chat"} />
      </div>
    </div>
  );
}
