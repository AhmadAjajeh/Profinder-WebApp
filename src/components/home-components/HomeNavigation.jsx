import { useTranslation } from 'react-i18next';
import {
  ExpolrerIcon,
  HashtagsIcon,
  JobsIcon,
  ProjectsIcon,
} from '../general-ui/IconsSvg';
import { matchPath, NavLink, useLocation } from 'react-router-dom';

function NavElement({ title, icon, path, seperator, style }) {
  const { t } = useTranslation();

  const location = useLocation();
  const isActive = !!matchPath({ path: path, end: true }, location.pathname);

  return (
    <NavLink
      to={path}
      end
      className={({ isActive }) =>
        'w-1/4 flex transition-all duration-300  hover:bg-white dark:hover:bg-elementBlack ' +
        (isActive ? 'text-logoOrange bg-white dark:bg-elementBlack ' : ' ') +
        style
      }
    >
      <div className=" w-full text-[12px] md:text-[15px] p-3 flex  justify-center   relative ">
        <div className="flex flex-col items-center justify-between">
          {icon}
          <div className="z-10 font-normal">{t(title)}</div>
          {isActive && <DownwardTirangle />}
        </div>
      </div>
    </NavLink>
  );
}
function DownwardTirangle() {
  return (
    <>
      <div class="bg-white dark:bg-elementBlack w-5 h-5 rotate-45 border-r-2 border-b-2 border-gray-300 dark:border-darkBorder absolute -bottom-2.5 shadow-sm transition-all duration-300 "></div>
      <div class="bg-white dark:bg-elementBlack w-5 h-5 rotate-45 absolute -bottom-1.5 shadow-sm shadow-white dark:shadow-elementBlack transition-all duration-300"></div>
    </>
  );
}

export default function HomeNavigation() {
  return (
    <div className="flex flex-row justify-between h-20 bg-elementLightGray dark:bg-elementGray dark:text-white font-light rounded-md border-2 border-gray-300 dark:border-darkBorder w-full shadow-sm mb-5">
      <NavElement
        style="ltr:rounded-l-md rtl:rounded-r-md border-r-2 rtl:border-r-0 dark:border-darkBorder"
        path="/home"
        title="explorer"
        icon={<ExpolrerIcon style="w-6 fill-current" />}
        seperator
      />
      <NavElement
        path="/home/jobs"
        style="border-r-2 dark:border-darkBorder"
        title="jobs"
        icon={<JobsIcon style="w-6" />}
        seperator
      />
      <NavElement
        path="/home/projects"
        style="border-r-2 dark:border-darkBorder"
        title="projects"
        icon={<ProjectsIcon style="w-7 fill-current " />}
        seperator={true}
      />
      <NavElement
        style="rtl:rounded-l-md ltr:rounded-r-md rtl:border-r-2 dark:border-darkBorder"
        path="/home/hashtags"
        title="hashtags"
        icon={<HashtagsIcon style="w-6 fill-current" />}
      />
    </div>
  );
}
