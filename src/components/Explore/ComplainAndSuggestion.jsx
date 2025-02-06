import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import TextArea from '../general-ui/TextArea';
import Input from '../general-ui/Input';
import ImagesUpload from '../general-ui/ImagesUpload';
import OneImageUpload from '../general-ui/OneImageUpload';

export default function ComplainAndSuggestion() {
  const { t } = useTranslation();

  const textareaRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [option, setOption] = useState('complaint');

  return (
    <div className="w-full flex flex-col space-y-3 px-4 py-6 bg-white dark:text-white dark:bg-elementBlack rounded-md border border-gray-300 shadow-sm dark:border-darkBorder">
      <div className="flex flex-row space-x-8 rtl:space-x-reverse text-sm font-light">
        <div>{t('i_have')}...</div>
        <div className="flex space-x-4 rtl:space-x-reverse items-center">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <button
              type="button"
              className="aspect-square w-4 rounded-full border border-logoOrange bg-white dark:bg-black p-[2px] flex justify-center items-center"
              onClick={() => setOption('complaint')}
            >
              {option === 'complaint' && (
                <div className="w-full h-full rounded-full bg-logoOrange"></div>
              )}
            </button>
            <span>{t('complaint')}</span>
          </div>
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <button
              type="button"
              className="aspect-square w-4 rounded-full border border-logoOrange bg-white dark:bg-black p-[2px] flex justify-center items-center"
              onClick={() => setOption('suggestion')}
            >
              {option === 'suggestion' && (
                <div className="w-full h-full rounded-full bg-logoOrange"></div>
              )}
            </button>
            <span>{t('suggestion')}</span>
          </div>
        </div>
      </div>

      <Input
        inputClass="h-9 outline-none -none border bg-white dark:bg-elementBlack border-gray-300 dark:border-darkBorder p-1 focus:p-2 rounded-md mt-2 w-full hover:bg-elementLightGray dark:hover:bg-elementGray transition-all duration-300"
        label={t('subject')}
      />

      <TextArea
        ref={textareaRef}
        inputClass="dark:bg-elementBlack hover:bg-gray-100 dark:hover:bg-elementGray border border-gray-300 dark:border-darkBorder duration-300 rounded-md p-2 focus:p-3 font-light transition-all mt-2"
        maxLength={1024}
        maxRows={12}
        rows={3}
        label={t('details')}
        maxHeight={120}
      />

      <OneImageUpload setSelectedImage={setSelectedImage} />

      <div className="w-full flex justify-end">
        <button className="w-fit p-2 font-light text-sm text-white bg-logoOrange rounded-md">
          {t('send')}
        </button>
      </div>
    </div>
  );
}
