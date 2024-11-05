import {
  getApiBaseUrl,
  getStateToken,
  getToken,
  handlerFunction,
} from "../util/http";
import { getLanguage } from "../util/lang";

const url = getApiBaseUrl() + "users/posts";

export function createPostMutation(formData) {
  const configuration = {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": getLanguage(),
      authorization: "Bearer " + getStateToken(),
    },
  };

  const errorMessage = "An error occurred while trying to publish the post";

  return handlerFunction(url, configuration, errorMessage);
}
