import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

const Input = forwardRef(({ label, error, className = '', ...props }, ref) => {
  return (
    <div className={twMerge('space-y-1', className)}>
      {label && (
        <label className="block text-sm dark:text-white font-light">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={twMerge(
          'border rounded font-light px-3 py-2 w-full dark:bg-elementGray focus:outline-none focus:ring-1 focus:ring-logoOrange focus:border-logoOrange',
          error ? 'border-red-500' : 'border-gray-300 dark:border-darkBorder',
          className
        )}
        autoComplete="off"
        {...props}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
});

export default Input;
