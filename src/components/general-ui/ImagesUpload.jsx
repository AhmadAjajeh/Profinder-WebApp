import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

export default function ImagesUpload({ selectedImages, setSelectedImages }) {
  const { t } = useTranslation();
  const fileInputRef = useRef(null);
  const [imagesValidation, setImagesValidation] = useState(null);
  const [imagesPreviews, setImagesPreviews] = useState([]);

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 5) {
      setImagesValidation("no_more_than_5_images");
      return;
    }
    setImagesValidation(null);

    const previews = files.map((file) => URL.createObjectURL(file));

    setSelectedImages(files);
    setImagesPreviews((state) => {
      state.forEach((imageSrc) => URL.revokeObjectURL(imageSrc));
      return previews;
    });
  };

  const handleRemoveImage = (idx) => {
    setSelectedImages((state) => {
      const updatedImages = state.filter((_img, index) => index !== idx);
      return updatedImages;
    });
    setImagesPreviews((state) => {
      URL.revokeObjectURL(state[idx]);
      return state.filter((_imageSrc, index) => index !== idx);
    });
  };

  return (
    <>
      <div className="text-sm font-light flex flex-row items-center space-x-2 rtl:space-x-reverse">
        {/* label */}
        <div>{t("upload_images")}</div>

        {/* Hidden file input */}
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImagesChange}
          ref={fileInputRef}
          className="hidden"
        />

        {/* Custom "Choose Files" button */}
        <button
          type="button"
          onClick={() => fileInputRef.current.click()}
          className="p-2 bg-logoOrange text-white rounded-lg hover:bg-orange-400 transition-colors"
        >
          {t("choose")}
        </button>
      </div>
      {/* Display image previews */}
      <div className="mt-2 grid grid-cols-5 gap-2">
        {imagesPreviews.length > 0 &&
          imagesPreviews.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={image}
                alt="Selected preview"
                className="w-20 h-20 object-cover rounded-md"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
              >
                &times;
              </button>
            </div>
          ))}
      </div>
      {/* images validation */}
      {imagesValidation && (
        <div className="text-red-500 text-sm font-light mt-1">
          {t(imagesValidation)}
        </div>
      )}
    </>
  );
}
