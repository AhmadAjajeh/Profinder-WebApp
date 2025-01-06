import { useTranslation } from 'react-i18next';
import { FaTrash, FaExclamationCircle } from 'react-icons/fa';

import Modal from './Modal';

export default function DeletionModal({ handleClose, handleDelete }) {
  const { t } = useTranslation();

  return (
    <Modal
      onClose={handleClose}
      bgDiv={true}
      className="rounded-lg"
      animation={{
        hidden: { opacity: 0, y: 250 },
        visible: { opacity: 1, y: 200 },
      }}
    >
      <div className="flex flex-col  items-center justify-center p-4 w-[300px] rounded-md border dark:bg-elementGray dark:text-white border-gray-300 dark:border-darkBorder">
        <FaExclamationCircle className="w-10 h-10 text-red-600 mb-3 shadow-sm shadow-red-600 rounded-full" />
        <h3 className="text-lg mb-5">{t('are_you_sure')}</h3>
        <div className="flex flex-row justify-between items-center w-full px-10">
          <button
            onClick={handleClose}
            className="bg-gray-300 px-4 py-2 rounded-md text-black"
          >
            {t('cancel')}
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 px-4 py-2 rounded-md text-black"
          >
            {t('delete')}
          </button>
        </div>
      </div>
    </Modal>
  );
}
