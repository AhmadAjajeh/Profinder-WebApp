import { useTranslation } from 'react-i18next';

export default function EditButton({ text, handleClick, className }) {
  const { t } = useTranslation();

  return (
    <button
      onClick={handleClick}
      className={
        'px-2 py-1 bg-gray-700 dark:bg-elementBlack text-white text-xs font-light rounded-md border-2 border-gray-300 dark:border-darkBorder ' +
        className
      }
    >
      {t(text)}
    </button>
  );
}
