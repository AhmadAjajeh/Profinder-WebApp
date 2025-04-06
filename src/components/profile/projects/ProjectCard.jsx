import { Calendar } from 'lucide-react';
import ImageGallery from '../../general-ui/ImageGallery';
import { useTranslation } from 'react-i18next';
import { formatDate } from '../../../util/date';
import { useState } from 'react';

const placeholderImages = [
  'https://placehold.co/600x400',
  // 'https://placehold.co/600x400',
  // 'https://placehold.co/600x400',
  // 'https://placehold.co/600x400',
  // 'https://placehold.co/600x400',
  // 'https://placehold.co/600x400',
];

export function ProjectCard({ project, idx }) {
  const { t } = useTranslation();

  return (
    <div className="w-full relative bg-white dark:bg-elementBlack shadow-md rounded-md border border-gray-300 dark:border-darkBorder dark:text-white h-[160px] overflow-y-hidden">
      <div className="flex h-full flex-row items-center">
        <>
          <div className="w-10 min-w-10 max-w-10 h-full bg-orange-300 py-2 flex items-center justify-center text-white font-light rtl:mr-[11px] ltr:ml-[11px]">
            {idx + 1}
          </div>
          <div className="p-1 px-2 flex justify-center items-center h-full">
            <div className="md:flex md:gap-3 h-full w-full items-center md:justify-start justify-center">
              <div className="hidden md:flex">
                <ImageGallery
                  images={placeholderImages}
                  width="200px"
                  height="140px"
                />
              </div>
              <div>
                <div className="text-sm text-logoOrange font-bold mb-1">
                  {project.title}
                </div>
                {project.description && (
                  <div className="text-xs mb-1">
                    {project.description.slice(0, 100)}
                    {project.description.length > 100 && <span>...</span>}
                  </div>
                )}
                <div className="flex flex-wrap gap-1 mb-2">
                  {project.skills_used.slice(0, 5).map((skill) => (
                    <div
                      key={skill}
                      className="bg-orange-300 text-white rounded p-1 text-[10px] "
                    >
                      {skill}
                    </div>
                  ))}
                </div>
                <div className="hidden lg:flex flex-row w-fit gap-6">
                  <div className="flex flex-col items-center justify-center">
                    <Calendar className="w-4 h-4 mb-1 text-logoOrange" />
                    <div className="font-light text-[10px]">
                      {t('start_date')}
                    </div>
                    <div className="text-[12px]">
                      {formatDate(project.start_date)}
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <Calendar className="w-4 h-4 mb-1 text-logoOrange" />
                    <div className="font-light text-[10px]">
                      {t('end_date')}
                    </div>
                    <div className="text-[12px]">
                      {formatDate(project.end_date)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      </div>
    </div>
  );
}

export function ExtendableProjectCard({ project, idx }) {
  const { t } = useTranslation();

  const [full, setFull] = useState(false);

  return (
    <div className="w-full relative bg-white dark:bg-elementBlack shadow-md rounded-md border border-gray-300 dark:border-darkBorder dark:text-white">
      <div className="flex flex-row items-center h-full">
        <div className="flex flex-col w-full sm:flex-row items-center justify-center sm:justify-start  h-full">
          <div className="bg-orange-300 text-white w-full text-center p-1 sm:max-w-10 sm:min-w-10 mb-1 ">
            {idx + 1}
          </div>
          <div className="p-1 px-2 flex justify-center items-center h-full">
            <div className="sm:flex sm:gap-3 h-full w-full items-center md:justify-start justify-center">
              <div className="flex items-center justify-center sm:hidden md:flex">
                <ImageGallery
                  images={placeholderImages}
                  width="200px"
                  height="140px"
                />
              </div>
              <div className="flex flex-col items-center justify-center sm:items-start sm:justify-start">
                <div className="text-sm text-logoOrange font-bold mb-1">
                  {project.title}
                </div>
                {project.description && (
                  <div className="text-xs mb-1">
                    {full
                      ? project.description
                      : project.description.slice(0, 100)}
                    {!full && project.description.length > 100 && (
                      <span>...</span>
                    )}
                  </div>
                )}
                <div className="flex flex-wrap gap-1 mb-2">
                  {(full
                    ? project.skills_used
                    : project.skills_used.slice(0, 5)
                  ).map((skill) => (
                    <div
                      key={skill}
                      className="bg-orange-300 text-white rounded p-1 text-[10px] "
                    >
                      {skill}
                    </div>
                  ))}
                </div>
                <div className="flex flex-row sm:hidden w-fit gap-6">
                  <div className="flex flex-col items-center justify-center">
                    <Calendar className="w-4 h-4 mb-1 text-logoOrange" />
                    <div className="font-light text-[10px]">
                      {t('start_date')}
                    </div>
                    <div className="text-[12px]">
                      {formatDate(project.start_date)}
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <Calendar className="w-4 h-4 mb-1 text-logoOrange" />
                    <div className="font-light text-[10px]">
                      {t('end_date')}
                    </div>
                    <div className="text-[12px]">
                      {formatDate(project.end_date)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={() => setFull((state) => !state)}
        className="w-full h-[40px] text-sm bg-logoOrange text-white flex items-center justify-center rounded-b-md"
      >
        {t(full ? 'less' : 'see_details')}
      </button>
    </div>
  );
}

export function ProjectCardShimmer() {
  return (
    <div className="w-full relative min-h-[160px] bg-white dark:bg-elementBlack shadow-md rounded-md border border-gray-300 dark:border-darkBorder dark:text-white animate-pulse">
      <div className="flex flex-row items-center h-full">
        <div className="flex flex-col w-full sm:flex-row items-center justify-center sm:justify-start h-full">
          <div className="bg-orange-300 w-full text-center p-1 sm:max-w-10 sm:min-w-10 mb-1 rounded text-transparent"></div>
          <div className="p-1 px-2 flex justify-center items-center h-full w-full">
            <div className="sm:flex sm:gap-3 h-full w-full items-center md:justify-start justify-center">
              <div className="flex items-center justify-center sm:hidden md:flex">
                <div className="w-[200px] h-[140px] bg-gray-300 dark:bg-darkBorder rounded" />
              </div>
              <div className="flex flex-col items-center justify-center sm:items-start sm:justify-start w-full">
                <div className="w-32 h-4 bg-gray-300 dark:bg-darkBorder rounded mb-1" />
                <div className="w-full h-3 bg-gray-300 dark:bg-darkBorder rounded mb-1" />
                <div className="w-3/4 h-3 bg-gray-300 dark:bg-darkBorder rounded mb-2" />
                <div className="flex flex-wrap gap-1 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className="bg-gray-300 dark:bg-darkBorder rounded p-1 text-[10px] w-12 h-4"
                    />
                  ))}
                </div>
                <div className="flex flex-row sm:hidden w-fit gap-6">
                  {[1, 2].map((i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center justify-center"
                    >
                      <div className="w-4 h-4 bg-gray-300 dark:bg-darkBorder rounded-full mb-1" />
                      <div className="w-12 h-3 bg-gray-300 dark:bg-darkBorder rounded mb-1" />
                      <div className="w-16 h-4 bg-gray-300 dark:bg-darkBorder rounded" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
