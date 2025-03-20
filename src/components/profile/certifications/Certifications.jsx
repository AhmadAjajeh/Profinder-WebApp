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

  useEffect(() => {
    if (sliderRef.current) {
      const updateHeight = () => {
        setHeight(sliderRef.current.clientHeight);
      };

      updateHeight(); // Set initial height
      window.addEventListener('resize', updateHeight); // Adjust on resize

      return () => window.removeEventListener('resize', updateHeight);
    }
  }, []);

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 4, //Adjust based on how many you want to show at once
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024, // Tablet
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 800, // Mobile
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480, // Mobile
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="w-full bg-white h-[600px]  dark:bg-elementBlack p-4 shadow-md rounded-md border border-gray-300 dark:border-darkBorder">
      <div className="text-white bg-logoOrange px-2 py-1 mb-2 w-fit flex items-center gap-1">
        <FontAwesomeIcon icon={faAward} className="w-4 h-4  text-white" />
        <div className="font-light">{t('certifications')}</div>
      </div>
      {certifications.length !== 0 && (
        <div
          className="w-full mx-auto relative"
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
        <div className="w-full p-5 flex flex-col space-y-3 text-logoOrange text-center items-center justify-center">
          <Certification className="w-[300px]" />
          <div>{t('no_certifications_yet')}</div>
          {myProfile && <EditButton text={t('add_new_certfications')} />}
        </div>
      )}
    </div>
  );
}

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
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
  const { className, style, onClick } = props;
  return (
    <div
      onClick={onClick}
      className={` absolute top-[250px] z-10 -right-[14px] rounded-full text-white p-1 w-fit bg-logoOrange `}
    >
      <ArrowRight class="arrows" style={{ width: 16, height: 16 }} />
    </div>
  );
};
