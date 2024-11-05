import store from "../store/index";
import { getLanguage } from "./lang";

export const handlerFunction = async (url, configuration, errorMessage) => {
  let response;
  try {
    response = await fetch(url, configuration);
  } catch (error) {
    console.log(error);
    const err = new Error(
      getLanguage() === "ar"
        ? "حدث خطأ أثناء الوصول للسيرفر"
        : "An error occurred while trying to reach the server"
    );
    err.code = 1;
    throw err;
  }

  if (!response.ok) {
    const error = new Error(errorMessage);
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  return await response.json();
};

export const getApiBaseUrl = () => {
  return process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_API_URL_PROD
    : process.env.REACT_APP_API_URL_DEV;
};

export const getStateToken = () => {
  console.log("here", store.getState().auth.token);
  return store.getState().auth.token;
};

export const getStateUser = () => {
  return store.getState().auth.user;
};

export const getToken = () => {
  const token = JSON.parse(localStorage.getItem("token") || null);
  const expires_at = JSON.parse(localStorage.getItem("expires_at") || null);
  return {
    token,
    expires_at,
  };
};

export const setToken = (token) => {
  const currentDate = new Date();
  const expiers_at = new Date(currentDate);
  expiers_at.setSeconds(
    currentDate.getSeconds() + process.env.REACT_APP_TOKEN_EXPIRE_TIME
  );
  localStorage.setItem("token", JSON.stringify(token));
  localStorage.setItem("expires_at", JSON.stringify(expiers_at));
};

export const setUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};
