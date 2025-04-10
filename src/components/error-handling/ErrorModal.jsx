import { useTranslation } from 'react-i18next';
import TopSideModal from '../general-ui/TopSideModal';

export default function ErrorModal({ error, color }) {
  const { t } = useTranslation();

  const errorMessage = error.messages[0];

  return (
    <TopSideModal>
      <div class="text-red-600">
        <svg
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          class="w-7 fill-current"
          viewBox="0 0 512 512"
        >
          <path d="M237.1 1c-49.2 4.1-95.7 21.5-133.7 50-56.3 42.4-91.5 102.7-101 173-2.3 16.8-2.3 47.2 0 64 7.8 57.6 32.5 108 73 148.6 89.8 89.8 231.5 100.2 333.2 24.2 49-36.5 83.7-89.9 96.8-148.8 8-36.4 8-75.7 0-112C482.2 95.9 394.9 16.3 289 2.6c-15-2-38.8-2.7-51.9-1.6zm-53.7 155.2c3.5 1 9.5 6.5 38.4 35.2l34.2 34 34.3-34c35.5-35.4 36.8-36.4 44.8-36.4 11.1 0 21.9 10.8 21.9 21.9 0 8-1 9.3-36.4 44.8l-34 34.3 34 34.3c35.4 35.5 36.4 36.8 36.4 44.8 0 11.1-10.8 21.9-21.9 21.9-8 0-9.3-1-44.8-36.4l-34.3-34-34.2 34C186.2 356 184.9 357 176.9 357c-11.1 0-21.9-10.8-21.9-21.9 0-8 1-9.3 36.4-44.9l34-34.2-34-34.3C156 186.2 155 184.9 155 176.9c0-10.8 10.7-21.7 21.4-21.9 1.6 0 4.7.5 7 1.2z" />
        </svg>
      </div>
      <div class="text-slate-600 text-sm">{t(errorMessage)}</div>
    </TopSideModal>
  );
}
