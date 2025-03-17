import { useTranslation } from 'react-i18next';
import { SingleCompany } from '../general-ui/IconsSvg';
import PagesNav from '../general-ui/PagesNav';
import { FaSpinner } from 'react-icons/fa';
import { useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchComapniesQuery } from '../../http/home';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getBaseUrl } from '../../util/http';
import useErrorHandler from '../../hooks/useErrorHandler';

export default function CompaniesSearch() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleError = useErrorHandler();

  const [name, setName] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [companies, setComapnies] = useState([]);
  const [searching, setSearching] = useState(false);
  const input = useRef(null);

  const { isFetching } = useQuery({
    queryKey: ['company-search', name, page],
    queryFn: () => searchComapniesQuery({ name, page }),
    onSuccess: ({ data }) => {
      setComapnies(data.companies);
      setTotalPages(data.pagination.number_of_pages || null);
    },
    onError: handleError,
    refetchOnWindowFocus: false,
    enabled: name.length > 2,
  });

  function handleSearch(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { name } = Object.fromEntries(formData);
    setName(name);
  }

  return (
    <div>
      <form
        onSubmit={handleSearch}
        onFocus={() => setSearching(true)}
        onBlur={() => {
          setSearching(false);
          setComapnies([]);
          setName('');
          input.current.value = '';
        }}
      >
        <div className="hidden group relative md:flex space-x-2 rtl:space-x-reverse items-center border focus-within:shadow-md focus-within:py-1.5 focus-within:px-3 border-gray-300 dark:border-darkBorder rounded-md px-2 py-1 shadow-sm   dark:shadow-darkBorder transition-all">
          <div>
            <svg
              className="w-4 h-4 text-gray-500 dark:text-slate-200 font-light"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <div>
            <input
              type="search"
              name="name"
              className="text-sm  dark:bg-elementBlack  placeholder:text-slate-500 dark:placeholder:text-slate-200 dark:bg-customGray focus:outline-none placeholder:text-xs w-[240px] focus:w-[250px] font-light transition-all outline-none duration-300 focus:placeholder-transparent"
              placeholder={t('search_for_companies')}
              autoComplete="off"
              ref={input}
            />
          </div>
        </div>
      </form>

      {searching && name !== '' && (
        <div className="fixed w-[300px] top-[70px] dark:text-white bg-white dark:bg-elementBlack border border-gray-300 dark:border-darkBorder">
          <div className="w-full max-h-[500px] overflow-y-scroll">
            {companies.length > 0 ? (
              <div className="flex flex-col">
                {companies.map((company) => (
                  <Company key={company._id} company={company} />
                ))}
                <PagesNav
                  currentPage={page}
                  totalPages={totalPages}
                  changePage={setPage}
                />
              </div>
            ) : isFetching ? (
              <div className="w-full h-full flex py-8  items-center justify-center">
                <FaSpinner className="w-10 h-10 animate-spin text-logoOrange" />
              </div>
            ) : (
              <div className="text-center py-8 text-md ">
                No companies found matching your search.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function Company({ company }) {
  return (
    <div
      key={company.id}
      className="border dark:bg-elementBlack border-gray-300 dark:border-darkBorder hover:bg-gray-200 dark:hover:bg-elementGray  transition-all duration-300 flex space-x-3 rtl:space-x-reverse  py-2 cursor-pointer "
    >
      <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden mr-4">
        {company.image?.url ? (
          <img
            src={getBaseUrl() + company.image.url}
            alt={company.name}
            className="w-full h-full object-cover text-xs"
          />
        ) : (
          <div className="bg-gray-300 dark:bg-gray-500 p-2 w-full h-full flex items-center">
            <SingleCompany style="w-12 h-12 text-gray-500 dark:text-gray-700 " />
          </div>
        )}
      </div>
      <div className="flex flex-col justify-center">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
          {company.name}
        </h3>
        <div className="flex items-center space-x-1 rtl:space-x-reverse text-gray-600 dark:text-gray-50 mt-0.5">
          <span className="text-[11px]">{company.industry}</span>
        </div>
      </div>
    </div>
  );
}
