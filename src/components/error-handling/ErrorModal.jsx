import { useDispatch, useSelector } from "react-redux";
import Modal from "../genera-ui/Modal";
import { errorHandlingActions } from "../../store/errorHandlingSlice";
import { useTranslation } from "react-i18next";
import { getDirection } from "../../util/lang";

export default function ErrorModal({ error, color }) {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  function handleClose() {
    dispatch(errorHandlingActions.clearError());
  }

  const errorMessage = error.messages[0];

  return (
    <Modal
      animation={{
        hidden: { y: 0, opacity: 0, scale: 0.6 },
        visible: { y: 20, opacity: 1, scale: 1 },
      }}
    >
      <div class="max-w-md">
        <div
          class={`w-full flex flex-row items-center px-4 py-2 space-x-4 rtl:space-x-reverse `}
        >
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
          <div class="text-slate-600 text-sm">{errorMessage}</div>
        </div>
      </div>
    </Modal>
  );

  // return (
  //   <Modal onClose={handleClose} open={error.code !== 0}>
  //     <div class={" rounded-lg border-2 border-slate-400 px-12 py-6 " + color}>
  //       <div class="flex flex-col items-center justify-center ">
  //         <div class="rounded-full p-5 mb-2 border border-red-500 bg-red-200">
  //           <svg
  //             version="1.0"
  //             class="w-10 text-red-500 fill-current m-auto"
  //             xmlns="http://www.w3.org/2000/svg"
  //             viewBox="0 0 512 512"
  //           >
  //             <path d="M244.1 37.5c-7.8 2.2-14.6 6.2-20.5 12.1-4 4.1-27.8 42.9-110.8 180.5C54.7 326.6 6.1 407.7 4.7 410.5c-11.7 23.7-.1 52.5 25 62.7l5.8 2.3h441l5.8-2.3C507.7 462.9 519 434 507 410c-4.2-8.4-212.6-353.7-215.9-357.7-4.2-5.1-12.4-10.9-18.9-13.3-7.5-2.9-20.7-3.6-28.1-1.5zm16.2 32.9c1.8.7 4.1 2.4 5.3 3.7C268.9 77.8 477.1 423.8 478 427c1.7 5.9-2 12.5-8.3 14.9-4 1.5-423.4 1.5-427.4 0-6.3-2.4-10-9-8.3-14.9.9-3.2 209.1-349.2 212.4-352.9 2.1-2.4 7-5 9.4-5.1.7 0 2.7.6 4.5 1.4z" />
  //             <path d="M247 174.6c-5.3 1.7-8.1 3.8-10.9 8.5-1.9 3.1-2.1 5-2.1 18.9 0 8.5.7 31.2 1.5 50.5.9 19.2 1.9 43.2 2.3 53.2.8 19.9 1 20.6 7.7 24.1 4.7 2.5 16 2.2 21.2-.6 6.5-3.4 7-5 7.8-28.2.3-11.3 1.3-34.2 2.1-51 1.7-37.2 1.8-62.3.3-65.3-5-9.7-17.7-14-29.9-10.1zM250.7 354.1c-14.5 3.5-21.9 20-15.1 33.7 5.5 11.2 18.5 16 29.4 11.1 9.6-4.3 14.4-11.7 14.4-21.9 0-7.2-2.2-12.5-7.1-17.2-5.2-5-14.5-7.4-21.6-5.7z" />
  //           </svg>
  //         </div>
  //         <div class="text-lg text-red-500 font-semibold mb-2 text-center">
  //           {t("something_went_wrong")}
  //         </div>
  //         <div class="dark:text-slate-200 font-light text-slate-500 max-w-lg text-center mb-5">
  //           {errorMessage}
  //         </div>
  //         <button
  //           onClick={handleClose}
  //           class="bg-red-500 text-white px-8 py-3 rounded-lg"
  //         >
  //           Ok
  //         </button>
  //       </div>
  //     </div>
  //   </Modal>
  // );
}
