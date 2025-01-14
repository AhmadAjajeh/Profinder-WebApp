import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import HomeNavigation from '../../components/home-components/HomeNavigation';
import JobScroll from '../../components/job/JobScroll';
import JobDetails from '../../components/job/JobDetails';
import { useSearchParams } from 'react-router-dom';
import Modal from '../../components/general-ui/Modal';

export default function JobPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [jobId, setJobId] = useState(searchParams.get('selectedJob'));
  console.log(jobId);
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
          <JobScroll
            chooseJob={setJobId}
            onSelect={setJobId}
            selectedJobId={jobId}
          />
        </motion.div>
      </div>
      {/* far right section */}
      <div className="hidden h-fit lg:flex w-full lg:min-w-[250px] lg:max-w-[380px] xl:min-w-[430px] xl:max-w-[430px] sticky top-20">
        <JobDetails jobId={jobId} />
      </div>
      <AnimatePresence>
        {jobId !== null && (
          <Modal
            lockScroll={true}
            onClose={() => setJobId(null)}
            bgDiv={true}
            className="inset-0 rounded-md dark:bg-elementBlack"
            options="lg:hidden"
            animation={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: { opacity: 1, scale: 1 },
            }}
          >
            <JobDetails jobId={jobId} />
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}
