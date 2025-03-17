import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import i18next from 'i18next';
import { errorHandlingActions } from '../store/errorHandlingSlice';

const useErrorHandler = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleError = (error) => {
    let messages = [];

    // Handle Axios errors
    if (error.isAxiosError) {
      if (!error.response) {
        messages = [
          i18next.t('an_error_occurred_while_trying_to_reach_the_server'),
        ];
      } else {
        const responseData = error.response.data;
        messages = responseData.message
          ? Array.isArray(responseData.message)
            ? responseData.message
            : [responseData.message]
          : [error.message];
      }
    } else {
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

    if (error.response?.status === 401 || error.response?.data?.refresh_token) {
      navigate('/auth/login');
    }
  };

  return handleError;
};

export default useErrorHandler;
