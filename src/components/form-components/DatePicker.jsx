import { twMerge } from 'tailwind-merge';

const DatePicker = ({ label, error, className = '', ...props }) => {
  return (
    <div className={twMerge('space-y-1', className)}>
      {label && (
        <label className="block text-sm dark:text-white font-light">
          {label}
        </label>
      )}
      <input
        type="date"
        className={twMerge(
          'border rounded px-3 py-2 w-full font-light outline-none focus:ring-1  dark:bg-elementGray dark:text-white focus:ring-logoOrange focus:border-logoOrange',
          error ? 'border-red-500' : 'border-gray-300 dark:border-darkBorder',
          className
        )}
        {...props}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default DatePicker;
