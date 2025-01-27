import { forwardRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';

import { FaDollarSign } from 'react-icons/fa';
import { SearchIcon, SingleCompany } from '../general-ui/IconsSvg';

import NoResult from '../general-ui/NoResult';
import PagesNav from '../general-ui/PagesNav';

import { buildSearchParams, getBaseUrl } from '../../util/http';
import { getProjectsQuery } from '../../http/home';
import { errorHandlingActions } from '../../store/errorHandlingSlice';

export default function ProjectScroll({ chooseProject, selectedProjectId }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
  const [projects, setProjects] = useState([]);
  const [totalPages, setTotalPages] = useState(null);

  const [title, setTitle] = useState(searchParams.get('title') || '');
  const [minmax, setMinmax] = useState({ min: null, max: null });
  const [searchValidation, setSearchValidation] = useState(null);

  const { isFetching, refetch } = useQuery({
    queryKey: ['projects-scroll', `${page}`, title, minmax.min, minmax.max],
    queryFn: () => getProjectsQuery({ title, ...minmax, page }),
    onSuccess: (data) => {
      setProjects(data.freelance_projects);
      setTotalPages(
        data.pagination.total_count
          ? Math.ceil(data.pagination.total_count / data.pagination.limit)
          : null
      );
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

  useEffect(() => {
    const params = buildSearchParams({
      page,
      title,
      ...minmax,
      selectedProject: selectedProjectId,
    });
    setSearchParams(params);
  }, [page, title, minmax.min, minmax.max, setSearchParams, selectedProjectId]);

  useEffect(() => {
    if (!isFetching && projects.length < 5)
      document.body.classList.add('no-scroll');
    else document.body.classList.remove('no-scroll');
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isFetching, projects]);

  function handleSearch(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const {
      title: newTitle,
      min: newMin,
      max: newMax,
    } = Object.fromEntries(formData);

    if (newTitle.length < 2) {
      setSearchValidation('the_title_should_be_at_least_two_characters');
      return;
    }

    setSearchValidation(null);
    setTitle(newTitle);
    setMinmax({ min: newMin, max: newMax });
    setPage(1);
    setProjects([]);
    chooseProject(null);
    if (title === newTitle && minmax.min === newMin && minmax.max === newMax)
      refetch();
  }

  return (
    <div className="flex flex-col space-y-3 dark:text-white">
      {/* filteration */}
      <div className="w-full bg-white dark:bg-elementBlack p-4 rounded-md shadow-sm border border-gray-300 dark:border-darkBorder">
        <div>
          <form
            onSubmit={handleSearch}
            className="flex flex-col  space-y-2  md:flex-row  md:space-y-0 items-center justify-between md:space-x-3 rtl:space-x-reverse "
          >
            <div className="w-full md:w-2/6 flex space-x-2 rtl:space-x-reverse items-center relative">
              <input
                name="title"
                className="outline-none px-3 py-2 bg-gray-100 dark:bg-elementGray font-light placeholder:text-[12px] rounded-md w-full text-sm"
                placeholder={t('title')}
                defaultValue={title}
              />
              <SearchIcon style="w-5 h-5 absolute ltr:right-3 rtl:left-3 text-gray-500 bg-gray-100 dark:bg-elementGray" />
            </div>
            <div className="w-full md:w-3/12 flex space-x-2 rtl:space-x-reverse items-center relative">
              <input
                name="min"
                type="number"
                className="outline-none px-3 placeholder:h-6 placeholder:text-[10px] py-2 bg-gray-100 dark:bg-elementGray font-light text-sm rounded-md w-full"
                placeholder={t('min_budget')}
              />
              <FaDollarSign className="w-5 h-5 absolute ltr:right-3 rtl:left-3 text-gray-500 bg-gray-100 dark:bg-elementGray" />
            </div>
            <div className="w-full md:w-3/12 flex space-x-2 rtl:space-x-reverse items-center relative">
              <input
                name="max"
                type="number"
                className="outline-none px-3 placeholder:h-6 placeholder:text-[10px] py-2 bg-gray-100 dark:bg-elementGray font-light text-sm rounded-md w-full"
                placeholder={t('max_budget')}
              />
              <FaDollarSign className="w-5 h-5 absolute ltr:right-3 rtl:left-3 text-gray-500 bg-gray-100 dark:bg-elementGray" />
            </div>
            <button className="w-full md:w-1/6 text-sm font-light bg-logoOrange text-white p-2 rounded-md  shadow-sm">
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
        {!isFetching && projects.length === 0 && (
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
          projects.length > 0 &&
          projects.map((project, index) => {
            return (
              <ScrollProject
                key={project._id}
                project={project}
                onSelect={chooseProject}
                rounded={index === 0}
                selected={selectedProjectId === project._id}
              />
            );
          })}
        {!isFetching && projects.length > 0 && (
          <PagesNav
            currentPage={page}
            morePagesExists={title ? page < totalPages : projects.length === 10}
            changePage={setPage}
            totalPages={totalPages}
          />
        )}
        {isFetching && (
          <>
            <ScrollProjectShimmer />
            <ScrollProjectShimmer />
            <ScrollProjectShimmer />
            <ScrollProjectShimmer />
            <ScrollProjectShimmer />
            <ScrollProjectShimmer />
            <ScrollProjectShimmer />
          </>
        )}
      </div>
    </div>
  );
}

const ScrollProject = forwardRef(
  ({ project, onSelect, rounded, selected }, ref) => {
    return (
      <button
        ref={ref}
        className={`flex flex-row p-4 ${
          selected
            ? 'bg-gray-200 dark:bg-elementGray'
            : 'bg-white dark:bg-elementBlack'
        } hover:bg-gray-200 dark:hover:bg-elementGray transition-colors duration-200' space-x-3 rtl:space-x-reverse border-b border-gray-300 dark:border-darkBorder ${
          rounded && 'rounded-t-md'
        }
       `}
        onClick={() => onSelect(project._id)}
      >
        {/* company image */}
        <div className="flex flex-row items-center justify-center">
          {project.publisher_image_url ? (
            <img
              className="w-14 h-14 object-cover min-w-14"
              src={getBaseUrl() + project.publisher_image_url}
            />
          ) : (
            <div className="bg-gray-300 dark:bg-gray-500 p-2 w-14 h-14 flex items-center">
              <SingleCompany style="w-12 h-12 text-gray-500 dark:text-gray-700 " />
            </div>
          )}
        </div>

        {/* title and location */}
        <div className="flex flex-col space-y-[2px] text-start">
          <h4 className="font-normal text-sm ">{project.title}</h4>
          <div className="text-xs text-gray-500 dark:text-gray-300">
            {project.publisher_name}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-300">
            {project.location}
          </div>
        </div>
      </button>
    );
  }
);

function ScrollProjectShimmer() {
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
