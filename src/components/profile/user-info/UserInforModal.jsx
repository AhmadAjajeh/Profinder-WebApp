import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaEnvelope, FaMap, FaGithub, FaLinkedin } from 'react-icons/fa';

import Modal from '../../general-ui/Modal';
import FormInput from '../FormInput';

function UserInfoModal({ handleClose }) {
  const { t } = useTranslation();

  function handleChange() {}
  function handleSubmit() {}

  const [formData, setFormData] = useState({
    fullname: '',
    bio: '',
    address: '',
    linkedin: '',
    github: '',
  });

  function updateFormData(e) {
    const { name, value } = e.target;
    setFormData((state) => ({
      ...state,
      [name]: value,
    }));
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
      <div className="w-[330px] md:w-auto max-w-2xl mx-auto">
        <div className="bg-white dark:bg-elementBlack  max-h-[650px] overflow-y-scroll rounded-2xl shadow-xl p-8">
          <h1 className="text-xl font-bold text-logoOrange text-center mb-8">
            {t('professional_profile')}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <FormInput
              type="text"
              id="text"
              name="fullname"
              placeholder={t('name_placeholder')}
              label={t('full_name')}
              value={formData.fullname}
              handleChange={updateFormData}
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
            </div>

            <FormInput
              handleChange={updateFormData}
              type="address"
              id="address"
              name="address"
              icon={<FaMap className="text-gray-500" />}
              placeholder={t('location_placeholder')}
              label={t('address')}
              value={formData.address}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                handleChange={updateFormData}
                type="url"
                id="linkedin"
                name="linkedin"
                icon={<FaLinkedin className="text-gray-500" />}
                placeholder={t('linkedin_placeholder')}
                label={t('linked_profile')}
                value={formData.linkedin}
              />

              <FormInput
                handleChange={updateFormData}
                type="url"
                id="github"
                name="github"
                icon={<FaGithub className="text-gray-500" />}
                placeholder={t('github_placeholder')}
                label={t('github_profile')}
                value={formData.github}
              />
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
