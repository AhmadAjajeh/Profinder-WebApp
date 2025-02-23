import { useState } from 'react';

import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import _ from 'lodash';

import { getDirection } from '../../util/lang';
import SignupInputField from '../../components/auth-forms/SignupInputField';
import {
  validateEmail,
  validateNewPassword,
  validateUsername,
} from '../../validation/auth';
import { signup } from '../../http/auth';
import { alertActions } from '../../store/alertSlice';
import { errorHandlingActions } from '../../store/errorHandlingSlice';
import { activationActions } from '../../store/activationCodeSlice';
import { errorHandlingFunction } from '../../util/http';

const initialValidationState = {
  username: null,
  email: null,
  password: null,
  confirmPassword: null,
};

export default function SignupForm() {
  const { t } = useTranslation();
  const [validation, setValidation] = useState(initialValidationState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation({
    mutationFn: signup,
    onSuccess: (response) => {
      dispatch(alertActions.alert({ messages: [response.message] }));
      navigate('/auth/check-code');
    },
    onError: errorHandlingFunction(dispatch, errorHandlingActions, navigate),
  });

  function handleSignUp(event) {
    event.preventDefault();

    let formData = new FormData(event.target);
    formData = Object.fromEntries(formData);

    const { email, username, password, confirmPassword } = formData;

    const validationObj = {
      username: validateUsername(username),
      email: validateEmail(email),
      password: validateNewPassword(password),
      confirmPassword:
        password === confirmPassword ? null : 'passwords_must_match',
    };

    setValidation(validationObj);
    if (!_.isEqual(validationObj, initialValidationState)) {
      return;
    }
    dispatch(activationActions.setEmail(email));
    mutate({ email, username, password, password_confirm: confirmPassword });
  }

  return (
    <form onSubmit={handleSignUp}>
      <div class="flex flex-col mb-2 dark:text-slate-300">
        <SignupInputField
          name="email"
          label={t('email')}
          type="text"
          placeholder={t('enter_your_email')}
          validation={validation.email}
        />
        <SignupInputField
          name="username"
          label={t('username')}
          type="text"
          placeholder={t('enter_your_username')}
          validation={validation.username}
        />

        <div
          class={'flex flex-row justify-between space-x-3 rtl:space-x-reverse'}
        >
          <SignupInputField
            addStyle="w-1/2 "
            name="password"
            label={t('password')}
            type="password"
            placeholder={t('enter_your_password')}
          />
          <SignupInputField
            addStyle="w-1/2"
            name="confirmPassword"
            label={t('confirm_password')}
            type="password"
            placeholder={t('confirm_your_password')}
          />
        </div>
        {/* password and confirm password validation  */}
        {(validation.password || validation.confirmPassword) && (
          <p class="text-xs px-2 -mt-2 mb-2 text-red-400">
            {validation.password
              ? t(validation.password)
              : validation.confirmPassword
              ? t(validation.confirmPassword)
              : ' '}
          </p>
        )}
      </div>
      <div class="flex flex-row-reverse items-center justify-between space-x-3 w-full">
        <div class="w-1/2  ">
          <button
            disabled={isLoading}
            class="py-3 px-6 flex space-x-3 rtl:space-x-reverse w-full justify-center rounded-md dark:text-slate-50 dark:opacity-90 text-white bg-logoOrange hover:shadow-lg hover:bg-orange-300 shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            <span>{t('signup')}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-7 rtl:rotate-180"
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
        {/* login */}
        <div class="flex  font-light dark:text-slate-200 text-sm">
          <Link
            class="inline text-slate-500 dark:text-slate-200 hover:text-slate-800 dark:hover:text-white transition-all duration-200"
            to="/auth/login"
          >
            {t('or_login')}
          </Link>
        </div>
      </div>
    </form>
  );
}
