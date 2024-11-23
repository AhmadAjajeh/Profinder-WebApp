import { useEffect } from "react";
import { Outlet, redirect, useLoaderData } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";

import SmallScreenHeader from "../components/header-components/SmallScreenHeader";
import MediumScreenHeader from "../components/header-components/MediumScreenHeader";
import ErrorModal from "../components/error-handling/ErrorModal";
import AlertTopModal from "../components/alert/AlertTopModal";
import { errorHandlingActions } from "../store/errorHandlingSlice";
import { alertActions } from "../store/alertSlice";
import { authActions } from "../store/authSlice";
import { getToken, getUser } from "../util/http";

export default function MainLayout() {
  const error = useSelector((state) => state.error);
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  useEffect(() => {
    document.body.classList.add("dark:bg-darkBackground");
    document.body.classList.add("bg-lightBackground");

    return () => {
      document.body.classList.remove("dark:bg-darkBackground");
      document.body.classList.remove("bg-lightBackground");
    };
  }, []);

  dispatch(
    authActions.refreshAuth({ token: getToken().token, user: getUser() })
  );

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
    <>
      <AnimatePresence>
        {error.code !== 0 && (
          <ErrorModal
            error={error}
            color={"bg-white dark:bg-deepBlue dark:border-logoOrange"}
          />
        )}
        {alert.messages?.length !== 0 && (
          <AlertTopModal
            alert={alert}
            color={"bg-white dark:bg-deepBlue dark:border-logoOrange"}
          />
        )}
      </AnimatePresence>
      <header className="bg-white dark:bg-elementBlack border-b-1 dark:border-0 shadow-md transition-all duration-300 fixed z-20 w-full">
        <SmallScreenHeader />
        <MediumScreenHeader />
      </header>
      <Outlet />
    </>
  );
}

export function mainLoader() {
  try {
    const { token, expires_at } = getToken();
    if (!token || !expires_at || new Date(expires_at) < new Date()) {
      return redirect("/auth/login");
    }
    return { token, expires_at, user: getUser() };
  } catch (error) {
    return redirect("/auth/login");
  }
}
