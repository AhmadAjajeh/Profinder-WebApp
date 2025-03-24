import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import HomeNavigation from '../../components/home-components/HomeNavigation';
import JobScroll from '../../components/job/JobScroll';

import { Outlet, useNavigate, useParams } from 'react-router-dom';
import Modal from '../../components/general-ui/Modal';
import JobHunt from '../../components/general-ui/JobHunt';
import { useTranslation } from 'react-i18next';

export default function JobPage() {
  const { jobId } = useParams();

  const { t } = useTranslation();
  const navigate = useNavigate();

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
          <JobScroll />
        </motion.div>
      </div>
      {/* far right section */}
      <div className="hidden h-fit lg:flex w-full lg:min-w-[250px] lg:max-w-[380px] xl:min-w-[430px] xl:max-w-[430px] sticky top-20">
        <div className="bg-white dark:bg-elementBlack w-[340px] sm:w-[400px] lg:w-full p-4 rounded-md border border-gray-300 dark:border-darkBorder shadow-sm   dark:text-white h-[630px] flex flex-col">
          {!jobId ? (
            <div className="w-full h-full flex flex-col justify-center items-center">
              <div className="text-gray-600 font-light bg-lightBackground dark:bg-elementGray dark:text-gray-300  p-3 rounded-md text-center w-full">
                {t('select_a_job_to_see_its_details')}
              </div>
            </div>
          ) : (
            <Outlet />
          )}
        </div>
      </div>

      <AnimatePresence>
        {jobId && (
          <Modal
            onClose={() => navigate('/home/jobs')}
            bgDiv={true}
            className="inset-0 rounded-md dark:bg-elementBlack"
            options="lg:hidden"
            animation={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: { opacity: 1, scale: 1 },
            }}
          >
            <div className="bg-white dark:bg-elementBlack w-[340px] sm:w-[400px] lg:w-full p-4 rounded-md border border-gray-300 dark:border-darkBorder shadow-sm   dark:text-white h-[630px] flex flex-col">
              <Outlet />
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}
