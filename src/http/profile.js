import { getApiBaseUrl, getStateToken, handlerFunction } from "../util/http";
import { getLanguage } from "../util/lang";

export function myProfileQuery() {
  const url = getApiBaseUrl() + "users/profiles/my-profile";
  const configuration = {
    method: "GET",
    headers: {
      "Accept-Language": getLanguage(),
      Authorization: "Bearer " + getStateToken(),
    },
  };
  const errorMessage = "An error occurred while trying to fetch your profile";
  return handlerFunction(url, configuration, errorMessage);
}
