import { useTranslation } from 'react-i18next';
import React, { useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import { faAward } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import CertificationCard, {
  CertificationCardShimmer,
} from './CertificationCard';
import Certification from '../../general-ui/Certification';
import EditButton from '../../general-ui/EditButton';
import CertificationForm from './CertificationForm';
import { AnimatePresence } from 'framer-motion';

export default function Certifications({
  myProfile,
  certifications,
  isFetching,
}) {
  const { t } = useTranslation();

  const [showModal, setShowModal] = useState(false);
  const sliderRef = useRef(null);

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1440,
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: 1064,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 800,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="relative w-full bg-white h-[600px] dark:bg-elementBlack shadow-md rounded-md border border-gray-300 dark:border-darkBorder">
      <AnimatePresence>
        {showModal && <CertificationForm onClose={() => setShowModal(false)} />}
      </AnimatePresence>

      {myProfile && (
        <EditButton
          handleClick={() => setShowModal(true)}
          text={t('add_new_certfications')}
          className="absolute top-2 rtl:left-2 ltr:right-2"
        />
      )}
      <div className="absolute bg-logoOrange min-h-[600px] min-w-28 max-w-28 hidden md:flex md:rtl:mr-[40px] md:ltr:ml-[40px]"></div>
      <div className=" h-full flex items-center justify-center">
        <div className="absolute w-fit flex flex-row items-center justify-center gap-1 top-[10px] ltr:left-[10px] rtl:right-[10px] md:rtl:right-[50px] md:ltr:left-[50px] text-logoOrange  md:text-white">
          <FontAwesomeIcon icon={faAward} className="w-6 h-6" />
          <div className="w-fit h-fit text-[15px] ">{t('certifications')}</div>
        </div>

        {isFetching && (
          <div className="flex w-full gap-5 items-center px-6">
            <div className="w-1/2 md:w-1/3 lg:w-1/4">
              <CertificationCardShimmer />
            </div>
            <div className="w-1/2 md:w-1/3 lg:w-1/4">
              <CertificationCardShimmer />
            </div>
            <div className="hidden md:flex w-1/3 lg:w-1/4">
              <CertificationCardShimmer />
            </div>
            <div className="hidden lg:flex w-1/4">
              <CertificationCardShimmer />
            </div>
          </div>
        )}

        {!isFetching && certifications.length !== 0 && (
          <div className="w-full mx-auto relative px-4" ref={sliderRef}>
            <Slider
              prevArrow={<PrevArrow />}
              nextArrow={<NextArrow />}
              {...settings}
              className="w-full h-full px-2"
            >
              {certifications.map((cert) => (
                <div key={cert._id} className="p-2 flex h-full">
                  <CertificationCard
                    certification={cert}
                    myProfile={myProfile}
                  />
                </div>
              ))}
            </Slider>
          </div>
        )}

        {!isFetching && certifications.length === 0 && (
          <div className="w-full min-h-full p-5 flex flex-col space-y-3 text-logoOrange text-center items-center justify-center">
            <Certification className="w-[300px]" />
            <div>{t('no_certifications_yet')}</div>
          </div>
        )}
      </div>
    </div>
  );
}

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className={`absolute top-[250px] z-10 -left-[13px] rounded-full text-white p-1 w-fit bg-logoOrange `}
    >
      <ArrowLeft class="arrows" style={{ width: 16, height: 16 }} />
    </button>
  );
};

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className={` absolute top-[250px] z-10 -right-[14px] rounded-full text-white p-1 w-fit bg-logoOrange `}
    >
      <ArrowRight class="arrows" style={{ width: 16, height: 16 }} />
    </button>
  );
};
