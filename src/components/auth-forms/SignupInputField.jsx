import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Icon from 'react-icons-kit';
import { eye } from 'react-icons-kit/feather/eye';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';

export default function SignupInputField({
  addStyle,
  name,
  validation,
  placeholder,
  type,
  label,
}) {
  const { t } = useTranslation();
  const [inputType, setInputType] = useState(type);

  const handleClick = () => {
    setInputType((state) => {
      return state === 'password' ? 'text' : 'password';
    });
  };

  return (
    <div
      class={
        'relative flex flex-col space-y-1 ' +
        (validation ? 'mb-2 ' : 'mb-3 ') +
        (addStyle ? addStyle : '')
      }
    >
      <label
        class="text-sm font-light text-slate-500 mb-1 dark:text-slate-300"
        for="input"
      >
        {label}
      </label>
      <input
        autoComplete="off"
        name={name}
        type={inputType}
        class="px-5 py-3 w-full outline-none rounded-md font-light dark:bg-deepBlue dark:text-slate-200 focus:border-logoOrange  duration-100 focus:border-b-2 shadow-md placeholder:text-[12px] sm:placeholder:text-sm"
        placeholder={placeholder}
      />
      {type === 'password' && (
        <span
          class={
            'absolute text-slate-400  top-9 rtl:space-x-reverse rtl:left-3 ltr:right-3'
          }
          onClick={handleClick}
        >
          <Icon icon={inputType !== 'password' ? eye : eyeOff} size={20} />
        </span>
      )}
      {validation && (
        <div class="text-xs px-2 mt-1 mb-2 text-red-400 ">{t(validation)}</div>
      )}
    </div>
  );
}
