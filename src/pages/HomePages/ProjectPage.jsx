import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';

import HomeNavigation from '../../components/home-components/HomeNavigation';
import Modal from '../../components/general-ui/Modal';
import ProjectScroll from '../../components/project/ProjectScroll';
import { PlusIcon } from '../../components/general-ui/IconsSvg';
import JobHunt from '../../components/general-ui/JobHunt';
import { useTranslation } from 'react-i18next';

export default function ProjectPage() {
  const { projectId } = useParams();

  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const parentPage = location.pathname === '/home/projects';

  return (
    <div className="w-full flex flex-row space-x-5 rtl:space-x-reverse">
      {/* middle section */}
      <div className=" flex flex-col item-center w-full lg:min-w-[500px] ">
        {/* <HomeNavigation /> */}
        <HomeNavigation />

        {/* content */}
        <motion.div
          className="flex flex-col space-y-4"
          variants={{
            hidden: { opacity: 0, y: -15 },
            animate: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate="animate"
          exit="hidden"
        >
          <ProjectScroll />
        </motion.div>
      </div>
      {/* far right section */}
      <div className="hidden h-fit lg:flex w-full lg:min-w-[250px] lg:max-w-[380px] xl:min-w-[430px] xl:max-w-[430px] sticky top-20">
        <div className="bg-white dark:bg-elementBlack w-[340px] sm:w-[400px] lg:w-full  rounded-md border border-gray-300 dark:border-darkBorder shadow-sm dark:text-white h-[630px] flex items-center justify-center">
          {parentPage ? (
            <div className="w-full h-full flex flex-col justify-center p-3 items-center">
              <div className="text-gray-600 font-light border-gray-300  bg-gray-200 dark:bg-gray-700 dark:text-gray-300 p-3 rounded-md text-center w-full">
                {t('select_a_project_to_view_its_details')}
              </div>
            </div>
          ) : (
            <Outlet />
          )}
        </div>
      </div>

      <AnimatePresence>
        {!parentPage && (
          <Modal
            onClose={() => navigate('/home/projects')}
            bgDiv={true}
            className="inset-0 rounded-md dark:bg-elementBlack"
            options="lg:hidden"
            animation={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: { opacity: 1, scale: 1 },
            }}
          >
            <div className="bg-white dark:bg-elementBlack w-[340px] sm:w-[400px] lg:w-full  rounded-md border border-gray-300 dark:border-darkBorder shadow-sm dark:text-white h-[630px] flex items-center justify-center">
              {parentPage ? (
                <div className="w-full h-full flex flex-col justify-center p-3 items-center">
                  <div className="text-gray-600 font-light border-gray-300  bg-gray-200 dark:bg-gray-700 dark:text-gray-300 p-3 rounded-md text-center w-full">
                    {t('select_a_project_to_view_its_details')}
                  </div>
                </div>
              ) : (
                <Outlet />
              )}
            </div>
          </Modal>
        )}
      </AnimatePresence>

      <Link
        to="new-project"
        className="fixed bottom-3 ltr:right-3 rtl:left-3 text-white bg-logoOrange p-3 rounded-full"
      >
        <PlusIcon style="w-6 h-6" />
      </Link>
    </div>
  );
}
