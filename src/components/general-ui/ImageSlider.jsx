import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getBaseUrl } from '../../util/http';
import { ArrowIcon } from './IconsSvg';
import ImageSliderModal from './ImageSliderModal';

const url = getBaseUrl();

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [modal, setModal] = useState(false);

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
      x: direction > 0 ? '100%' : '-100%',
    }),
    center: {
      x: 0,
    },
    exit: (direction) => ({
      x: direction > 0 ? '-100%' : '100%',
    }),
  };

  return (
    <div className="relative flex items-center justify-center w-full max-w-[600px] mx-auto overflow-hidden bg-elementDarkerLightGray dark:bg-elementGray rounded-md ">
      <AnimatePresence>
        {modal && (
          <ImageSliderModal
            images={images}
            index={currentIndex}
            onClose={() => setModal(false)}
          />
        )}
      </AnimatePresence>
      {currentIndex > 0 && (
        <button
          onClick={previousImage}
          className="absolute left-3 p-2 text-md font-bold  bg-gray-500 text-white rounded-full z-10"
        >
          <ArrowIcon style="w-4 rotate-180" />
        </button>
      )}

      <button
        onClick={() => setModal(true)}
        className="relative pb-[56.25%] h-0 w-full flex items-center justify-center"
      >
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
            className="absolute top-0 left-0 h-full w-full object-contain object-center"
          />
        </AnimatePresence>
      </button>

      {currentIndex < images.length - 1 && (
        <button
          onClick={nextImage}
          className="absolute right-3 p-2 text-md font-bold  bg-gray-500 text-white rounded-full z-10"
        >
          <ArrowIcon style="w-4" />
        </button>
      )}
    </div>
  );
};

export default ImageSlider;
