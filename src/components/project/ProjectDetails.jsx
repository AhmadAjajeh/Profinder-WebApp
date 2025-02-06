import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { FaSpinner, FaFileAlt, FaMoneyBillWave } from 'react-icons/fa';
import { MdTitle } from 'react-icons/md';
import { HiOutlineClock, HiOutlineTag } from 'react-icons/hi';
import { ClockIcon } from '../general-ui/IconsSvg';
import { AiOutlineUser } from 'react-icons/ai';

import MixedText from '../general-ui/MixedText';
import JobHunt from '../general-ui/JobHunt';
import Tag from '../general-ui/Tag';

import { formatDisplayDate, timeAgo } from '../../util/date';
import { errorHandlingFunction, getBaseUrl } from '../../util/http';
import { getDirection } from '../../util/lang';

import { errorHandlingActions } from '../../store/errorHandlingSlice';
import { getOneProjectQuery, projectApplyMutation } from '../../http/home';

export default function ProjectDetails({ projectId }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [applied, setApplied] = useState(false);
  const [applyCount, setApplyCount] = useState(null);

  let timer;

  const { isFetching } = useQuery({
    queryKey: ['project-details', projectId],
    queryFn: () => getOneProjectQuery({ id: projectId }),
    onSuccess: (data) => {
      setProject(data.project);
      setApplied(data.project.applied);
      setApplyCount(data.project.applications_count);
    },

    onError: (error) => {
      const messages = error.info?.message || [error.message];
      dispatch(
        errorHandlingActions.throwError({
          code: error.code,
          messages,
        })
      );
      if (error.code === 403) navigate('/auth/login');
    },
    enabled: projectId !== null,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!projectId) setProject(null);
  });

  const { mutate } = useMutation({
    mutationFn: projectApplyMutation,
    onError: errorHandlingFunction(dispatch, errorHandlingActions, navigate),
    onSuccess: () => {
      setApplyCount((state) => (applied ? state - 1 : state + 1));
      setApplied((state) => !state);
    },
  });

  function handleApply() {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      mutate({ id: project._id, apply: !applied });
    }, 500);
  }

  return (
    <div className="flex flex-col h-full w-full">
      {isFetching && (
        <div className="w-full h-full flex  items-center justify-center">
          <FaSpinner className="w-10 h-10 animate-spin text-logoOrange" />
        </div>
      )}

      {!project && !isFetching && (
        <div className="w-full h-full flex flex-col justify-center items-center">
          <div className="uppercase text-center">
            <JobHunt className="w-[350px] h-[350px]" />
          </div>
          <div className="uppercase font-semibold text-[16px]">
            {t('select_a_project_to_view_its_details')}
          </div>
        </div>
      )}

      {/* company name, image and date  */}
      {project && !isFetching && (
        <>
          <div className="flex flex-row space-x-1 rtl:space-x-reverse mb-2">
            <div className="w-14 h-14">
              {project.publisher_image_url &&
              project.publisher_image_url !== '' ? (
                <img
                  src={getBaseUrl() + project.publisher_image_url}
                  className="w-12 h-12 rounded-full"
                />
              ) : (
                <div className="bg-gray-300 dark:bg-gray-500 w-12 h-12 flex items-center justify-center rounded-full overflow-hidden">
                  <AiOutlineUser style="w-9 h-9 text-gray-500 dark:text-gray-700 " />
                </div>
              )}
            </div>
            <div className="mt-2">
              <div className="text-sm md:text-md font-normal">
                {project.publisher_name}
              </div>
              <div className="flex flex-row items-center text-slate-500 dark:text-slate-300 space-x-0.5 rtl:space-x-reverse text-[10px] ">
                <div>
                  <ClockIcon style="w-2" />
                </div>
                <div>{timeAgo(project.created_at)}</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-5 overflow-y-scroll h-full text-xs lg:text-sm  p-2 border shadow-sm  border-gray-300 dark:border-darkBorder">
            {/* title */}
            <div className="flex flex-col space-y-1">
              <div className="flex flex-row items-center  space-x-3 rtl:space-x-reverse">
                <MdTitle className="w-5 h-5 text-logoOrange" />
                <h3 className="font-semibold ">{t('title')} :</h3>
              </div>
              <MixedText className="font-normal " text={project.title} />
            </div>

            {/* description */}
            <div className="flex flex-col space-y-1">
              <div className="flex flex-row items-center  space-x-3 rtl:space-x-reverse">
                <FaFileAlt className="w-5 h-5 text-logoOrange" />
                <h3 className="font-semibold ">{t('description')} :</h3>
              </div>
              <MixedText
                maxlines={100}
                className="font-normal "
                text={project.description}
              />
            </div>

            {/* salary */}
            <div className="flex flex-col space-y-1 rtl:space-x-reverse">
              <div className="flex flex-row items-center  space-x-3 rtl:space-x-reverse min-w-fit">
                <FaMoneyBillWave className="w-5 h-5 text-logoOrange" />
                <h3 className="font-semibold ">{t('budget')} :</h3>
              </div>

              <div className="flex flex-row w-full space-x-2 rtl:space-x-reverse">
                <div className="flex flex-row space-x-1 items-center rtl:space-x-reverse">
                  <span className=" font-light">{t('from')}</span>
                  <Tag style="" text={project.budget.min || 'NA'} />
                </div>
                <div className="flex flex-row space-x-1 items-center rtl:space-x-reverse">
                  <span className=" font-light">{t('to')}</span>
                  <Tag style="" text={project.budget.max || 'NA'} />
                </div>
                <div className="flex flex-row space-x-1 items-center rtl:space-x-reverse">
                  <span className=" font-light">{t('currency')}</span>
                  <Tag style="" text={project.budget.currency || 'NA'} />
                </div>
              </div>
            </div>

            {/* topics */}
            <div className="flex flex-col space-y-1 rtl:space-x-reverse">
              <div className="flex flex-row items-center  space-x-3 rtl:space-x-reverse min-w-fit">
                <HiOutlineTag className="w-5 h-5 text-logoOrange" />
                <h3 className="font-semibold ">{t('topics')} :</h3>
              </div>
              {project.topics.length > 0 && (
                <div className="flex flex-wrap gap-3 rtl:space-x-reverse">
                  {project.topics.map((tp) => (
                    <Tag text={tp} />
                  ))}
                </div>
              )}
            </div>

            {/* time to deliver */}
            <div className="flex flex-row space-x-3 items-center rtl:space-x-reverse">
              <div className="flex flex-row items-center  space-x-3 rtl:space-x-reverse min-w-fit">
                <HiOutlineClock className="w-5 h-5 text-logoOrange" />
                <h3 className="font-semibold ">{t('delivery_time')} :</h3>
              </div>
              <Tag
                text={
                  project.working_interval +
                  (getDirection() === 'rtl' ? ' أيام' : ' days')
                }
              />
            </div>
          </div>

          {/* others */}
          <div className="w-full flex flex-row justify-between h-16 my-auto pt-4">
            <div className="w-1/3 grid grid-rows-2 gap-1 items-center justify-center text-xs sm:text-sm space-y-1 text-center">
              <div className="text-logoOrange row-span-1">{t('closes_at')}</div>
              <div className="text-xs ow-span-1">
                {project.closes_at
                  ? formatDisplayDate(project.closes_at)
                  : 'NA'}
              </div>
            </div>

            <div className="w-1/3 grid rows-cols-2 gap-1 items-center justify-center text-xs sm:text-sm space-y-1 text-center">
              <div className="text-logoOrange row-span-1">
                {t('applications_count')}
              </div>
              <div className="text-xs row-span-1">
                {applyCount !== null ? applyCount : 'N/A'}
              </div>
            </div>

            <button
              onClick={handleApply}
              className="w-1/3 bg-logoOrange text-white rounded-md shadow-md"
            >
              {applied ? t('cancel_apply') : t('apply')}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
