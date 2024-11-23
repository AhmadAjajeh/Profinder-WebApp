import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getBaseUrl } from "../../util/http";

const url = getBaseUrl();

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const previousImage = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextImage = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
    }),
    center: {
      x: 0,
    },
    exit: (direction) => ({
      x: direction > 0 ? "-100%" : "100%",
    }),
  };

  return (
    <div className="relative flex items-center justify-center w-full max-w-[600px] mx-auto overflow-hidden rounded-md ">
      {currentIndex > 0 && (
        <button
          onClick={previousImage}
          className="absolute left-3 p-2 text-xl font-bold text-white bg-gray-800 rounded-full hover:bg-gray-700 z-10"
        >
          {"←"}
        </button>
      )}

      <div className="relative aspect-square w-full flex items-center justify-center">
        <AnimatePresence custom={direction} initial={false}>
          <motion.img
            key={currentIndex}
            src={url + images[currentIndex]}
            alt="slider"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4 }}
            className="absolute w-full aspect-square"
          />
        </AnimatePresence>
      </div>

      {currentIndex < images.length - 1 && (
        <button
          onClick={nextImage}
          className="absolute right-3 p-2 text-xl font-bold text-white bg-gray-800 rounded-full hover:bg-gray-700 z-10"
        >
          {"→"}
        </button>
      )}
    </div>
  );
};

export default ImageSlider;
