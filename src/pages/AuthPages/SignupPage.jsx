import { useTranslation } from 'react-i18next';

import GoogleButton from '../../components/auth-forms/GoogleButton';
import SignupForm from '../../components/auth-forms/SignupForm';
import SmallLogoImage from '../../components/header-components/SmallLogoImage';

export default function SignupPage() {
  const { t } = useTranslation();

  return (
    <>
      <div class="hidden sm:flex rounded-xl absolute p-2 border-2 border-logoOrange border-dashed -top-8 -left-8 -z-10">
        <div class="bg-logoOrange w-32 h-32 rounded-xl"></div>
      </div>
      <div class="hidden sm:flex rounded-xl absolute p-2 border-2 border-logoOrange border-dashed -bottom-8 -right-8 -z-10">
        <div class="bg-logoOrange w-32 h-32 rounded-xl"></div>
      </div>
      <div class="w-full bg-slate-50 dark:bg-lessDeepBlue px-8 py-4 rounded-md flex flex-col space-y-4 aboslute">
        {/* profinder logo */}
        <div class="mx-auto">
          <SmallLogoImage style="w-16 shadow-md" />
        </div>
        {/* welcome text */}
        <div>
          <h2 class="text-2xl font-bold  text-logoOrange">
            {t('welcome_to_Profinder')}
          </h2>
          <p class="text-slate-500 mt-2 text-small dark:text-slate-300 font-light">
            {t('signup_and_start_your_journey_with_us')}
          </p>
        </div>

        {/* signup form */}
        <div>
          <SignupForm />
        </div>

        {/* google oauth */}
        <GoogleButton text="Signup with google" />
      </div>
    </>
  );
}
