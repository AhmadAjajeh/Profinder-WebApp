import { useTranslation } from "react-i18next";
import {
  ExpolrerIcon,
  HashtagsIcon,
  JobsIcon,
  ProjectsIcon,
} from "../genera-ui/IconsSvg";
import { matchPath, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

function NavElement({ title, icon, path, seperator, style }) {
  const { t } = useTranslation();

  const location = useLocation();
  const isActive = !!matchPath({ path: path, end: true }, location.pathname);

  return (
    <NavLink
      to={path}
      end
      className={({ isActive }) =>
        "w-1/4 flex transition-all duration-300   " +
        (isActive ? "text-logoOrange bg-white dark:bg-elementBlack " : " ") +
        style
      }
    >
      <div className=" w-full text-sm  items-center  p-3 relative ">
        <div className="flex flex-col items-center justify-between">
          {icon}
          <div className="z-10">{t(title)}</div>
          {isActive && <DownwardTirangle />}
        </div>
      </div>
    </NavLink>
  );
}
function DownwardTirangle() {
  return (
    <>
      <div class="bg-white dark:bg-elementBlack w-5 h-5 rotate-45 border-r border-b border-slate-300 dark:border-slate-600 absolute -bottom-2.5 shadow-sm transition-all duration-300 "></div>
      <div class="bg-white dark:bg-elementBlack w-5 h-5 rotate-45 absolute -bottom-1.5 shadow-sm shadow-white dark:shadow-elementBlack transition-all duration-300"></div>
    </>
  );
}

export default function HomeNavigation() {
  return (
    <div className="flex  flex-row justify-between h-16 bg-elementLightGray dark:bg-elementGray dark:text-white font-light rounded-md border border-slate-300 dark:border-gray-700 w-full shadow-sm">
      <NavElement
        style="ltr:rounded-l-md rtl:rounded-r-md border-r-2 rtl:border-r-0 dark:border-gray-700"
        path="/home"
        title="explorer"
        icon={<ExpolrerIcon style="w-5 fill-current mb-0.5 mt-0.5" />}
        seperator
      />
      <NavElement
        path="/home/jobs"
        style="border-r-2 dark:border-gray-700"
        title="jobs"
        icon={<JobsIcon style="w-5 fill-current mb-1.5 " />}
        seperator
      />
      <NavElement
        path="/home/projects"
        style="border-r-2 dark:border-gray-700"
        title="projects"
        icon={<ProjectsIcon style="w-6 fill-current mb-1 rtl:mb-0.5" />}
        seperator={true}
      />
      <NavElement
        style="rtl:rounded-l-md ltr:rounded-r-md rtl:border-r-2 dark:border-gray-700"
        path="/home/hashtags"
        title="hashtags"
        icon={<HashtagsIcon style="w-5 fill-current mb-0.5 rtl:mb-1" />}
      />
    </div>
  );
}
