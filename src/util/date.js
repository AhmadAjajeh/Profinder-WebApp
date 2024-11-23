import i18next from "i18next";

export function timeAgo(createdAt) {
  const now = new Date();
  const createdDate = new Date(createdAt);
  const seconds = Math.floor((now - createdDate) / 1000);

  const intervals = {
    year: 365 * 24 * 60 * 60,
    month: 30 * 24 * 60 * 60,
    day: 24 * 60 * 60,
    hour: 60 * 60,
    minute: 60,
  };

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const count = Math.floor(seconds / secondsInUnit);
    if (count > 0) {
      return count === 1
        ? `${count} ${i18next.t(unit)}`
        : `${count} ${i18next.t(`${unit}s`)}`;
    }
  }

  return i18next.t("just_now");
}
