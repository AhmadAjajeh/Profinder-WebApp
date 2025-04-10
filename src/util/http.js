import { jwtDecode } from 'jwt-decode';

import store from '../store/index';
import { getLanguage } from './lang';
import i18next from 'i18next';

export const handlerFunction = async (url, configuration, errorMessage) => {
  let response;
  try {
    response = await fetch(url, configuration);
  } catch (error) {
    const err = new Error(
      getLanguage() === 'ar'
        ? 'حدث خطأ أثناء الوصول للسيرفر'
        : 'An error occurred while trying to reach the server'
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

  if (response.status !== 204) return await response.json();
};

export const getApiBaseUrl = () => {
  return process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_API_URL_PROD
    : process.env.REACT_APP_API_URL_DEV;
};

export const getBaseUrl = () => {
  return process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_URL_PROD
    : process.env.REACT_APP_URL_DEV;
};

export const getStateToken = () => {
  return store.getState().auth.token;
};

export const getStateUser = () => {
  return store.getState().auth.user;
};

export const getToken = () => {
  const token = JSON.parse(localStorage.getItem('token') || null);
  const expires_at = JSON.parse(localStorage.getItem('expires_at') || null);
  return {
    token,
    expires_at,
  };
};

export const setToken = (token) => {
  const decoded = jwtDecode(token);
  if (decoded.exp) {
    const expiers_at = new Date(decoded.exp * 1000);
    localStorage.setItem('expires_at', JSON.stringify(expiers_at));
  }
  localStorage.setItem('token', JSON.stringify(token));
};

export const destroyAuthInfo = (token) => {
  localStorage.removeItem('expires_at');
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const setUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const getUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

export const errorHandlingFunction = (
  dispatch,
  errorHandlingActions,
  navigate
) => {
  return (error) => {
    let messages = [];

    // Handle Axios errors
    if (error.isAxiosError) {
      if (!error.response) {
        // Network error or server not reachable
        messages = [
          i18next.t('an_error_occurred_while_trying_to_reach_the_server'),
        ];
      } else {
        // Server responded with error
        const responseData = error.response.data;
        messages = responseData.message
          ? Array.isArray(responseData.message)
            ? responseData.message
            : [responseData.message]
          : [error.message];
      }
    } else {
      // Handle non-Axios errors (like backend validation errors)
      messages = error.message
        ? [error.message]
        : ['An unknown error occurred'];
    }

    dispatch(
      errorHandlingActions.throwError({
        code: error.response?.status || error.code || 500,
        messages,
      })
    );

    // Handle authentication errors
    if (error.response?.status === 401 || error.response?.data?.refresh_token) {
      navigate('/auth/login');
    }
  };
};

export function buildSearchParams(params) {
  const keys = Object.keys(params);
  let string = '';
  for (let key of keys) {
    if (!params[key]) continue;
    string +=
      string.length === 0 ? `${key}=${params[key]}` : `&${key}=${params[key]}`;
  }
  return string;
}
