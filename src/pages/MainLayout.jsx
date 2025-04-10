import { useEffect } from 'react';
import { Outlet, redirect } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../components/header-components/Header';
import ErrorModal from '../components/error-handling/ErrorModal';
import AlertTopModal from '../components/alert/AlertTopModal';
import { errorHandlingActions } from '../store/errorHandlingSlice';
import { alertActions } from '../store/alertSlice';
import { authActions } from '../store/authSlice';
import { getToken, getUser } from '../util/http';
import { useQuery } from '@tanstack/react-query';
import { myProfileQuery } from '../http/profile';
import { profileActions } from '../store/profileSlice';
import SideNavigation from '../components/general-ui/SideNavigation';
import useErrorHandler from '../hooks/useErrorHandler';

let initialRender = true;

export default function MainLayout({ children }) {
  const error = useSelector((state) => state.error);
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();
  const handleError = useErrorHandler();

  if (initialRender)
    dispatch(
      authActions.refreshAuth({ token: getToken().token, user: getUser() })
    );
  useEffect(() => {
    initialRender = false;
  }, []);

  useQuery({
    queryKey: ['my-profile'],
    queryFn: myProfileQuery,
    onSuccess: ({ data }) => {
      dispatch(profileActions.set({ profile: data.profile }));
    },
    onError: handleError,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    document.body.classList.add('dark:bg-darkBackground');
    document.body.classList.add('bg-lightBackground');

    return () => {
      document.body.classList.remove('dark:bg-darkBackground');
      document.body.classList.remove('bg-lightBackground');
    };
  }, []);

  useEffect(() => {
    if (error.code !== 0) {
      const timer = setTimeout(() => {
        dispatch(errorHandlingActions.clearError());
      }, 5000);
      return () => clearTimeout(timer);
    }

    if (alert.messages?.length !== 0) {
      const timer = setTimeout(() => {
        dispatch(alertActions.clear());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, alert, dispatch]);

  return (
    <div>
      <AnimatePresence>
        {error.code !== 0 && (
          <ErrorModal
            error={error}
            color={'bg-white dark:bg-deepBlue dark:border-logoOrange'}
          />
        )}
        {alert.messages?.length !== 0 && (
          <AlertTopModal
            alert={alert}
            color={'bg-white dark:bg-deepBlue dark:border-logoOrange'}
          />
        )}
      </AnimatePresence>

      {/* header */}
      <header className="bg-white dark:bg-elementBlack border-b-1 dark:border-0 shadow-md transition-all duration-300 fixed z-20 w-full">
        <Header />
      </header>

      {/* the down section */}
      <div className="mx-auto pt-20 min-h-screen p-6 flex md:gap-5 rtl:space-x-reverse lg:px-10 xl:px-16  transition-all duration-300 ">
        {/* far left section */}
        <aside className="hidden md:inline h-80 md:w-full md:min-w-[230px] md:max-w-[230px] lg:min-w-[200px] lg:max-w-[240px] xl:min-w-[240px] xl:max-w-[240px] sticky top-20">
          <SideNavigation />
        </aside>

        {children || <Outlet />}
      </div>
    </div>
  );
}

export function mainLoader() {
  try {
    const { token, expires_at } = getToken();
    if (!token || !expires_at || new Date(expires_at) < new Date()) {
      return redirect('/auth/login');
    }
    return { token, expires_at, user: getUser() };
  } catch (error) {
    return redirect('/auth/login');
  }
}
