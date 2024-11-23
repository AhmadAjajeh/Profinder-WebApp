import {
  getApiBaseUrl,
  getStateToken,
  getToken,
  handlerFunction,
} from "../util/http";
import { getLanguage } from "../util/lang";

export function createPostMutation(formData) {
  const url = getApiBaseUrl() + "users/posts?publisher=true";
  const configuration = {
    method: "POST",
    body: formData,
    headers: {
      "Accept-Language": getLanguage(),
      authorization: "Bearer " + getStateToken(),
    },
  };

  const errorMessage = "An error occurred while trying to publish the post";

  return handlerFunction(url, configuration, errorMessage);
}

export function getPostQuery(page) {
  const url = getApiBaseUrl() + "public/posts?publisher=true&page=" + page;
  const configuration = {
    method: "GET",
    headers: {
      "Accept-Language": getLanguage(),
      authorization: "Bearer " + getStateToken(),
    },
  };

  const errorMessage = "An error occurred while getting the post";

  return handlerFunction(url, configuration, errorMessage);
}

export function likePostMutaiton({ like, postId }) {
  const url = getApiBaseUrl() + "users/likes" + (like ? "" : `/${postId}`);
  const configuration = {
    method: like ? "POST" : "DELETE",
    body: JSON.stringify({ post_id: postId }),
    headers: {
      "Content-Type": "application/json",
      "Accept-language": getLanguage(),
      authorization: "Bearer " + getStateToken(),
    },
  };

  const errorMessage = "An error occurred while like/unlike the post";

  return handlerFunction(url, configuration, errorMessage);
}

export function savePostMutation({ save, postId }) {
  const url = getApiBaseUrl() + "users/saved-post" + (save ? "" : `/${postId}`);
  const configuration = {
    method: save ? "POST" : "DELETE",
    body: JSON.stringify({ post_id: postId }),
    headers: {
      "Content-Type": "application/json",
      "Accept-language": getLanguage(),
      authorization: "Bearer " + getStateToken(),
    },
  };

  const errorMessage = "An error occurred while save/unsave the post";

  return handlerFunction(url, configuration, errorMessage);
}

export function postWithCommentsQuery({ postId, page }) {
  const url =
    getApiBaseUrl() + "public/posts/" + postId + "/comments?page=" + page;
  const configuration = {
    method: "GET",
    headers: {
      "Accept-Language": getLanguage(),
      authorization: "Bearer " + getStateToken(),
    },
  };

  const errorMessage = "An error occurred while fetching comments";

  return handlerFunction(url, configuration, errorMessage);
}

export function createCommentMutation(formData) {
  const url = getApiBaseUrl() + "users/comments";

  const configuration = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": getLanguage(),
      authorization: "Bearer " + getStateToken(),
    },
    body: JSON.stringify(formData),
  };

  const errorMessage = "An error occurred while creating the comment";

  return handlerFunction(url, configuration, errorMessage);
}
