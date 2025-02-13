import { getApiBaseUrl, getStateToken, handlerFunction } from '../util/http';
import { getLanguage } from '../util/lang';

export function myProfileQuery() {
  const url = getApiBaseUrl() + 'users/profiles/my-profile';
  const configuration = {
    method: 'GET',
    headers: {
      'Accept-Language': getLanguage(),
      Authorization: 'Bearer ' + getStateToken(),
    },
  };
  const errorMessage = 'An error occurred while trying to fetch your profile';
  return handlerFunction(url, configuration, errorMessage);
}

export function profileQuery({ id }) {
  const url =
    getApiBaseUrl() +
    'public/profiles/' +
    id +
    '?populate=social_media_links._id';

  const configuration = {
    method: 'GET',
    headers: {
      'Accept-Language': getLanguage(),
      Authorization: 'Bearer ' + getStateToken(),
    },
  };

  const errorMessage = 'An error occurred while trying to fetch the profile';
  return handlerFunction(url, configuration, errorMessage);
}

export function visitUserQuery({ id }) {
  const url = getApiBaseUrl() + 'users/' + id + '/visit';

  const configuration = {
    method: 'GET',
    headers: {
      'Accept-Language': getLanguage(),
      Authorization: 'Bearer ' + getStateToken(),
    },
  };

  const errorMessage = 'An error occurred while trying to fetch the user';
  return handlerFunction(url, configuration, errorMessage);
}
