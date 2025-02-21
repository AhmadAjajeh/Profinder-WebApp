import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';

import HomeNavigation from '../../components/home-components/HomeNavigation';
import Modal from '../../components/general-ui/Modal';
import ProjectScroll from '../../components/project/ProjectScroll';
import ProjectDetails from '../../components/project/ProjectDetails';
import { PlusIcon } from '../../components/general-ui/IconsSvg';
import NewProject from '../../components/project/NewProject';

export default function ProjectPage() {
  const [searchParams] = useSearchParams();
  const [projectId, setProjectId] = useState(
    searchParams.get('selectedProject')
  );

  const [newProjectModal, setNewProjectModal] = useState(false);

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
          <ProjectScroll
            chooseProject={(id) => {
              setProjectId(id);
              setNewProjectModal(false);
            }}
            selectedProjectId={projectId}
          />
        </motion.div>
      </div>
      {/* far right section */}
      <div className="hidden h-fit lg:flex w-full lg:min-w-[250px] lg:max-w-[380px] xl:min-w-[430px] xl:max-w-[430px] sticky top-20">
        <div className="bg-white dark:bg-elementBlack w-[340px] sm:w-[400px] lg:w-full  rounded-md border border-gray-300 dark:border-darkBorder shadow-sm dark:text-white h-[630px] flex items-center justify-center">
          {newProjectModal ? (
            <NewProject />
          ) : (
            <ProjectDetails projectId={projectId} />
          )}
        </div>
      </div>

      <AnimatePresence>
        {(projectId !== null || newProjectModal) && (
          <Modal
            onClose={() => {
              setProjectId(null);
              setNewProjectModal(false);
            }}
            bgDiv={true}
            className="inset-0 rounded-md dark:bg-elementBlack"
            options="lg:hidden"
            animation={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: { opacity: 1, scale: 1 },
            }}
          >
            <div className="bg-white dark:bg-elementBlack w-[340px] sm:w-[400px] lg:w-full  rounded-md border border-gray-300 dark:border-darkBorder shadow-sm dark:text-white h-[630px] flex items-center justify-center">
              {newProjectModal ? (
                <NewProject />
              ) : (
                <ProjectDetails projectId={projectId} />
              )}
            </div>
          </Modal>
        )}
      </AnimatePresence>

      <button
        onClick={() => setNewProjectModal(true)}
        className="fixed bottom-3 ltr:right-3 rtl:left-3 text-white bg-logoOrange p-3 rounded-full"
      >
        <PlusIcon style="w-6 h-6" />
      </button>
    </div>
  );
}
