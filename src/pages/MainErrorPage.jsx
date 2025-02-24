import { Link, useRouteError } from 'react-router-dom';

import error from '../assets/images/error.png';
import { useTranslation } from 'react-i18next';

export default function MainErrorPage() {
  const { t } = useTranslation();
  const error = useRouteError();

  console.log(error);

  return (
    <div className="mx-auto w-fit flex flex-col space-y-5 mt-16 px-4">
      <img src={error} className="w-full sm:w-[600px]" />
      <div className="mx-auto w-fit text-center">
        <div>{t('something_went_wrong')}</div>
        <Link className="text-logoOrange" to="/home">
          {t('back_to_home_page')}
        </Link>
      </div>
    </div>
  );
}
