import { LucideLayers } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  ProjectCard,
  ExtendableProjectCard,
  ProjectCardShimmer,
} from './ProjectCard';
import Modal from '../../general-ui/Modal';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import EditButton from '../../general-ui/EditButton';

export default function ({ projects, isFetching, myProfile }) {
  const { t } = useTranslation();

  const [showModal, setShowModal] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const modal = (
    <Modal
      onClose={() => setShowModal(false)}
      bgDiv={true}
      lockScroll={true}
      className="w-[340px] sm:w-[400px] md:w-full inset-0 max-w-2xl mx-auto bg-white dark:bg-elementBlack rounded-lg shadow-xl"
      animation={{
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1 },
      }}
    >
      <div className="flex items-center justify-center">
        <div className="absolute w-fit flex flex-row items-center justify-center gap-1 top-[10px] md:rtl:right-[30px] md:ltr:left-[30px] text-logoOrange">
          <LucideLayers className="w-6 h-6" />
          <div className="w-fit h-fit text-[15px] ">{t('projects')}</div>
        </div>
        <div className="flex z-10 w-full flex-col max-h-[600px] min-h-[600px] overflow-y-scroll space-y-4 px-[28px] mt-12 mb-6 pb-2">
          {projects.map((p, idx) => (
            <ExtendableProjectCard key={p._id} project={p} idx={idx} />
          ))}
        </div>
      </div>
    </Modal>
  );

  return (
    <div className="relative h-[600px] w-full bg-white dark:bg-elementBlack border border-gray-300 dark:border-darkBorder rounded-md shadow-md">
      <AnimatePresence>{showModal && modal}</AnimatePresence>
      <div className="absolute bg-logoOrange min-h-[600px] min-w-28 max-w-28 hidden md:flex md:rtl:mr-[40px] md:ltr:ml-[40px]" />
      <div className=" h-full flex items-center justify-center">
        <div className="absolute w-fit flex flex-row items-center justify-center gap-1 top-[10px] ltr:left-[10px] rtl:right-[10px] md:rtl:right-[50px] md:ltr:left-[50px] text-logoOrange md:text-white">
          <LucideLayers className="w-6 h-6" />
          <div className="w-fit h-fit text-[15px] ">{t('projects')}</div>
        </div>
        {myProfile && (
          <EditButton
            handleClick={() => setShowForm(true)}
            text={t('add_new_projects')}
            className="absolute top-2 rtl:left-2 ltr:right-2"
          />
        )}
        {!isFetching && (
          <button
            onClick={() => setShowModal(true)}
            className="absolute z-20 bg-orange-300 font-light text-white text-sm p-1 rounded-lg bottom-[6px]"
          >
            {t('more_details')}
          </button>
        )}

        {isFetching && (
          <div className="flex z-10 w-full flex-col h-full space-y-4 px-[28px] mt-24">
            <ProjectCardShimmer />
            <ProjectCardShimmer />
            <ProjectCardShimmer />
          </div>
        )}

        {projects.length > 0 && !isFetching && (
          <div className="flex z-10 w-full flex-col h-full space-y-4 px-[28px] mt-24">
            {projects.slice(0, 3).map((p, idx) => (
              <ProjectCard key={p._id} project={p} idx={idx} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
