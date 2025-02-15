import { useTranslation } from 'react-i18next';

export default function FormInput({
  icon,
  handleChange,
  type,
  name,
  id,
  label,
  placeholder,
  value,
}) {
  const { t } = useTranslation();

  return (
    <div className="relative">
      <label
        htmlFor={id}
        className="mb-1 block text-sm font-medium  text-gray-700 dark:text-white"
      >
        {t(label)}
      </label>
      <div className=" relative rounded-md shadow-sm">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          type={type}
          name={name}
          id={id}
          value={value || ''}
          onChange={handleChange}
          className="block w-full pl-10 rounded-md border-gray-300  bg-gray-100 dark:bg-elementGray dark:text-white px-4 py-2 placeholder:text-[12px] font-light text-sm"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
