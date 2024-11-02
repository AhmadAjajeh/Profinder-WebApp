export const getApiBaseUrl = () => {
  return process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_API_URL_PROD
    : process.env.REACT_APP_API_URL_DEV;
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
