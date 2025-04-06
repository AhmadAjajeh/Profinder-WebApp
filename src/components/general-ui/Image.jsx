import React, { useState } from 'react';

export default function Image({ src, alt, className }) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  return (
    <div className={className + 'w-full'}>
      {isLoading && (
        <div className="font-light text-xs text-center bg-gray-100 dark:bg-gray-500 min-w-full h-full">
          Loading...
        </div>
      )}
      {hasError && (
        <div className="font-light text-xs text-center bg-gray-100 dark:bg-gray-500 min-w-full h-full">
          Failed to load image
        </div>
      )}
      <img
        src={src}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        className={className}
        style={{ display: isLoading || hasError ? 'none' : 'block' }}
      />
    </div>
  );
}
