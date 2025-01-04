export default function Input({ label, className, name }) {
  return (
    <div>
      {label && (
        <label className="text-black dark:text-white  text-sm font-light">
          {label}
        </label>
      )}
      <input name={name} className={'block ' + className} />
    </div>
  );
}
