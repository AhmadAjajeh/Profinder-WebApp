import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';

import { authActions } from '../../store/authSlice';
import googleLogo from '../../assets/images/google.png';
import { googleLoginMutation } from '../../http/auth';
import { useTranslation } from 'react-i18next';
import { setToken, setUser } from '../../util/http';
import useErrorHandler from '../../hooks/useErrorHandler';

export default function GoogleButton({}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const handleError = useErrorHandler();

  const { mutate, isLoading } = useMutation({
    mutationFn: googleLoginMutation,
    onSuccess: ({ data }) => {
      dispatch(authActions.refreshAuth({ token: data.token, user: data.user }));
      setToken(data.token);
      setUser(data.user);
      navigate('/');
    },
    onError: handleError,
  });

  const login = useGoogleLogin({
    onSuccess: async ({ data }) => {
      const accessToken = data.access_token;

      const userInfoResponse = await axios.get(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const googleId = userInfoResponse.data.sub;
      mutate({ google_id: googleId, access_token: accessToken });
    },
    onError: async (error) => {
      console.log(error);
    },
  });

  function handleSubmit(event) {
    event.preventDefault();
    login();
  }

  return (
    // button one with useGoogleLogin ( not working ,printing nothing )
    <div class="w-full">
      <form onSubmit={handleSubmit}>
        <button
          disabled={isLoading}
          class={`text-xs sm:text-sm w-full flex justify-center items-center space-x-2 rtl:space-x-reverse dark:text-slate-200 dark:bg-deepBlue p-3 px-12 shadow-md font-light border border-slate-300 dark:border-lessDeepBlue rounded-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-100`}
        >
          <img class="w-8 mx-2" src={googleLogo} />
          <span>{t('continue_with_google')}</span>
        </button>
      </form>
    </div>
  );
}
