import { useTranslation } from 'react-i18next';

export default function EditButton({ text, handleClick, className }) {
  const { t } = useTranslation();

  return (
    <button
      onClick={handleClick}
      className={
        'px-2 py-1 bg-lightBackground dark:bg-darkBorder text-black dark:text-gray-300 text-xs font-light rounded-md border border-gray-500 dark:border-darkBorder ' +
        className
      }
    >
      {t(text)}
    </button>
  );
}
