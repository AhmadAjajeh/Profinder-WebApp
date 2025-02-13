import { getApiBaseUrl, getStateToken, handlerFunction } from '../util/http';
import { getLanguage } from '../util/lang';

export function updateUserMutation(formData) {
  const url = getApiBaseUrl() + 'users/update';

  const configurations = {
    method: 'PUT',
    body: formData,
    headers: {
      'Accept-Language': getLanguage(),
      Authorization: 'Bearer ' + getStateToken(),
    },
  };

  const errorMessage = 'An error occurred while updating the user';

  return handlerFunction(url, configurations, errorMessage);
}
