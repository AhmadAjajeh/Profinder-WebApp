import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';

import {
  LocationIcon,
  SearchIcon,
  SingleCompany,
} from '../general-ui/IconsSvg';
import { getBaseUrl } from '../../util/http';
import { getJobsQuery } from '../../http/home';
import { errorHandlingActions } from '../../store/errorHandlingSlice';
import NoResult from '../general-ui/NoResult';
import PagesNav from '../general-ui/PagesNav';

export default function JobScroll({ onSelect }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [jobs, setJobs] = useState([]);

  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [searchValidation, setSearchValidation] = useState(null);

  // const observer = useRef(null);

  const { isFetching } = useQuery({
    queryKey: ['jobs-scroll', `${page}`, title, location],
    queryFn: () => getJobsQuery({ title, location, page }),
    onSuccess: (data) => {
      setJobs(data.jobs);
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
    refetchOnWindowFocus: false,
  });

  // const lastJobRef = useCallback(
  //   (node) => {
  //     if (isFetching) return; //nothing to do
  //     if (observer.current) observer.current.disconnect(); // detach the observer from the previous last job

  //     observer.current = new IntersectionObserver((entries) => {
  //       if (entries[0].isIntersecting && morePagesExists) {
  //         setPage((prevPage) => prevPage + 1);
  //       }
  //     });

  //     if (node) observer.current.observe(node);
  //     // attach the new last job to the observer .
  //   },
  //   [isFetching, morePagesExists]
  // );

  useEffect(() => {
    if (!isFetching && jobs.length < 6)
      document.body.classList.add('no-scroll');
    else document.body.classList.remove('no-scroll');
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isFetching, jobs]);

  function handleSearch(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { title, location } = Object.fromEntries(formData);

    if (title.length < 2) {
      setSearchValidation('the_title_should_be_at_least_two_characters');
      return;
    }

    setSearchValidation(null);
    setTitle(title);
    setLocation(location);
    setPage(1);
    setJobs([]);
  }

  return (
    <div className="flex flex-col space-y-3 dark:text-white">
      {/* filteration */}
      <div className="w-full bg-white dark:bg-elementBlack p-4 rounded-md shadow-sm border border-gray-300 dark:border-darkBorder">
        <div>
          <form
            onSubmit={handleSearch}
            className="flex flex-row items-center justify-between space-x-3 rtl:space-x-reverse "
          >
            <div className="w-1/2 flex space-x-2 rtl:space-x-reverse items-center relative">
              <input
                name="title"
                className="outline-none px-3 py-2 bg-gray-100 dark:bg-elementGray font-light text-sm rounded-md w-full"
                placeholder={t('title')}
              />
              <SearchIcon style="w-4 h-4 absolute ltr:right-3 rtl:left-3 text-gray-500" />
            </div>
            <div className="w-1/2 flex space-x-2 rtl:space-x-reverse items-center relative">
              <input
                name="location"
                className="outline-none px-3 placeholder:h-6 py-2 bg-gray-100 dark:bg-elementGray font-light text-sm rounded-md w-full"
                placeholder={t('location')}
              />
              <LocationIcon style="w-5 h-5 absolute ltr:right-3 rtl:left-3 text-gray-500" />
            </div>
            <button className="text-sm font-light bg-logoOrange text-white p-2 rounded-md  shadow-sm">
              {t('search')}
            </button>
          </form>
        </div>
        {searchValidation && (
          <div className="text-red-500 font-light text-xs mt-1 -mb-2">
            {t(searchValidation)}
          </div>
        )}
      </div>

      {/* scroll */}
      <div className="flex flex-col bg-white dark:bg-elementBlack shadow-sm rounded-md border border-gray-300 dark:border-darkBorder">
        {!isFetching && jobs.length === 0 && (
          <div className="mx-auto text-center p-5">
            <NoResult className="w-[400px]" />
            <h3 className="mt-4 mb-2">
              {t('no_result_found_for_your_search')}
            </h3>
            <div className="text-xs font-extralight ">
              {t('please_try_another_keys')}
            </div>
          </div>
        )}
        {!isFetching &&
          jobs.length > 0 &&
          jobs.map((job, index) => {
            return <ScrollJob key={job._id} job={job} onSelect={onSelect} />;
          })}
        {!isFetching && (
          <PagesNav
            currentPage={page}
            morePagesExists={jobs.length === 10}
            changePage={setPage}
          />
        )}
        {isFetching && (
          <>
            <ScrollJobShimmer />
            <ScrollJobShimmer />
            <ScrollJobShimmer />
            <ScrollJobShimmer />
            <ScrollJobShimmer />
            <ScrollJobShimmer />
            <ScrollJobShimmer />
          </>
        )}
      </div>
    </div>
  );
}

const ScrollJob = forwardRef(({ job, onSelect, rounded }, ref) => {
  return (
    <button
      ref={ref}
      className={`flex flex-row p-4 bg-white dark:bg-elementBlack hover:bg-elementLightGray transition-colors duration-200' space-x-3 rtl:space-x-reverse border-b border-gray-300 dark:border-darkBorder ${
        rounded && 'rounded-md'
      }`}
      onClick={onSelect}
    >
      {/* company image */}
      <div className="flex flex-row items-center justify-center">
        {job.company.image_url ? (
          <img
            className="w-14 h-14 object-cover"
            src={getBaseUrl() + job.company.image_url}
          />
        ) : (
          <div className="bg-gray-300 dark:bg-gray-500 p-2 w-14 h-14">
            <SingleCompany style="w-12 h-12 text-gray-500 dark:text-gray-700" />
          </div>
        )}
      </div>

      {/* title and location */}
      <div className="flex flex-col space-y-[2px] text-start">
        <h4 className="font-normal text-sm ">{job.title}</h4>
        <div className="text-xs text-gray-500 dark:text-gray-300">
          {job.company.name}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-300">
          {job.location}
        </div>
      </div>
    </button>
  );
});

function ScrollJobShimmer() {
  return (
    <div className="flex flex-row p-4 bg-white dark:bg-elementBlack space-x-3 rtl:space-x-reverse border-b border-gray-300 dark:border-darkBorder">
      {/* Placeholder for company image */}
      <div className="w-14 h-14 bg-gray-300 dark:bg-darkBorder rounded-full animate-pulse"></div>

      {/* Placeholder for title and location */}
      <div className="flex flex-col space-y-[2px] w-full">
        <div className="w-1/2 h-4 bg-gray-300 dark:bg-darkBorder rounded animate-pulse"></div>
        <div className="w-1/3 h-3 bg-gray-300 dark:bg-darkBorder rounded animate-pulse"></div>
        <div className="w-1/4 h-3 bg-gray-300 dark:bg-darkBorder rounded animate-pulse"></div>
      </div>
    </div>
  );
}
