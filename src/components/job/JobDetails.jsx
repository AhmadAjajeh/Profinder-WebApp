import {
  FaHeading,
  FaFileAlt,
  FaListAlt,
  FaMoneyBillWave,
  FaMapMarkerAlt,
  FaLanguage,
  FaBriefcase,
} from 'react-icons/fa';

import { formatDisplayDate, timeAgo } from '../../util/date';
import { errorHandlingFunction, getBaseUrl } from '../../util/http';
import { ClockIcon, SingleCompany } from '../general-ui/IconsSvg';
import { useTranslation } from 'react-i18next';
import MixedText from '../general-ui/MixedText';
import Tag from '../general-ui/Tag';
import JobHunt from '../general-ui/JobHunt';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getOneJobQuery, jobApplyMutation } from '../../http/home';
import { errorHandlingActions } from '../../store/errorHandlingSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function JobDetails({ jobId }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [applied, setApplied] = useState(false);
  const [applyCount, setApplyCount] = useState(null);

  let timer;

  useQuery({
    queryKey: ['jobs-details', jobId],
    queryFn: () => getOneJobQuery(jobId),
    onSuccess: (data) => {
      setJob(data.job);
      setApplied(data.job.applied);
      setApplyCount(data.job.applications_count);
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
    enabled: jobId !== null,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!jobId) setJob(null);
  });

  const { mutate } = useMutation({
    mutationFn: jobApplyMutation,
    onError: errorHandlingFunction(dispatch, errorHandlingActions, navigate),
    onSuccess: () => {
      setApplyCount((state) => (applied ? state - 1 : state + 1));
      setApplied((state) => !state);
    },
  });

  function handleApply() {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      mutate({ jobId: job._id, apply: !applied });
    }, 500);
  }

  return (
    <div className="bg-white dark:bg-elementBlack w-[340px] sm:w-[400px] lg:w-full p-4 rounded-md border border-gray-300 dark:border-darkBorder shadow-sm   dark:text-white h-[630px] flex flex-col">
      {!job && (
        <div className="w-full h-full flex flex-col justify-center items-center">
          <div className="uppercase text-center">
            <JobHunt className="w-[350px] h-[350px]" />
          </div>
          <div className="uppercase font-semibold text-[16px]">
            {t('select_a_job_to_see_its_details')}
          </div>
        </div>
      )}

      {/* company name, image and date  */}
      {job && (
        <>
          <div className="flex flex-row space-x-1 rtl:space-x-reverse mb-2">
            <div className="w-14 h-14">
              {job.company.image_url && job.company.image_url !== '' ? (
                <img
                  src={getBaseUrl() + job.company.image_url}
                  className="w-12 h-12 rounded-full"
                />
              ) : (
                <div className="bg-gray-300 dark:bg-gray-500 w-12 h-12 flex items-center justify-center rounded-full overflow-hidden">
                  <SingleCompany style="w-9 h-9 text-gray-500 dark:text-gray-700 " />
                </div>
              )}
            </div>
            <div className="mt-2">
              <div className="text-sm md:text-md font-normal">
                {job.company.name}
              </div>
              <div className="flex flex-row items-center text-slate-500 dark:text-slate-300 space-x-0.5 rtl:space-x-reverse text-[10px] ">
                <div>
                  <ClockIcon style="w-2" />
                </div>
                <div>{timeAgo(job.created_at)}</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-5 overflow-y-scroll h-full text-xs lg:text-sm  p-2 border shadow-sm  border-gray-300 dark:border-darkBorder">
            {/* title */}
            <div className="flex flex-col space-y-1">
              <div className="flex flex-row items-center  space-x-3 rtl:space-x-reverse">
                <FaBriefcase className="w-5 h-5 text-logoOrange" />
                <h3 className="font-semibold ">{t('title')} :</h3>
              </div>
              <MixedText className="font-normal " text={job.title} />
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
                text={job.description}
              />
            </div>

            {/* requirements */}
            <div className="flex flex-col space-y-1">
              <div className="flex flex-row items-center  space-x-3 rtl:space-x-reverse">
                <FaListAlt className="w-5 h-5 text-logoOrange" />
                <h3 className="font-semibold ">{t('requirements')} :</h3>
              </div>
              <MixedText
                maxlines={100}
                className="font-normal "
                text={job.requirements}
              />
            </div>
            {/* location */}
            <div className="flex flex-col space-y-1">
              <div className="flex flex-row items-center  space-x-3 rtl:space-x-reverse">
                <FaMapMarkerAlt className="w-5 h-5 text-logoOrange" />
                <h3 className="font-semibold ">{t('location')} :</h3>
              </div>
              <MixedText className="font-normal " text={job.location} />
            </div>

            {/* salary */}
            <div className="flex flex-col space-y-1 sm:space-y-0 sm:flex-row sm:space-x-3 rtl:space-x-reverse">
              <div className="flex flex-row items-center  space-x-3 rtl:space-x-reverse min-w-fit">
                <FaMoneyBillWave className="w-5 h-5 text-logoOrange" />
                <h3 className="font-semibold ">{t('salary')} :</h3>
              </div>
              <div className="flex flex-row w-full space-x-2 rtl:space-x-reverse">
                <div className="flex flex-row space-x-1 items-center rtl:space-x-reverse">
                  <span className=" font-light">{t('from')}</span>
                  <Tag style="" text={job.salary.min || 'NA'} />
                </div>
                <div className="flex flex-row space-x-1 items-center rtl:space-x-reverse">
                  <span className=" font-light">{t('to')}</span>
                  <Tag style="" text={job.salary.max || 'NA'} />
                </div>
                <div className="flex flex-row space-x-1 items-center rtl:space-x-reverse">
                  <span className=" font-light">{t('currency')}</span>
                  <Tag style="" text={job.salary.currency || 'NA'} />
                </div>
              </div>
            </div>

            {/* languages */}
            <div className="flex flex-row space-x-3 rtl:space-x-reverse">
              <div className="flex flex-row items-center  space-x-3 rtl:space-x-reverse min-w-fit">
                <FaLanguage className="w-5 h-5 text-logoOrange" />
                <h3 className="font-semibold ">{t('language')} :</h3>
              </div>
              <div className="grid grid-cols-6 w-full gap-3">
                {job.languages.map((lng) => (
                  <Tag style="" text={lng} className="col-span-1 text-xs" />
                ))}
              </div>
            </div>

            {/* others */}
            <div className="w-full flex flex-row justify-between rtl:space-x-reverse">
              <div className=" flex flex-col space-y-1.5">
                <div className=" flex flex-col space-y-1 sm:space-y-0 sm:flex-row items-center sm:space-x-2 rtl:space-x-reverse  ">
                  <div className=" text-center ">{t('position_level')} :</div>
                  <div className="text-xs">{job.position_level || 'N/A'}</div>
                </div>

                <div className=" flex flex-col space-y-1 sm:space-y-0 sm:flex-row items-center sm:space-x-2 rtl:space-x-reverse  ">
                  <div className=" text-center">{t('job_type')} :</div>
                  <div className="text-xs">{job.job_type || 'N/A'}</div>
                </div>
              </div>
              <div className="  flex flex-col space-y-1.5">
                <div className=" flex flex-col space-y-1 sm:space-y-0 sm:flex-row items-center sm:space-x-2 rtl:space-x-reverse  ">
                  <div className="">{t('work_place')} :</div>
                  <div className="text-xs">{job.work_place || 'N/A'}</div>
                </div>

                <div className="flex flex-col space-y-1 sm:space-y-0 sm:flex-row items-center sm:space-x-2 rtl:space-x-reverse  ">
                  <div className="">{t('experience')} :</div>
                  <div className="text-xs">{job.experience || 'N/A'}</div>
                </div>
              </div>
            </div>
          </div>
          {/* others */}
          <div className="w-full flex flex-row justify-between h-16 my-auto pt-4">
            <div className="w-1/3 grid grid-rows-2 gap-1 items-center justify-center text-xs sm:text-sm space-y-1 text-center">
              <div className="text-logoOrange row-span-1">{t('closes_at')}</div>
              <div className="text-xs ow-span-1">
                {job.closes_at ? formatDisplayDate(job.closes_at) : 'NA'}
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
