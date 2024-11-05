import { useTranslation } from "react-i18next";

import ComingSoonPng from "../../assets/images/coming-soon.png";

export default function ComingSoon({ title }) {
  const { t } = useTranslation();

  return (
    <div class="bg-white dark:bg-elementBlack dark:text-slate-100 font-light rounded-md p-3 border border-slate-300 dark:border-gray-700 h-fit w-full text-center">
      {t(title)}
      <img src={ComingSoonPng} class="rounded-md h-52 mx-auto my-3" alt="" />
    </div>
  );
}
