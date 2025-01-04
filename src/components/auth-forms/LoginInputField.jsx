import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Icon from 'react-icons-kit';
import { eye } from 'react-icons-kit/feather/eye';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { getDirection } from '../../util/lang';

export default function InputField({ name, type, placeholder, validation }) {
  const { t } = useTranslation();
  const [inputType, setInputType] = useState(type);

  const handleClick = () => {
    setInputType((state) => {
      return state === 'password' ? 'text' : 'password';
    });
  };

  return (
    <div class={'relative ' + (validation ? 'mb-1' : 'mb-5')}>
      <input
        name={name}
        type={inputType}
        class="px-5 py-4 w-full outline-none rounded-md font-light  dark:bg-deepBlue dark:text-slate-200 focus:border-logoOrange  duration-100 focus:border-b-2 shadow-md"
        placeholder={placeholder}
        autoComplete="off"
      />
      {type === 'password' && (
        <span
          class={'absolute text-slate-400  top-4 rtl:left-3 ltr:right-3'}
          onClick={handleClick}
        >
          <Icon icon={inputType !== 'password' ? eye : eyeOff} size={20} />
        </span>
      )}
      {validation && (
        <div class="text-xs px-2 mt-1 mb-2 text-red-400">{t(validation)}</div>
      )}
    </div>
  );
}
