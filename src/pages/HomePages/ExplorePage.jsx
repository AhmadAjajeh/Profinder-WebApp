import { useState } from "react";
import { motion } from "framer-motion";

import NewPost from "../../components/Explore/NewPost";
import PostScroll from "../../components/Explore/PostScroll";
import ComingSoon from "../../components/genera-ui/ComingSoon";
import HomeNavigation from "../../components/HomeComponents/HomeNavigation";

export default function ExplorePage() {
  return (
    <>
      {/* middle section */}
      <div className="w-full md:w-9/12 lg:w-6/12 flex flex-col item-center ">
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

      {/* far right section */}
      <div className="hidden h-fit lg:flex  lg:w-4/12 xl:w-[468px]">
        <ComingSoon title={"chat"} />
      </div>
    </>
  );
}
