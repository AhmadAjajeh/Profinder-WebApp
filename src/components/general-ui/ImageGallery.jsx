import React from 'react';
import Image from './Image';

export default function ImageGallery({
  images,
  width = '500px',
  height = '500px',
}) {
  const renderImages = () => {
    const count = images.length;

    if (count === 1) {
      return (
        <div className="flex justify-center" style={{ width, height }}>
          <Image src={images[0]} />
        </div>
      );
    } else if (count === 2) {
      return (
        <div
          className="grid grid-cols-1 grid-rows-2 gap-2"
          style={{ width, height }}
        >
          {images.map((image, index) => (
            <Image key={index} src={image} className="h-full mx-auto" />
          ))}
        </div>
      );
    } else if (count >= 3 && count <= 4) {
      return (
        <div className="grid grid-cols-2 gap-2" style={{ width, height }}>
          {images.map((image, index) => (
            <Image key={index} src={image} />
          ))}
        </div>
      );
    } else if (count > 4) {
      return (
        <div className="grid grid-cols-2 gap-2" style={{ width, height }}>
          {images.slice(0, 3).map((image, index) => (
            <Image key={index} src={image} />
          ))}
          <div className="relative">
            <Image src={images[3]} />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <span className="text-white font-bold text-lg">+{count - 4}</span>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="relative" style={{ width, height }}>
      {renderImages()}
    </div>
  );
}
