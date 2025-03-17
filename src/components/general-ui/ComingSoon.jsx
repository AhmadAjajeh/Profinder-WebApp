import { useTranslation } from 'react-i18next';

export default function ComingSoon({ title }) {
  const { t } = useTranslation();

  return (
    <div class="bg-white dark:bg-elementBlack dark:text-slate-100 font-light rounded-md p-3 border border-gray-300 dark:border-darkBorder h-fit w-full text-center">
      {/* {t(title)} */}
      <div className="text-3xl font-extrabold text-logoOrange my-10 ">
        COMING S<span className="text-deepBlue">OO</span>N
      </div>
      {/* <img src={ComingSoonPng} class="rounded-md h-52 mx-auto my-3" alt="" /> */}
    </div>
  );
}
