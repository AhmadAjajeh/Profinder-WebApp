import { useTranslation } from 'react-i18next';

export default function Input({
  name,
  id,
  label,
  className,
  inputClass,
  name,
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
      <input name={name} className={'block ' + inputClass} autoComplete="off" />
      {validation && (
        <div className="text-red-500 text-sm font-light">{t(validation)}</div>
      )}
    </div>
  );
}
