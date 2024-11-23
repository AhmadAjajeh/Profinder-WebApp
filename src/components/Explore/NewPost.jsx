import { useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

import Modal from "../genera-ui/Modal";
import UserImage from "../genera-ui/UserImage";
import { useTranslation } from "react-i18next";
import { XIcon } from "../genera-ui/IconsSvg";
import { range } from "../../util/validation";
import { createPostMutation } from "../../http/home";
import { alertActions } from "../../store/alertSlice";
import { errorHandlingActions } from "../../store/errorHandlingSlice";
import TopicsInput from "../genera-ui/TopicsInput";
import ImagesUpload from "../genera-ui/ImagesUpload";
import { eventActions } from "../../store/dataSlice";

export default function NewPost() {
  const { t } = useTranslation();

  const [showModal, setShowModal] = useState(false);

  function handleShowNewPost() {
    setShowModal(true);
  }

  function handleCloseNewPost() {
    setShowModal(false);
  }

  return (
    <div className="w-full p-4 rounded-md shadow-sm border border-gray-300 dark:border-darkBorder focus:outline-none  bg-white dark:bg-elementBlack">
      <div className="w-full flex flex-row space-x-4 rtl:space-x-reverse">
        <UserImage className="w-12 h-12 rounded-full" />
        <button
          onClick={handleShowNewPost}
          className="w-full bg-gray-100 dark:bg-elementGray rounded-full text-gray-500 font-light text-sm focus:outline-none flex items-center px-3"
        >
          <span>{t("share_something_beneficial")}</span>
        </button>
        <AnimatePresence>
          {showModal && (
            <Modal
              lockScroll={true}
              onClose={handleCloseNewPost}
              bgDiv={true}
              className="inset-0 rounded-md dark:bg-elementBlack "
              animation={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { opacity: 1, scale: 1 },
              }}
            >
              <NewPostModal onClose={handleCloseNewPost} />
            </Modal>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function NewPostModal({ onClose }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const textareaRef = useRef(null);

  const [topics, setTopics] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  const [textValidation, setTextValidation] = useState(null);

  const { mutate } = useMutation({
    mutationFn: createPostMutation,
    onSuccess: (response) => {
      dispatch(
        alertActions.alert({
          messages: [response.message],
        })
      );
      dispatch(eventActions.set({ data: response.post, type: "new-post" }));
      onClose();
    },
    onError: (error) => {
      const messages = error.info?.message || [error.message];
      dispatch(
        errorHandlingActions.throwError({
          code: error.code,
          messages,
        })
      );
    },
  });

  const autoResize = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight + 4}px`;
    }
  };

  function handlePublishPost(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    let { text } = Object.fromEntries(formData);

    if (!range(text, 16, 4096)) {
      setTextValidation("text_not_in_range");
      return;
    }
    setTextValidation(null);

    if (selectedImages.length > 0) {
      selectedImages.forEach((image) => {
        formData.append("images", image);
      });
    }

    if (topics.length > 0) {
      topics.forEach((topic) => {
        formData.append("topics", topic);
      });
    }
    mutate(formData);
  }

  return (
    <div className="w-[400px] md:w-[550px] dark:bg-elementBlack dark:text-white flex flex-col py-3 px-4  rounded-md dark:border dark:border-darkBorder">
      {/* // Header */}
      <div className="w-full flex flex-row items-center justify-between mb-4 ">
        <div className="font-medium ">{t("create_post")}</div>
        <button type="button" className="text-gray-500" onClick={onClose}>
          <XIcon style="w-3 h-3" />
        </button>
      </div>
      {/* post creation form */}
      <form onSubmit={handlePublishPost}>
        {/* text area */}
        <div className="flex flex-row justify-start  space-x-2 rtl:space-x-reverse px-2 mb-4">
          <UserImage className="w-12 h-12 rounded-full" />
          <div className="text-gray-500 text-md font-light w-full">
            <textarea
              ref={textareaRef}
              rows="1"
              name="text"
              className="bg-inherit outline-none text-sm text-black dark:text-white w-full resize-none my-auto mt-[14px]"
              placeholder={t("share_something_beneficial")}
              onInput={autoResize}
            ></textarea>
          </div>
        </div>

        {/* text validation */}
        {textValidation && (
          <div className="text-red-500 text-sm font-light">
            {t(textValidation)}
          </div>
        )}

        {/* sperator */}
        <div
          id="separator"
          className="h-2 border-b border-gray-300 dark:border-darkBorder my-2  w-full"
        ></div>

        {/* topics area */}
        <div>
          <TopicsInput topics={topics} setTopics={setTopics} />
        </div>

        {/* sperator */}
        <div
          id="separator"
          className="h-2 border-b border-gray-300 dark:border-darkBorder my-2 w-full"
        ></div>

        {/* images section */}
        <div className="mb-4">
          <ImagesUpload
            selectedImages={selectedImages}
            setSelectedImages={setSelectedImages}
          />
        </div>

        {/* submit button */}
        <div className="w-full flex justify-end mb-2 mt-4">
          <button className="text-white text-sm bg-logoOrange hover:bg-orange-400 px-4 py-2 rounded-lg shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-transform focus:outline-none">
            {t("publish")}
          </button>
        </div>
      </form>
    </div>
  );
}
