import { Outlet } from 'react-router-dom';

import SideNavigation from '../components/general-ui/SideNavigation';

export default function HomeLayout() {
  return (
    <div className="mx-auto pt-20 min-h-screen p-6 flex flex-row  md:space-x-5 rtl:space-x-reverse lg:px-10 xl:px-16  transition-all duration-300 ">
      {/* far left section */}
      <div className="hidden md:inline h-80 md:w-full md:min-w-[230px] md:max-w-[230px] lg:min-w-[200px] lg:max-w-[240px] xl:min-w-[240px] xl:max-w-[240px] sticky top-20">
        <SideNavigation />
      </div>

      <Outlet />
    </div>
  );
}
