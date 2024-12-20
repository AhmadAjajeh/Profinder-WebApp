import { useState } from 'react';
import { motion } from 'framer-motion';

import HomeNavigation from '../../components/home-components/HomeNavigation';
import JobScroll from '../../components/job/JobScroll';
import ComingSoon from '../../components/general-ui/ComingSoon';
import { PlusIcon } from '../../components/general-ui/IconsSvg';

export default function JobPage() {
  const [jobId, setJobId] = useState(null);

  return (
    <>
      {/* middle section */}
      <div className="w-full md:w-9/12 lg:w-6/12 flex flex-col item-center">
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
          <JobScroll onSelect={setJobId} />
        </motion.div>
      </div>

      {/* far right section */}
      <div className="hidden h-fit lg:flex  lg:w-4/12 xl:w-[468px]">
        <ComingSoon />
      </div>
      <button className="w-12 h-12 rounded-full bg-logoOrange text-white  fixed bottom-4 rtl:left-4 ltr:right-4 flex items-center justify-center ">
        <PlusIcon style="w-5 h-5 " />
      </button>
    </>
  );
}
