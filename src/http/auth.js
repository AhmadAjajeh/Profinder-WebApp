import { QueryClient } from "@tanstack/react-query";

import { getApiBaseUrl } from "../util/http";
import { getLanguage } from "../util/lang";

export const queryClient = new QueryClient();

const handlerFunction = async (url, configuration, errorMessage) => {
  let response;
  try {
    response = await fetch(url, configuration);
  } catch (error) {
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

export async function loginMutation(formData) {
  const url = getApiBaseUrl() + "users/login";

  const configuration = {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
      "Accept-language": getLanguage(),
    },
  };

  const errorMessage = "An error occurred whilte logging in";

  return handlerFunction(url, configuration, errorMessage);
}

export async function googleLoginMutation(formData) {
  const url = getApiBaseUrl() + "users/sign-in-google";
  const configuration = {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
      "Accept-language": getLanguage(),
    },
  };
  const errorMessage = "An error occurred while signing in with google ";
  return handlerFunction(url, configuration, errorMessage);
}

export async function signup(formData) {
  const url = getApiBaseUrl() + "users/signup";
  const configuration = {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
      "Accept-language": getLanguage(),
    },
  };
  const errorMessage = "An error occurred whilte trying to signup ";
  return handlerFunction(url, configuration, errorMessage);
}

export async function activate(formData) {
  const url = getApiBaseUrl() + "users/approve";
  const configuration = {
    method: "PUT",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
      "Accept-language": getLanguage(),
    },
  };
  const errorMessage =
    "An error occurred while trying to activate your account";
  return handlerFunction(url, configuration, errorMessage);
}
