import { motion } from 'framer-motion';

import NewPost from '../../components/explore/NewPost';
import PostScroll from '../../components/explore/PostScroll';
import HomeNavigation from '../../components/home-components/HomeNavigation';
import ComplainAndSuggestion from '../../components/explore/ComplainAndSuggestion';
import ImageSliderModal from '../../components/general-ui/ImageSliderModal';

export default function ExplorePage() {
  return (
    <>
      {/* middle section */}
      <div className="flex-1 overflow-hidden min-w-[400px]">
        <div className=" flex flex-col item-center ">
          {/* <HomeNavigation /> */}
          <HomeNavigation />

          {/* content */}
          <motion.div
            className="flex flex-col space-y-4"
            variants={{
              hidden: { opacity: 0, y: -15 },
              animate: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            animate="animate"
            exit="hidden"
          >
            <NewPost />
            <PostScroll />
          </motion.div>
        </div>
      </div>
      {/* far right section */}
      <div className="hidden h-fit lg:flex w-full lg:min-w-[250px] lg:max-w-[380px] xl:min-w-[430px] xl:max-w-[430px] sticky top-20">
        <ComplainAndSuggestion />
      </div>
    </>
  );
}
