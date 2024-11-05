import { useTranslation } from "react-i18next";
import { TickIcon } from "../genera-ui/IconsSvg";
import TopSideModal from "../genera-ui/TopSideModal";

export default function AlertTopModal({ alert, color }) {
  const { t } = useTranslation();

  const alertMessage = alert.messages[0];

  return (
    <TopSideModal className="bg-gray-50 border border-gray-300 dark:border-darkBorder">
      <div class="text-green-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-7"
          viewBox="0 0 512 512"
        >
          <path
            d="m255.625-.313 3.085.007c14.609.05 28.94.3 43.29 3.306l2.954.602C344.003 11.77 380.464 27.39 412 52l2.715 2.074C421.479 59.342 427.797 65.09 434 71l1.82 1.732c8.335 7.996 15.979 16.21 22.86 25.491 1.36 1.832 2.741 3.646 4.125 5.46 6.368 8.428 12 17.124 17.195 26.317l1.1 1.91c21.61 37.748 31.377 80.517 31.212 123.715l-.006 3.085c-.05 14.609-.3 28.94-3.306 43.29l-.602 2.954C500.23 344.003 484.61 380.464 460 412l-2.074 2.715C452.658 421.479 446.91 427.797 441 434c-.858.9-.858.9-1.732 1.82-8.009 8.348-16.233 15.993-25.53 22.883a277.948 277.948 0 0 0-5.105 3.926C377.68 486.534 340.293 501.847 302 509l-2.44.492c-30.045 5.874-64.691 4.782-94.56-1.492l-3.077-.633C164.687 499.455 130.06 483.285 100 460l-2.723-2.078C90.52 452.652 84.201 446.908 78 441l-1.82-1.732c-8.348-8.009-15.993-16.233-22.883-25.53a277.948 277.948 0 0 0-3.926-5.105C25.466 377.68 10.153 340.293 3 302l-.492-2.44C-2.965 271.57-2.846 237.912 3 210l.602-2.954C13.898 157.827 36.334 114.398 71 78l1.728-1.815c7.998-8.337 16.212-15.983 25.495-22.866 1.832-1.36 3.646-2.74 5.46-4.124 8.428-6.368 17.124-12 26.317-17.195l1.91-1.1C169.658 9.29 212.427-.477 255.625-.312Z"
            fill="#4BAE4F"
          />
          <path
            d="M361.025 136.309c2.425.848 3.804 2.026 5.706 3.75l2.117 1.92c3.508 3.295 6.937 6.663 10.336 10.072l2.245 2.242c1.55 1.55 3.099 3.1 4.646 4.652 2.377 2.382 4.759 4.759 7.142 7.135l4.53 4.533 2.161 2.156 1.984 1.994 1.75 1.753c1.941 2.122 2.342 3.346 2.67 6.234-.685 7.128-6.791 12.015-11.63 16.823-1.11 1.113-1.11 1.113-2.24 2.249-2.473 2.48-4.952 4.953-7.432 7.427l-5.327 5.338c-4.32 4.327-8.643 8.65-12.97 12.97a15646.802 15646.802 0 0 0-15.108 15.109 46833.603 46833.603 0 0 1-28.593 28.581 31230.13 31230.13 0 0 0-24.523 24.525 45430.624 45430.624 0 0 1-31.525 31.532l-1.51 1.51c-3.511 3.508-7.02 7.02-10.527 10.532-4.72 4.726-9.447 9.448-14.176 14.166-1.736 1.733-3.471 3.469-5.204 5.206-2.362 2.368-4.731 4.73-7.101 7.09l-2.082 2.095c-3.99 3.958-7.53 7.467-13.176 8.722-8.053-1.579-14.97-11.264-20.586-16.893l-2.737-2.733c-2.455-2.45-4.906-4.903-7.357-7.356-2.574-2.577-5.15-5.152-7.727-7.726-4.32-4.318-8.637-8.638-12.954-12.96-4.985-4.99-9.974-9.978-14.965-14.963a21867.12 21867.12 0 0 1-12.885-12.882c-2.56-2.561-5.12-5.121-7.681-7.68-2.851-2.848-5.699-5.7-8.545-8.552l-2.565-2.558-2.348-2.357-2.039-2.04c-2.845-3.044-4.626-5.023-5.424-9.175.653-3.918 1.101-4.665 3.647-7.46l1.93-2.12a488.488 488.488 0 0 1 10.318-10.572l2.31-2.313c1.596-1.597 3.193-3.193 4.792-4.787 2.455-2.45 4.904-4.904 7.353-7.36l4.67-4.665 2.222-2.229 2.054-2.045 1.807-1.804c2.044-1.874 3.406-2.373 6.147-2.895 8.396 1.244 15.243 11.29 20.988 17.16 2.099 2.142 4.207 4.273 6.315 6.406a3264.13 3264.13 0 0 1 11.702 11.886c2.722 2.781 5.455 5.55 8.197 8.31a506.915 506.915 0 0 1 3.105 3.168 471.651 471.651 0 0 0 4.335 4.388l2.484 2.527c2.023 1.847 2.023 1.847 4.033 1.593 3.281-1.389 5.465-3.789 7.923-6.29l1.713-1.709c1.898-1.894 3.784-3.8 5.67-5.705l4.071-4.074c3.688-3.692 7.367-7.392 11.045-11.095 3.845-3.867 7.7-7.726 11.552-11.586 7.3-7.313 14.591-14.634 21.88-21.957a48861.065 48861.065 0 0 1 39.21-39.342c4.592-4.604 9.18-9.21 13.767-13.82 2.848-2.862 5.698-5.722 8.549-8.582 1.325-1.33 2.65-2.662 3.974-3.994 1.8-1.813 3.605-3.623 5.41-5.431l1.6-1.617c3.699-3.697 5.49-5.303 10.877-4.427Z"
            fill="#FEFEFE"
          />
        </svg>
      </div>
      <div class="text-slate-600 text-sm">{t(alertMessage)}</div>
    </TopSideModal>
  );
}
