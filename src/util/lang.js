import i18next from 'i18next';

export function getDirection() {
  return i18next.dir();
}

export function getLanguage() {
  return i18next.language;
}
