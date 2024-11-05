import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import GoogleButton from "../../components/auth-forms/GoogleButton";
import LoginForm from "../../components/auth-forms/LoginForm";
import SmallLogoImage from "../../components/header-components/SmallLogoImage";

export default function LoginPage() {
  const { t } = useTranslation();

  return (
    <>
      <div class="rounded-xl absolute p-2 border-2 border-logoOrange border-dashed -top-8 -left-8 -z-10">
        <div class="bg-logoOrange w-32 h-32 rounded-xl"></div>
      </div>
      <div class="rounded-xl absolute p-2 border-2 border-logoOrange border-dashed -bottom-8 -right-8 -z-10">
        <div class="bg-logoOrange w-32 h-32 rounded-xl"></div>
      </div>
      <div class="w-full  bg-slate-50 dark:bg-lessDeepBlue p-8 rounded-md flex flex-col space-y-4 ">
        {/* profinder logo  */}
        <div class="mx-auto">
          <SmallLogoImage style="w-16 shadow-md" />
        </div>

        {/* welcome text */}
        <div>
          <h2 class="text-2xl font-bold mb-2 text-logoOrange">
            {t("welcome_to_Profinder")}
          </h2>
          <p class="text-slate-500 dark:text-slate-300 font-light">
            {t(
              "login_to_your_account_and_take_a_huge_step_in_your_job_hunting_journey"
            )}
          </p>
        </div>

        {/* login form */}
        <div>
          <LoginForm />
        </div>
        {/* border  */}
        <div class="w-full border-b border-slate-300"></div>
        {/* google auth */}
        <div class="w-full flex flex-col items-center space-y-4">
          <p class="font-light text-slate-400 dark:text-slate-200">
            {t("or_login_with")}
          </p>
          <GoogleButton text="Google" />
        </div>
        {/* signup */}
        <div class="flex space-x-2 font-light dark:text-slate-200">
          <span>{t("dont_have_an_account")}</span>
          <Link
            class="inline text-slate-500 dark:text-slate-200 hover:text-slate-800 dark:hover:text-white transition-all duration-200"
            to="/auth/signup"
          >
            {t("signup")}
          </Link>
        </div>
      </div>
    </>
  );
}
