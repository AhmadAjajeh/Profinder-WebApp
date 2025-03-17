import axios from 'axios';
import { getApiBaseUrl, getStateToken } from '../util/http';
import { getLanguage } from '../util/lang';
import i18next from 'i18next';
console.log(getLanguage());
const instance = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
});

i18next.on('languageChanged', (lng) => {
  instance.defaults.headers['Accept-language'] = lng;
});

instance.interceptors.request.use(
  (config) => {
    const token = getStateToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    } else {
      config.headers['Content-Type'] = 'application/json';
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
