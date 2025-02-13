import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AddImageIcon, XIcon } from './IconsSvg';

export default function OneImageUpload({
  setSelectedImage,
  label = 'upload_an_image',
}) {
  const { t } = useTranslation();
  const fileInputRef = useRef(null);
  const [image, setImage] = useState('');

  const handleImagesChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setSelectedImage(file);
    setImage((state) => {
      URL.revokeObjectURL(state);
      return preview;
    });
  };

  const handleRemoveImage = (idx) => {
    setSelectedImage((state) => {
      const updatedImages = state.filter((_img, index) => index !== idx);
      return updatedImages;
    });
    setImage((state) => {
      URL.revokeObjectURL(state[idx]);
      return state.filter((_imageSrc, index) => index !== idx);
    });
  };

  return (
    <>
      <div className="text-sm font-light flex flex-col">
        {/* label */}
        {label && <div className="mb-2">{t(label)}</div>}

        {/* Hidden file input */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImagesChange}
          ref={fileInputRef}
          className="hidden "
        />

        {/* Custom "Choose Files" button */}
        <div className="w-full h-32 bg-gray-100 dark:bg-elementGray rounded-md border border-gray-300 dark:border-darkBorder overflow-hidden">
          {image !== '' ? (
            <div className="relative w-full h-full">
              <button
                onClick={() => {
                  setImage('');
                  setSelectedImage('');
                }}
                className="absolute top-2 rtl:right-2 ltr:left-2 text-white p-2 bg-gray-600 rounded-full z-10 hover:bg-gray-700 transition-colors "
              >
                <XIcon style="w-3" />
              </button>

              <div className="w-full h-full overflow-auto">
                <img
                  src={image}
                  className="object-cover w-full min-h-full rounded-md"
                  alt="Uploaded preview"
                />
              </div>
            </div>
          ) : (
            <button
              className="flex w-full h-full flex-col items-center justify-center p-4"
              onClick={() => fileInputRef?.current.click()}
            >
              <AddImageIcon style="w-10 text-gray-700 dark:text-gray-300 mb-1" />
              <div className="font-semibold text-md text-gray-700 dark:text-gray-300">
                {t('select_image')}
              </div>
            </button>
          )}
        </div>
      </div>
    </>
  );
}
