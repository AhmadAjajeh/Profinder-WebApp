import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { isEqual, isNumber } from 'lodash';

import { MdCreate } from 'react-icons/md';

import Input from '../general-ui/Input';
import TextArea from '../general-ui/TextArea';
import { range } from '../../util/validation';
import TopicsInput from '../general-ui/TopicsInput';
import { useMutation } from '@tanstack/react-query';
import { createProjectMutation } from '../../http/home';
import { alertActions } from '../../store/alertSlice';
import { eventActions } from '../../store/dataSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';
import useErrorHandler from '../../hooks/useErrorHandler';

const initialValidation = {
  title: null,
  description: null,
  topics: null,
  budget: null,
  working_interval: null,
};

export default function NewProject() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleErorr = useErrorHandler();

  const descriptionRef = useRef(null);
  const formRef = useRef(null);
  const [topics, setTopics] = useState([]);

  const [validation, setValidation] = useState(initialValidation);

  const { mutate: createProject, isLoading } = useMutation({
    mutationFn: createProjectMutation,
    onSuccess: ({ data }) => {
      dispatch(
        alertActions.alert({
          messages: [data.message],
        })
      );
      dispatch(eventActions.set({ data: data.post, type: 'new-post' }));
      formRef.current.reset();
      setTopics([]);
    },
    onError: handleErorr,
  });

  function handleSubmission(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const { title, description, min, max, currency, working_interval } =
      Object.fromEntries(formData);

    // validation
    const formValidation = {};

    if (!range(title, 16, 128)) {
      formValidation.title = 'title_must_be_between_16_and_128_chars';
    } else {
      formValidation.title = null;
    }

    if (!range(description, 64, 4096)) {
      formValidation.description =
        'description_must_be_between_64_and_4096_chars';
    } else {
      formValidation.description = null;
    }

    if (!isNumber(+min) || !isNumber(+max)) {
      formValidation.budget = 'min_and_max_should_be_numbers';
    } else if (!range(currency, 1, 3)) {
      formValidation.budget = 'currency_should_be_between_1_and_3_chars';
    } else if (+min >= +max) {
      formValidation.budget = 'min_should_be_less_than_max';
    } else {
      formValidation.budget = null;
    }

    if (topics.length < 1) {
      formValidation.topics = 'at_least_one_topic_is_required';
    } else {
      formValidation.topics = null;
    }

    if (!isNumber(+working_interval)) {
      formValidation.working_interval = 'delivery_time_should_be_a_number';
    } else if (working_interval < 1 || working_interval > 365) {
      formValidation.working_interval =
        'delivery_time_should_be_between_1_and_365_days';
    } else {
      formValidation.working_interval = null;
    }

    setValidation(formValidation);

    if (!isEqual(formValidation, initialValidation)) return;

    createProject({
      title,
      description,
      topics,
      budget: { min, max, currency },
      working_interval,
    });
  }

  return (
    <div className="flex flex-col space-y-3 h-full w-full">
      <div className="px-6 py-4 bg-logoOrange rounded-t-md">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <MdCreate className="h-6 w-6 text-white" />
          <h1 className="text-xl font-semibold text-white">
            {t('create_new_freelance_project')}
          </h1>
        </div>
      </div>

      <form
        ref={formRef}
        onSubmit={handleSubmission}
        className="h-full flex flex-col justify-between px-4 pb-4"
      >
        <div className="flex flex-col space-y-4 w-full">
          <Input
            name="title"
            label="title"
            className="w-full  p-2 text-sm bg-inherit border border-gray-300 dark:border-darkBorder rounded-md focus:bg-gray-50 dark:focus:bg-elementGray transition-all font-light mt-2"
            validation={validation.title}
            placeholder={t('project_title_placeholder')}
          />
          <TextArea
            ref={descriptionRef}
            label="description"
            className="w-full p-2 mt-2 text-sm bg-inherit border border-gray-300 dark:border-darkBorder rounded-md focus:bg-gray-50 dark:focus:bg-elementGray transition-all font-light "
            name="description"
            rows={4}
            validation={validation.description}
            placeholder={t('project_description_placeholder')}
          />
          <div className="mb-6">
            <TopicsInput
              topics={topics}
              setTopics={setTopics}
              validation={validation.topics}
            />
          </div>

          <div>
            <div className="w-full flex flex-row space-x-3 rtl:space-x-reverse">
              <div className="font-light text-sm mt-1">{t('budget')}</div>
              <div className="px-2 flex flex-row space-x-2 rtl:space-x-reverse">
                <div className=" flex flex-col space-x-1 rtl:space-x-reverse">
                  <Input
                    name="min"
                    placeholder={t('from')}
                    className="w-16 mt-0.5 text-sm rounded-md bg-inherit border border-gray-300 dark:border-darkBorder p-0.5 font-light"
                  />
                </div>
                <div className=" flex flex-row space-x-1 rtl:space-x-reverse">
                  <Input
                    name="max"
                    placeholder={t('to')}
                    className="w-16 mt-0.5 text-sm rounded-md bg-inherit border border-gray-300 dark:border-darkBorder p-0.5 font-light"
                  />
                </div>
                <div className=" flex flex-row space-x-1 rtl:space-x-reverse">
                  <Input
                    name="currency"
                    placeholder={t('currency')}
                    maxLength={3}
                    className="w-16 mt-0.5 text-sm rounded-md bg-inherit border border-gray-300 dark:border-darkBorder p-0.5 font-light"
                  />
                </div>
              </div>
            </div>
            {validation.budget && (
              <div className="text-red-500 text-sm font-light mt-1">
                {t(validation.budget)}
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <div
              className={
                'flex flex-row space-x-3 items-center rtl:space-x-reverse ' +
                (validation.working_interval ? 'mb-0' : 'mb-5')
              }
            >
              <div className="font-light text-sm">{t('delivery_time')}</div>
              <Input
                name="working_interval"
                className={
                  'bg-inherit border border-gray-300 dark:border-darkBorder rounded-md p-1 w-24 text-sm font-light'
                }
                placeholder={t('project_delivery_days_placeholder')}
              />
            </div>
            {validation.working_interval && (
              <div className="text-red-500 text-sm font-light mt-1">
                {t(validation.working_interval)}
              </div>
            )}
          </div>
        </div>

        <div className="absolute bottom-2 rtl:left-2 ltr:right-2 w-full flex flex-row justify-end">
          <button className="bg-logoOrange text-white font-light w-fit px-5 py-2 rounded-md">
            {isLoading ? (
              <FaSpinner className="w-5 h-5 animate-spin text-white mx-auto" />
            ) : (
              <span>{t('publish')}</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
