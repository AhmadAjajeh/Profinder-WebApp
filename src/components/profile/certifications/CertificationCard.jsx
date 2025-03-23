import { Calendar, Link } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAward } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import Modal from '../../general-ui/Modal';
import { useState } from 'react';
import { formatDate } from '../../../util/date';
import EditButton from '../../general-ui/EditButton';
import CertificationForm from './CertificationForm';
import { getBaseUrl } from '../../../util/http';
import { AnimatePresence } from 'framer-motion';
import DeletionModal from '../../general-ui/DeletionModal';
import { useMutation } from '@tanstack/react-query';
import { deleteCertificationMutation } from '../../../http/profile';
import queryClient from '../../../http/queryClient';
import useErrorHandler from '../../../hooks/useErrorHandler';

export default function CertificationCard({ certification, myProfile }) {
  const { t } = useTranslation();
  const handleError = useErrorHandler();

  const [modal, setModal] = useState('');
  const [image, setImage] = useState(certification.certification_image);

  const { mutateAsync: deleteCertification } = useMutation({
    mutationFn: deleteCertificationMutation,
    onSuccess: () => {
      queryClient.invalidateQueries(['visit-user']);
      closeModal();
    },
    onError: handleError,
  });

  function closeModal() {
    setModal('');
  }

  async function handleDelete() {
    await deleteCertification(certification._id);
  }

  const viewModal = (
    <Modal
      lockScroll={true}
      onClose={closeModal}
      bgDiv={true}
      className="inset-0 rounded-md dark:bg-elementBlack "
      animation={{
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1 },
      }}
    >
      <div className="relative max-w-[340px] bg-white dark:bg-elementBlack dark:text-white sm:max-w-[400px] border border-gray-300 dark:border-darkBorder shadow-lg p-3 rounded-md flex">
        <div className="flex flex-col  h-full w-full">
          <div className="">
            <FontAwesomeIcon
              icon={faAward}
              className="w-8 h-8 absolute top-4 right-4  text-logoOrange"
            />
            {image ? (
              <img
                src={getBaseUrl() + image}
                alt={certification.title}
                className="w-full h-full"
                loading="lazy"
              />
            ) : (
              <div className="w-full min-h-[250px] bg-elementDarkerLightGray dark:bg-elementGray text-black dark:text-white font-light flex items-center justify-center">
                Failed to fetch
              </div>
            )}
            <div className="-mx-2 text-logoOrange font-semibold text-center text-[16px] mb-1">
              {certification.title}
            </div>
            <div className="text-[13px] text-center text-gray-500 dark:text-gray-300 mb-2">
              {certification.organization}
            </div>
            <div className="text-[13px]  text-center mb-2 ">
              {certification.description}
            </div>

            <div className="flex flex-row gap-14 justify-center mt-5">
              <div className="flex flex-col items-center space-y-1">
                <Calendar className="text-logoOrange w-4 h-4" />
                <div className="font-light text-gray-600 dark:text-gray-300 text-xs">
                  {t('issue_date')}
                </div>
                <div className="text-sm">
                  {formatDate(certification.issue_date)}
                </div>
              </div>
              <div className="flex flex-col items-center space-y-1">
                <Calendar className="text-logoOrange w-4 h-4" />
                <div className="font-light text-gray-600 dark:text-gray-300 text-xs">
                  {t('expiration_date')}
                </div>
                <div className="text-sm">
                  {formatDate(certification.expiration_date)}
                </div>
              </div>
            </div>
          </div>
          {myProfile && (
            <div className="flex flex-row justify-center gap-4 items-center mt-3">
              <EditButton
                text={t('update')}
                className="w-32"
                handleClick={() => setModal('update')}
              />
              <EditButton
                text={t('delete')}
                className="w-32"
                handleClick={() => setModal('delete')}
              />
            </div>
          )}
        </div>
      </div>
    </Modal>
  );

  return (
    <div className="relative w-full h-[500px] bg-white dark:bg-elementBlack border border-gray-300 dark:border-darkBorder shadow-lg p-3 rounded-md flex">
      <AnimatePresence>
        {modal === 'view' && viewModal}
        {modal === 'update' && (
          <CertificationForm
            certification={certification}
            onClose={closeModal}
          />
        )}
        {modal === 'delete' && (
          <DeletionModal handleClose={closeModal} handleDelete={handleDelete} />
        )}
      </AnimatePresence>

      <div className="flex flex-col justify-between h-full w-full">
        <div>
          <FontAwesomeIcon
            icon={faAward}
            className="w-8 h-8 absolute top-4 right-4  text-logoOrange"
          />
          <div className="w-full aspect-square mb-3">
            {image ? (
              <img
                src={getBaseUrl() + image}
                alt={certification.title}
                className="w-full h-full"
                loading="lazy"
                onError={() => setImage(null)}
              />
            ) : (
              <div className="w-full min-h-full bg-elementDarkerLightGray dark:bg-elementGray text-dark dark:text-white font-light flex items-center justify-center">
                Failed to fetch
              </div>
            )}
          </div>
          <div className="-mx-2 text-logoOrange font-semibold text-center md:text-[14px] lg:text-[20px] mb-1">
            {certification.title}
          </div>
          <div className="md:text-[12px] text-center text-gray-500 dark:text-gray-300 mb-2">
            {certification.organization}
          </div>
          <div className="text-[13px] md:text-[11px] text-center mb-2 dark:text-white">
            {certification.description?.length > 100
              ? certification.description.slice(0, 100) + '...'
              : certification.description}
          </div>
        </div>
        <button
          onClick={() => setModal('view')}
          className="bg-logoOrange text-white text-[12px] w-full p-2 flex gap-2 items-center justify-center"
        >
          <Link className="w-4 h-4" />
          <div>{t('view_certification')}</div>
        </button>
      </div>
    </div>
  );
}

export function CertificationCardShimmer() {
  return (
    <div className="flex flex-col justify-between h-full w-full animate-pulse">
      <div>
        <div className="w-full aspect-square mb-3 bg-gray-300 dark:bg-gray-700 rounded-md" />
        <div className="bg-gray-300 dark:bg-gray-700 h-6 w-3/4 mx-auto mb-1 rounded" />
        <div className="bg-gray-300 dark:bg-gray-700 h-4 w-1/2 mx-auto mb-2 rounded" />
        <div className="bg-gray-300 dark:bg-gray-700 h-10 w-full mx-auto mb-2 rounded" />
      </div>
      <div className="bg-gray-300 dark:bg-gray-700 h-8 w-full p-2 rounded" />
    </div>
  );
}
