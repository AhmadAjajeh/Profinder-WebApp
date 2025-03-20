import { Link } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAward } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import Modal from '../../general-ui/Modal';
import { useState } from 'react';

export default function CertificationCard({ certification, myProfile }) {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);

  const modal = (
    <Modal
      lockScroll={true}
      onClose={() => setShowModal(false)}
      bgDiv={true}
      className="inset-0 rounded-md dark:bg-elementBlack "
      animation={{
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1 },
      }}
    >
      <div className="relative max-w-[340px] bg-white dark:bg-elementBlack sm:max-w-[400px] border border-gray-300 dark:border-darkBorder shadow-lg p-3 rounded-md flex">
        <div className="flex flex-col justify-between h-full w-full">
          <div>
            <FontAwesomeIcon
              icon={faAward}
              className="w-8 h-8 absolute top-4 right-4  text-logoOrange"
            />
            <div className="w-full mb-3">
              <img
                src={certification.link}
                alt={certification.title}
                className=" "
              />
            </div>
            <div className="-mx-2 text-logoOrange font-semibold text-center text-[16px] mb-1">
              {certification.title}
            </div>
            <div className="text-[13px] text-center text-gray-500 dark:text-gray-300 mb-2">
              {certification.organization}
            </div>
            <div className="text-[13px]  text-center mb-2 dark:text-white">
              {certification.description}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );

  return (
    <div className="relative w-full h-[500px] bg-white dark:bg-elementBlack border border-gray-300 dark:border-darkBorder shadow-lg p-3 rounded-md flex">
      {showModal && modal}
      <div className="flex flex-col justify-between h-full w-full">
        <div>
          <FontAwesomeIcon
            icon={faAward}
            className="w-8 h-8 absolute top-4 right-4  text-logoOrange"
          />
          <div className="w-full mb-3">
            <img
              src={certification.link}
              alt={certification.title}
              className="aspect-square "
            />
          </div>
          <div className="-mx-2 text-logoOrange font-semibold text-center md:text-[14px] lg:text-[20px] mb-1">
            {certification.title}
          </div>
          <div className="md:text-[12px] text-center text-gray-500 dark:text-gray-300 mb-2">
            {certification.organization}
          </div>
          <div className="text-[13px] md:text-[11px] text-center mb-2 dark:text-white">
            {certification.description.length > 100
              ? certification.description.slice(0, 100) + '...'
              : certification.description}
          </div>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-logoOrange text-white text-[12px] w-full p-2 flex gap-2 items-center justify-center"
        >
          <Link className="w-4 h-4" />
          <div>{t('view_certification')}</div>
        </button>
      </div>
    </div>
  );
}
