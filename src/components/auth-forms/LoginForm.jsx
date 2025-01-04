import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import InputField from './LoginInputField';
import { getDirection } from '../../util/lang';
import { validateEmail, validatePassword } from '../../validation/auth';
import { loginMutation } from '../../http/auth';
import { authActions } from '../../store/authSlice';
import { errorHandlingActions } from '../../store/errorHandlingSlice';
import { setToken, setUser } from '../../util/http';

export default function LoginForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [emailValidation, setEmailValidation] = useState(null);
  const [passwordValidation, setPasswordValidation] = useState(null);

  const { mutate, isLoading } = useMutation({
    mutationFn: loginMutation,
    onSuccess: (response) => {
      dispatch(
        authActions.refreshAuth({ token: response.token, user: response.user })
      );
      setToken(response.token);
      setUser(response.user);
      navigate('/');
    },
    onError: (error) => {
      dispatch(
        errorHandlingActions.throwError({
          code: error.code,
          messages: error.info?.message || [error.message],
        })
      );
    },
  });

  function handleLogin(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const { email, password } = Object.fromEntries(formData);

    // validate the email and password and show the messages .
    const validEmail = validateEmail(email);
    const validPassword = validatePassword(password);
    setEmailValidation(validEmail);
    setPasswordValidation(validPassword);

    // if there is errors , do not send the request .
    if (validEmail || validPassword) return;

    // send request with tanstack
    mutate({ email, password });
  }

  return (
    <form id="login-form" onSubmit={handleLogin}>
      <div class="flex flex-col ">
        <InputField
          name="email"
          type="text"
          placeholder={t('enter_your_email')}
          validation={emailValidation}
        />
        <InputField
          name="password"
          type="password"
          placeholder={t('enter_your_password')}
          validation={passwordValidation}
        />
      </div>
      <div class="flex justify-between items-center w-full text-[13px] sm:text-[16px]">
        <a
          class="font-light text-slate-500 dark:text-slate-200 dark:hover:text-white hover:text-slate-800 transition-all duration-200"
          href="#"
        >
          {t('forgot_password')}
        </a>
        <button
          disabled={isLoading}
          class="py-4 px-6 flex space-x-3 rounded-md dark:text-slate-100 dark:opacity-95 text-white bg-logoOrange hover:shadow-lg hover:bg-orange-300 shadow-md hover:-translate-y-0.5 transition-all duration-200"
        >
          <span>{t('login')}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class={`w-7 rtl:hidden`}
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#ffffff"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <line x1="5" y1="12" x2="19" y2="12" />
            <line x1="13" y1="18" x2="19" y2="12" />
            <line x1="13" y1="6" x2="19" y2="12" />
          </svg>
        </button>
      </div>
    </form>
  );
}
