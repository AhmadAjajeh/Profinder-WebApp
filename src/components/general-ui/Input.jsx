import { useTranslation } from 'react-i18next';

export default function Input({
  label,
  className,
  name,
  validation,
  placeholder,
}) {
  const { t } = useTranslation();

  return (
    <div>
      {label && (
        <label className="text-black dark:text-white text-sm font-light">
          {t(label)}
        </label>
      )}
      <input
        name={name}
        className={'block ' + className}
        placeholder={placeholder}
        autoComplete="off"
      />
      {validation && (
        <div className="text-red-500 text-sm font-light">{t(validation)}</div>
      )}
    </div>
  );
}
