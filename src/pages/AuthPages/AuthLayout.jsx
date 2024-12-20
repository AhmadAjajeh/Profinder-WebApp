import { Outlet } from "react-router-dom";
import i18n from "i18next";

import AuthSideImage from "../../components/auth-forms/AuthSideImage";
import ErrorModal from "../../components/error-handling/ErrorModal";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import AlertModal from "../../components/alert/AlertModal";
import { errorHandlingActions } from "../../store/errorHandlingSlice";
import { alertActions } from "../../store/alertSlice";
import { destroyAuthInfo } from "../../util/http";

export default function AuthLayout() {
  const error = useSelector((state) => state.error);
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  useEffect(() => {
    document.body.classList.add("dark:bg-deepBlue");
    if (window.matchMedia("(prefers-color-scheme: dark)").matches)
      document.documentElement.classList.add("dark");

    return () => {
      document.body.classList.remove("dark:bg-deepBlue");
      document.documentElement.classList.remove("dark");
    };
  }, []);

  useEffect(() => {
    destroyAuthInfo();
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
  }, [error, dispatch]);

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
          <AlertModal
            alert={alert}
            color={"bg-white dark:bg-deepBlue dark:border-logoOrange"}
          />
        )}
      </AnimatePresence>
      <div class="w-full  absolute -z-20">
        <div class="mx-auto flex flex-row items-center justify-center p-10 lg:p-20 max-h-screen xl:space-x-20 rtl:space-x-reverse">
          <AuthSideImage />
          <div class="w-full xl:w-3/5 max-w-lg relative">
            <Outlet class="w-full" />
          </div>
        </div>
      </div>
    </>
  );
}
