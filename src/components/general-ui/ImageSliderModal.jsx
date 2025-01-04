import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineClose } from 'react-icons/ai';

import { getBaseUrl } from '../../util/http';
import Modal from './Modal';
import { ArrowIcon, XIcon } from './IconsSvg';

const url = getBaseUrl();

export default function ImageSliderModal({ images, index, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(index);
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
    <Modal
      onClose={onClose}
      lockScroll={true}
      bgDiv={true}
      className="inset-0 rounded-md dark:bg-elementBlack "
      animation={{
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1 },
      }}
    >
      <div>
        <AiOutlineClose
          className="w-5 h-5 absolute text-white z-[100] m-3"
          onClick={onClose}
        />
      </div>
      <div className="relative flex items-center justify-center  p-3 bg-black w-[320px] sm:w-[440px] md:w-full h-[700px] border border-gray-500 dark:border-darkBorder  mx-auto overflow-hidden rounded-md ">
        {currentIndex > 0 && (
          <button
            onClick={previousImage}
            className="absolute left-3 p-2 text-md font-bold  bg-gray-500 text-white rounded-full z-10"
          >
            <ArrowIcon style="w-4 rotate-180" />
          </button>
        )}
        <div className="relative aspect-square  h-full flex items-center justify-center  w-full md:min-w-[700px]">
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
              className="w-full h-full object-contain absolute"
            />
          </AnimatePresence>
        </div>

        {currentIndex < images.length - 1 && (
          <button
            onClick={nextImage}
            className="absolute right-3 p-2 text-md font-bold  bg-gray-500 text-white rounded-full z-10"
          >
            <ArrowIcon style="w-4" />
          </button>
        )}
      </div>
    </Modal>
  );
}
