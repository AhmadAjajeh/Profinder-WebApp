import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@tanstack/react-query';

import useErrorHandler from '../../../hooks/useErrorHandler';
import Modal from '../../general-ui/Modal';
import queryClient from '../../../http/queryClient';
import Input from '../../form-components/Input';
import TextArea from '../../form-components/TextArea';
import DatePicker from '../../form-components/DatePicker';
import FileUpload from '../../form-components/FileUpload';
import {
  cerateCertificationMutation,
  updateCertificationMutation,
} from '../../../http/profile';
import { values } from 'lodash';

export default function CertificationForm({ onClose, certification }) {
  const { t } = useTranslation();
  const handleError = useErrorHandler();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    watch,
  } = useForm({
    defaultValues: certification || {
      title: '',
      organization: '',
      description: '',
      issue_date: null,
      expiration_date: null,
      certification_image: null,
    },
    mode: 'onChange',
  });

  const { mutateAsync: createCertification } = useMutation({
    mutationFn: cerateCertificationMutation,
    onSuccess: () => {
      queryClient.invalidateQueries(['visit-user']);
      onClose();
    },
    onError: handleError,
  });

  const { mutateAsync: updateCertification } = useMutation({
    mutationFn: updateCertificationMutation,
    onSuccess: () => {
      queryClient.invalidateQueries(['visit-user']);
      onClose();
    },
    onError: handleError,
  });

  const onSubmit = async (data) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (key !== 'certification_image') {
        const value = data[key] === undefined ? null : data[key];
        formData.append(key, value);
      }
    });

    if (data.certification_image?.[0]) {
      formData.append('certification_image', data.certification_image[0]);
    }
    if (certification)
      await updateCertification({ formData, id: certification._id });
    else await createCertification(formData);
  };

  return (
    <Modal
      onClose={onClose}
      bgDiv={true}
      lockScroll={true}
      className="w-[340px] sm:w-[400px] md:w-full inset-0 max-w-2xl mx-auto bg-white dark:bg-elementBlack rounded-lg shadow-xl"
      animation={{
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1 },
      }}
    >
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-logoOrange w-fit mx-auto mb-4">
          {t('add_certification')}
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6  max-h-[600px] overflow-y-auto px-2"
        >
          {/* Title Input */}
          <Input
            label={t('certification_title')}
            {...register('title', {
              required: t('this_field_is_required'),
              minLength: { value: 3, message: t('must_be_at_least_3_chars') },
              maxLength: { value: 255, message: t('must_be_less_than_255') },
            })}
            error={errors.title?.message}
          />

          {/* Organization Input */}
          <Input
            label={t('organization')}
            {...register('organization', {
              required: t('this_field_is_required'),
              minLength: { value: 3, message: t('must_be_at_least_3_chars') },
              maxLength: { value: 255, message: t('must_be_less_than_255') },
            })}
            error={errors.organization?.message}
          />

          {/* Description */}
          <TextArea
            label={t('description')}
            {...register('description', {
              minLength: { value: 24, message: t('must_be_at_least_25_chars') },
              maxLength: {
                value: 1000,
                message: t('must_be_less_than_1000_chars'),
              },
            })}
            rows={4}
            error={errors.description?.message}
          />

          {/* Issue & Expiration Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Controller
              name="issue_date"
              control={control}
              rules={{ required: t('issue_date_is_required') }}
              render={({ field }) => (
                <DatePicker
                  label={t('issue_date')}
                  {...field}
                  error={errors.issue_date?.message}
                />
              )}
            />

            <Controller
              name="expiration_date"
              control={control}
              rules={{
                validate: (value) => {
                  const issueDate = watch('issue_date');
                  if (
                    value &&
                    issueDate &&
                    new Date(value) <= new Date(issueDate)
                  ) {
                    return t(
                      'expiration_date_must_be_greater_than_the_issue_date'
                    );
                  }
                  return true;
                },
              }}
              render={({ field }) => (
                <DatePicker
                  label={t('expiration_date')}
                  {...field}
                  error={errors.expiration_date?.message}
                />
              )}
            />
          </div>

          {/* File Upload */}
          <Controller
            name="certification_image"
            control={control}
            render={({ field: { onChange, value } }) => (
              <FileUpload
                onChange={onChange}
                value={value}
                error={errors.certification_image?.message}
              />
            )}
          />

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              {t('cancel')}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-white bg-logoOrange rounded-md hover:bg-orange-400 disabled:opacity-50"
            >
              {isSubmitting ? t('saving') : t('save')}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
