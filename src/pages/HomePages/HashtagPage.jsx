import { motion } from 'framer-motion';

import ComingSoon from '../../components/general-ui/ComingSoon';
import HomeNavigation from '../../components/home-components/HomeNavigation';
import ComplainAndSuggestion from '../../components/explore/ComplainAndSuggestion';

export default function HashtagPage() {
  return (
    <div className="w-full flex flex-row space-x-5 rtl:space-x-reverse">
      {/* middle section */}
      <div className=" flex flex-col item-center w-full lg:min-w-[500px] ">
        <HomeNavigation />
        <ComingSoon />
      </div>

      {/* far right section */}
      <div className="hidden h-fit lg:flex w-full lg:min-w-[250px] lg:max-w-[380px] xl:min-w-[430px] xl:max-w-[430px] sticky top-20">
        <ComplainAndSuggestion />
      </div>
    </div>
  );
}
