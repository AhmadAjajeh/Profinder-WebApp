import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Modal from '../../general-ui/Modal';
import FormInput from '../FormInput';
import { useMutation } from '@tanstack/react-query';
import { updateProfileInfoMutation } from '../../../http/profile';
import queryClient from '../../../http/queryClient';
import useErrorHandler from '../../../hooks/useErrorHandler';
import { range } from '../../../util/validation';

function UserInfoModal({ handleClose, fullname, bio }) {
  const { t } = useTranslation();
  const handleError = useErrorHandler();

  const [formData, setFormData] = useState({
    full_name: fullname,
    bio,
  });
  const [validation, setValidation] = useState({
    full_name: null,
    bio: null,
  });

  const { mutate } = useMutation({
    mutationFn: updateProfileInfoMutation,
    onSuccess: () => {
      queryClient.invalidateQueries(['visit-user']);
      handleClose();
    },
    onError: handleError,
  });

  function updateFormData(e) {
    const { name, value } = e.target;
    setFormData((state) => ({
      ...state,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const { full_name, bio } = formData;
    const newValidation = {};
    if (!range(full_name, 3, 50)) {
      newValidation.full_name = 'fullname_should_be_between_3_and_50';
    }
    if (!range(bio, 0, 2048)) {
      newValidation.bio = 'bio_should_be_between_0_and_2048';
    }

    if (Object.keys(newValidation).length !== 0) {
      setValidation(newValidation);
      return;
    }

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
      <div className="w-[330px] md:w-[500px] mx-auto">
        <div className="bg-white dark:bg-elementBlack  max-h-[650px] overflow-y-scroll rounded-2xl shadow-xl p-8">
          <h1 className="text-xl font-bold text-logoOrange text-center mb-8">
            {t('professional_profile')}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <FormInput
              type="text"
              id="text"
              name="full_name"
              placeholder={t('name_placeholder')}
              label={t('full_name')}
              value={formData.full_name}
              handleChange={updateFormData}
              validation={validation.full_name}
            />

            <div>
              <label
                htmlFor="bio"
                className="mb-1 block text-sm font-medium text-gray-700 dark:text-white"
              >
                {t('bio')}
              </label>
              <textarea
                name="bio"
                id="bio"
                rows={3}
                onChange={updateFormData}
                className="block w-full rounded-md border-gray-300 shadow-sm  bg-gray-100 dark:bg-elementGray dark:text-white px-4 py-2 placeholder:text-[12px] font-light text-sm"
                placeholder={t('summary_placeholder')}
                value={formData.bio}
              />
              {validation.bio && (
                <div className="text-red-500 text-sm font-light">
                  {t(validation.bio)}
                </div>
              )}
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-logoOrange hover:shadow-md focus:outline-none transition-all"
              >
                {t('save_profile')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
}

export default UserInfoModal;
