import { useTranslation } from 'react-i18next';

export default function Input({
  name,
  id,
  label,
  className,
  validation,
  placeholder,
}) {
  const { t } = useTranslation();

  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="text-black dark:text-white text-sm font-light"
        >
          {t(label)}
        </label>
      )}
      <input
        name={name}
        className={'block ' + className}
        autoComplete="off"
        placeholder={placeholder}
      />
      {validation && (
        <div className="text-red-500 text-sm font-light">{t(validation)}</div>
      )}
    </div>
  );
}
