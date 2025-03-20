import { useTranslation } from 'react-i18next';
import CertificationCard from './CertificationCard';
import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
import { faAward } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Certification from '../../general-ui/Certification';
import EditButton from '../../general-ui/EditButton';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function Certifications({ myProfile, certifications }) {
  const { t } = useTranslation();

  const [height, setHeight] = useState(0);
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
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="relative  w-full bg-white h-[600px]  dark:bg-elementBlack shadow-md rounded-md border border-gray-300 dark:border-darkBorder">
      <div className="absolute  bg-logoOrange min-h-[600px] min-w-28 max-w-28 hidden md:flex md:rtl:mr-[40px] md:ltr:ml-[40px]"></div>
      <div className="py-4 h-full">
        <div className="sticky z-10 flex flex-row items-center justify-center gap-1 mx-[50px]">
          <FontAwesomeIcon icon={faAward} className="text-white w-5 h-5" />
          <div className="w-full h-fit text-white">{t('certifications')}</div>
        </div>
        {certifications.length !== 0 && (
          <div
            className="w-full mx-auto relative px-4"
            ref={sliderRef}
            style={{ height }}
          >
            <Slider
              prevArrow={<PrevArrow />}
              nextArrow={<NextArrow />}
              {...settings}
              className="w-full h-full px-2"
            >
              {certifications.map((cert) => (
                <div key={cert._id} className="p-2 flex h-full">
                  <CertificationCard certification={cert} />
                </div>
              ))}
            </Slider>
          </div>
        )}
        {certifications.length === 0 && (
          <div className="w-full min-h-full p-5 flex flex-col space-y-3 text-logoOrange text-center items-center justify-center">
            <Certification className="w-[300px]" />
            <div>{t('no_certifications_yet')}</div>
            {myProfile && <EditButton text={t('add_new_certfications')} />}
          </div>
        )}
      </div>
    </div>
  );
}

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      className={`absolute top-[250px] z-10 -left-[13px] rounded-full text-white p-1 w-fit bg-logoOrange `}
    >
      <ArrowLeft class="arrows" style={{ width: 16, height: 16 }} />
    </div>
  );
};

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      className={` absolute top-[250px] z-10 -right-[14px] rounded-full text-white p-1 w-fit bg-logoOrange `}
    >
      <ArrowRight class="arrows" style={{ width: 16, height: 16 }} />
    </div>
  );
};
