import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';
import { getBaseUrl } from '../../util/http';

const FileUpload = ({ className, onChange, value, error }) => {
  const [preview, setPreview] = useState(null);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      onChange(acceptedFiles);
      setPreview(URL.createObjectURL(acceptedFiles[0]));
    },
    accept: 'image/*',
    multiple: false,
  });
  const { t } = useTranslation();

  useEffect(() => {
    if (typeof value === 'string') {
      setPreview(getBaseUrl() + value);
    } else if (value?.[0]) {
      setPreview(URL.createObjectURL(value[0]));
    }
  }, [value]);

  return (
    <div
      className={twMerge('border border-gray-300 p-4 rounded-lg', className)}
    >
      <div
        {...getRootProps()}
        className="border-2 border-dashed p-4 text-center cursor-pointer bg-elementLightGray hover:bg-elementDarkerLightGray hover:dark:bg-gray-700 dark:bg-elementGray"
      >
        <input {...getInputProps()} />
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-32 object-cover rounded-lg"
          />
        ) : (
          <p className="text-gray-500">
            {t('drag_and_drop_or_click_to_select_a_file')}
          </p>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default FileUpload;
