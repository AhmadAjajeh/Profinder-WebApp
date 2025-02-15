import { useTranslation } from 'react-i18next';

export default function Input({
  name,
  id,
  label,
  className,
  inputClass,
  validation,
  placeholder,
}) {
  const { t } = useTranslation();

  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={id}
          className="text-black dark:text-white text-sm font-light"
        >
          {t(label)}
        </label>
      )}
      <input
        id={id}
        name={name}
        className={'block ' + inputClass}
        autoComplete="off"
        placeholder={placeholder}
      />
      {validation && (
        <div className="text-red-500 text-sm font-light">{t(validation)}</div>
      )}
    </div>
  );
}
