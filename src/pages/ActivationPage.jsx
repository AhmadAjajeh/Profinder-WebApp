import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

import _, { reverse } from "lodash";

import logo from "../assets/images/logo.png";
import { activate } from "../http/auth";
import { activationActions } from "../store/activationCodeSlice";
import { alertActions } from "../store/alertSlice";
import { errorHandlingActions } from "../store/errorHandlingSlice";
import { getDirection, getLanguage } from "../util/lang";
import SmallLogoImage from "../components/header-components/SmallLogoImage";

export default function ActivationPage() {
  const { email } = useSelector((state) => state.activation);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [validation, setValidation] = useState(null);

  const { mutate, isLoading } = useMutation({
    mutationFn: activate,
    onSuccess: (response) => {
      dispatch(activationActions.clearEmail());
      dispatch(alertActions.alert({ messages: [response.message] }));
      navigate("/auth/login");
    },
    onError: (error) => {
      const messages = error.info?.message || [error.message];
      dispatch(
        errorHandlingActions.throwError({
          code: error.code,
          messages,
        })
      );
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    let formData = new FormData(event.target);
    formData = Object.fromEntries(formData);

    let verificationCode = "";
    let allInteger = true;
    for (let key in formData) {
      if (isNaN(formData[key])) allInteger = false;
      verificationCode += formData[key];
    }

    if (getDirection() === "rtl")
      verificationCode = verificationCode.split("").reverse().join("");

    if (!allInteger || verificationCode.length !== 6) {
      setValidation("invalid_verification_code");
      return;
    }

    mutate({ verify_code: verificationCode, email });
  };

  const { t } = useTranslation();
  return (
    <div class="w-full bg-slate-50 dark:bg-lessDeepBlue px-8 py-5 rounded-md flex flex-col space-y-4 aboslute">
      <div class="mx-auto">
        <SmallLogoImage style="w-16 shadow-md" />
      </div>
      {/* welcome text */}
      <div class="w-full text-center">
        <h2 class="text-2xl font-bold  text-logoOrange">
          {t("check_your_email")}
        </h2>
        <p class="text-slate-500  mt-2 text-small dark:text-slate-300 font-light">
          {t("we_sent_a_6_digit_verification_code_to") +
            ` ${email}, ` +
            t("please_check_it_out")}
        </p>
      </div>
      <div class="mx-auto">
        <form
          onSubmit={handleSubmit}
          class="flex flex-col space-y-4 items-center"
        >
          <div
            class={`flex flex-row space-x-4 items-center dark:text-white rtl:space-x-reverse`}
          >
            <div class="max-w-14 h-14 min-w-12 ">
              <input
                class="w-full h-full flex flex-col items-center justify-center px-3 text-center md:px-5 outline-none rounded-xl border border-logoOrange text-lg bg-slate-300 dark:bg-lessDeepBlue  dark:focus:bg-lessDeepBlue focus:bg-white transition-all duration-300"
                type="text"
                name="1"
                maxLength={1}
              />
            </div>
            <div class="max-w-14 h-14 min-w-12 ">
              <input
                class="w-full h-full flex flex-col items-center justify-center text-center px-3 md:px-5 outline-none rounded-xl border border-logoOrange text-lg bg-slate-300 dark:bg-lessDeepBlue dark:focus:bg-lessDeepBlue transition-all duration-300 focus:bg-white  "
                type="text"
                name="2"
                maxLength={1}
              />
            </div>
            <div class="max-w-14 h-14 min-w-12 ">
              <input
                class="w-full h-full flex flex-col items-center justify-center text-center px-3 md:px-5 outline-none rounded-xl border border-logoOrange text-lg bg-slate-300 dark:bg-lessDeepBlue dark:focus:bg-lessDeepBlue transition-all duration-300 focus:bg-white"
                type="text"
                name="3"
                maxLength={1}
              />
            </div>
            <div class="max-w-14 h-14 min-w-12 ">
              <input
                class="w-full h-full flex flex-col items-center justify-center text-center px-3 md:px-5 outline-none rounded-xl border border-logoOrange text-lg bg-slate-300 dark:bg-lessDeepBlue dark:focus:bg-lessDeepBlue transition-all duration-300 focus:bg-white"
                type="text"
                name="4"
                maxLength={1}
              />
            </div>
            <div class="max-w-14 h-14 min-w-12 ">
              <input
                class="w-full h-full flex flex-col items-center justify-center text-center px-3 md:px-5 outline-none rounded-xl border border-logoOrange text-lg bg-slate-300 dark:bg-lessDeepBlue dark:focus:bg-lessDeepBlue transition-all duration-300 focus:bg-white"
                type="text"
                name="5"
                maxLength={1}
              />
            </div>
            <div class="max-w-14 h-14 min-w-12 ">
              <input
                class="w-full h-full flex flex-col items-center justify-center text-center px-3 md:px-5 outline-none rounded-xl border border-logoOrange text-lg bg-slate-300 dark:bg-lessDeepBlue dark:focus:bg-lessDeepBlue transition-all duration-300 focus:bg-white"
                type="text"
                name="6"
                maxLength={1}
              />
            </div>
          </div>
          {validation && (
            <div class="font-light text-red-500">{t(validation)}</div>
          )}
          <div class="w-1/2">
            <button
              disabled={isLoading}
              class="py-3 px-6 flex space-x-3 w-full justify-center rounded-md dark:text-slate-50 dark:opacity-90 text-white bg-logoOrange hover:shadow-lg hover:bg-orange-300 shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <span>{t("submit")}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
