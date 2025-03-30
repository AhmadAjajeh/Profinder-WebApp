import { LucideLayers } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ProjectCard from './ProjectCard';

export default function ({ myProfile, projects, isFetching }) {
  const { t } = useTranslation();

  return (
    <div className="relative h-[600px] w-full bg-white dark:bg-elementBlack border border-gray-300 dark:border-darkBorder rounded-md shadow-md">
      <div className="absolute bg-logoOrange min-h-[600px] min-w-28 max-w-28 hidden md:flex md:rtl:mr-[40px] md:ltr:ml-[40px]" />
      <div className=" h-full flex items-center justify-center">
        <div className="absolute w-fit flex flex-row items-center justify-center gap-1 top-[10px] ltr:left-[10px] rtl:right-[10px] md:rtl:right-[50px] md:ltr:left-[50px] text-logoOrange md:text-white">
          <LucideLayers className="w-6 h-6" />
          <div className="w-fit h-fit text-[15px] ">{t('projects')}</div>
        </div>
        <div className="flex z-10 w-full flex-col h-full space-y-4 px-8 mt-24">
          {projects.slice(0, 3).map((p) => (
            <ProjectCard key={p._id} project={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
