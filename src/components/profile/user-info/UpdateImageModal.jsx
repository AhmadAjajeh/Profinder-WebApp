import { useTranslation } from 'react-i18next';
import Modal from '../../general-ui/Modal';
import OneImageUpload from '../../general-ui/OneImageUpload';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { updateUserMutation } from '../../../http/user';
import { queryClient } from '../../../http/auth';
import { useNavigate, useParams } from 'react-router-dom';
import { errorHandlingFunction, setUser } from '../../../util/http';
import { useDispatch } from 'react-redux';
import { errorHandlingActions } from '../../../store/errorHandlingSlice';
import { alertActions } from '../../../store/alertSlice';
import { authActions } from '../../../store/authSlice';

export function UpdateImageModel({ image, handleClose, label, imageField }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const [selectedImage, setSelectedImage] = useState(null);

  const { mutate } = useMutation({
    mutationFn: updateUserMutation,
    onSuccess: (response) => {
      dispatch(
        alertActions.alert({
          messages: [response.message],
        })
      );

      setUser(response.user);
      dispatch(authActions.updateUser(response.user));

      queryClient.invalidateQueries({ queryKey: ['visit-user', id] });
      queryClient.invalidateQueries({ queryKey: ['profile', id] });
      handleClose();
    },
    onError: errorHandlingFunction(dispatch, navigate, errorHandlingActions),
  });

  function deleteImage() {
    const formData = new FormData();
    formData.append(imageField, '');

    mutate(formData);
  }

  function updateImage() {
    const formData = new FormData();
    formData.append(imageField, selectedImage);

    mutate(formData);
  }

  return (
    <Modal
      lockScroll={true}
      onClose={handleClose}
      bgDiv={true}
      className="inset-0 rounded-md dark:bg-elementBlack "
      animation={{
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1 },
      }}
    >
      <div className="w-[300px] sm:w-[440px] bg-white dark:bg-elementBlack p-2 rounded dark:text-white text-[14px]">
        <div>
          {/* label */}
          <div className="font-light text-sm mb-2">{t(label)}</div>

          {/* image upload */}
          <div className="mb-2">
            <OneImageUpload label={null} setSelectedImage={setSelectedImage} />
          </div>

          {/* update option */}
          <button
            onClick={updateImage}
            className="w-full text-white rounded-md font-extralight p-1 bg-logoOrange mb-2"
            disabled={!selectedImage}
          >
            {t('update')}
          </button>

          {/* remove existent one  */}
          {image && (
            <button
              onClick={deleteImage}
              className="bg-gray-700 dark:bg-elementGray text-white p-1 rounded-md font-extralight w-full mb-2"
            >
              {t('remove_existent_image')}
            </button>
          )}

          {/* cancel */}
          <button
            onClick={handleClose}
            className="w-full text-white rounded-md font-light p-1 bg-gray-400"
          >
            {t('cancel')}
          </button>
        </div>
      </div>
    </Modal>
  );
}
