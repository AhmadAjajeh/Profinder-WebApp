import { Outlet } from 'react-router-dom';

import SideNavigation from '../components/general-ui/SideNavigation';

export default function HomeLayout() {
  return (
    <div className="mx-auto pt-20 min-h-screen p-6 flex flex-row  md:space-x-4 rtl:space-x-reverse lg:px-10 xl:px-20 transition-all duration-300 ">
      {/* far left section */}
      <div className="hidden md:flex  h-80 w-[250px]  sticky top-20">
        <SideNavigation />
      </div>

      <Outlet />
    </div>
  );
}
