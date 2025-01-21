export default function Tag({ text, style }) {
  return (
    <span
      className={
        'bg-orange-100  text-logoOrange dark:bg-orange-400  dark:text-white transition p-1 rounded text-center ' +
        style
      }
    >
      {text}
    </span>
  );
}
