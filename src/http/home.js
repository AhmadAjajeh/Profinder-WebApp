import {
  buildSearchParams,
  getApiBaseUrl,
  getStateToken,
  getToken,
  handlerFunction,
} from '../util/http';
import { getLanguage } from '../util/lang';

export function createPostMutation(formData) {
  const url = getApiBaseUrl() + 'users/posts?publisher=true';
  const configuration = {
    method: 'POST',
    body: formData,
    headers: {
      'Accept-Language': getLanguage(),
      authorization: 'Bearer ' + getStateToken(),
    },
  };

  const errorMessage = 'An error occurred while trying to publish the post';

  return handlerFunction(url, configuration, errorMessage);
}

export function updatePostMutation({ formData, id }) {
  const url = getApiBaseUrl() + `users/posts/${id}?publisher=true`;
  const configuration = {
    method: 'PUT',
    body: formData,
    headers: {
      'Accept-Language': getLanguage(),
      authorization: 'Bearer ' + getStateToken(),
    },
  };

  const errorMessage = 'An error occurred while trying to edit the post';

  return handlerFunction(url, configuration, errorMessage);
}

export function getPostQuery(page) {
  const url = getApiBaseUrl() + 'public/posts?publisher=true&page=' + page;
  const configuration = {
    method: 'GET',
    headers: {
      'Accept-Language': getLanguage(),
      authorization: 'Bearer ' + getStateToken(),
    },
  };

  const errorMessage = 'An error occurred while getting the post';

  return handlerFunction(url, configuration, errorMessage);
}

export function likePostMutaiton({ like, postId }) {
  const url = getApiBaseUrl() + 'users/likes' + (like ? '' : `/${postId}`);
  const configuration = {
    method: like ? 'POST' : 'DELETE',
    body: JSON.stringify({ post_id: postId }),
    headers: {
      'Content-Type': 'application/json',
      'Accept-language': getLanguage(),
      authorization: 'Bearer ' + getStateToken(),
    },
  };

  const errorMessage = 'An error occurred while like/unlike the post';

  return handlerFunction(url, configuration, errorMessage);
}

export function savePostMutation({ save, postId }) {
  const url = getApiBaseUrl() + 'users/saved-post' + (save ? '' : `/${postId}`);
  const configuration = {
    method: save ? 'POST' : 'DELETE',
    body: JSON.stringify({ post_id: postId }),
    headers: {
      'Content-Type': 'application/json',
      'Accept-language': getLanguage(),
      authorization: 'Bearer ' + getStateToken(),
    },
  };

  const errorMessage = 'An error occurred while save/unsave the post';

  return handlerFunction(url, configuration, errorMessage);
}

export function postWithCommentsQuery({ postId, page }) {
  const url =
    getApiBaseUrl() + 'public/posts/' + postId + '/comments?page=' + page;
  const configuration = {
    method: 'GET',
    headers: {
      'Accept-Language': getLanguage(),
      authorization: 'Bearer ' + getStateToken(),
    },
  };

  const errorMessage = 'An error occurred while fetching comments';

  return handlerFunction(url, configuration, errorMessage);
}

export function createCommentMutation(formData) {
  const url = getApiBaseUrl() + 'users/comments';

  const configuration = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept-Language': getLanguage(),
      authorization: 'Bearer ' + getStateToken(),
    },
    body: JSON.stringify(formData),
  };

  const errorMessage = 'An error occurred while creating the comment';

  return handlerFunction(url, configuration, errorMessage);
}

export function deletePostMutation(postId) {
  const url = getApiBaseUrl() + 'users/posts/' + postId;

  const configuration = {
    method: 'DELETE',
    headers: {
      'Accept-Language': getLanguage(),
      authorization: 'Bearer ' + getStateToken(),
    },
  };

  const errorMessage = 'An error occurred while deleting the post';

  return handlerFunction(url, configuration, errorMessage);
}

export function getJobsQuery({ title, location, page }) {
  const url =
    getApiBaseUrl() +
    'explore/jobs/search?' +
    buildSearchParams({ title, location, page });

  const configuration = {
    method: 'GET',
    headers: {
      'Accept-Language': getLanguage(),
      authorization: 'Bearer ' + getStateToken(),
    },
  };

  const errorMessage = 'An error occurred while fetching the jobs!';

  return handlerFunction(url, configuration, errorMessage);
}

export function getOneJobQuery(jobId) {
  const url = getApiBaseUrl() + 'explore/jobs/' + jobId;

  const configuration = {
    method: 'GET',
    headers: {
      'Accept-Language': getLanguage(),
      authorization: 'Bearer ' + getStateToken(),
    },
  };

  const errorMessage = 'An error occurred while fetching the job!';

  return handlerFunction(url, configuration, errorMessage);
}

export function jobApplyMutation({ jobId, apply }) {
  const url =
    getApiBaseUrl() +
    'explore/jobs/' +
    jobId +
    (apply ? '/apply' : '/cancel-apply');

  const configuration = {
    method: apply ? 'POST' : 'DELETE',
    headers: {
      'Accept-Language': getLanguage(),
      authorization: 'Bearer ' + getStateToken(),
    },
  };

  const errorMessage = 'An error occurred while applying for the job!';

  return handlerFunction(url, configuration, errorMessage);
}

export function getProjectsQuery({ title, min, max, page }) {
  const url =
    getApiBaseUrl() +
    'explore/freelance-projects/search?' +
    buildSearchParams({ title, 'budget.min': min, 'budget.max': max, page });

  const configuration = {
    method: 'GET',
    headers: {
      'Accept-Language': getLanguage(),
      authorization: 'Bearer ' + getStateToken(),
    },
  };

  const errorMessage = 'An error occurred while fetching the projects!';

  return handlerFunction(url, configuration, errorMessage);
}

export function getOneProjectQuery({ id }) {
  const url = getApiBaseUrl() + 'explore/freelance-projects/' + id;

  const configuration = {
    method: 'GET',
    headers: {
      'Accept-language': getLanguage(),
      authorization: 'Bearer ' + getStateToken(),
    },
  };

  const errorMessage = 'An error occurred while fetching the project!';

  return handlerFunction(url, configuration, errorMessage);
}

export function projectApplyMutation({ id, apply }) {
  const url =
    getApiBaseUrl() +
    'explore/freelance-projects/' +
    id +
    (apply ? '/apply' : '/cancel-apply');

  const configuration = {
    method: apply ? 'POST' : 'DELETE',
    headers: {
      'Accept-Language': getLanguage(),
      authorization: 'Bearer ' + getStateToken(),
    },
  };

  const errorMessage =
    'An error occurred while applying/cancel-applying for the job';

  return handlerFunction(url, configuration, errorMessage);
}

export function createProjectMutation(formData) {
  const url = getApiBaseUrl() + 'user/freelance-projects';

  const configuration = {
    method: 'POST',
    headers: {
      'Accept-Language': getLanguage(),
      authorization: 'Bearer ' + getStateToken(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  };

  const errorMessage = 'An error occurred while creating the freelance project';

  return handlerFunction(url, configuration, errorMessage);
}

export function searchComapniesQuery({ name, page }) {
  const url =
    getApiBaseUrl() +
    'explore/companies/search?' +
    buildSearchParams({ name, page });

  const configuration = {
    method: 'GET',
    headers: {
      'Accept-Language': getLanguage(),
      authorization: 'Bearer ' + getStateToken(),
    },
  };

  const errorMessage = 'An error occurred while saerching companies';

  return handlerFunction(url, configuration, errorMessage);
}
