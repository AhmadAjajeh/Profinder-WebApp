import { useRef, useState } from "react";
import Modal from "../genera-ui/Modal";
import UserImage from "../genera-ui/UserImage";
import { useTranslation } from "react-i18next";
import { AnimatePresence } from "framer-motion";
import { PlusIcon, XIcon } from "../genera-ui/IconsSvg";
import { range, uniqueArrayValues } from "../../util/validation";
import { useMutation } from "@tanstack/react-query";
import { createPostMutation } from "../../http/home";
import { useDispatch } from "react-redux";
import { alertActions } from "../../store/alertSlice";
import { errorHandlingActions } from "../../store/errorHandlingSlice";

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
    <div className="w-full p-4 rounded-md shadow-sm border border-gray-300 dark:border-darkBorder  bg-white dark:bg-elementBlack">
      <div className="w-full flex flex-row space-x-4 rtl:space-x-reverse">
        <UserImage className="w-10 h-10 rounded-full" />
        <button
          onClick={handleShowNewPost}
          className="w-full bg-gray-100 dark:bg-elementGray rounded-full text-gray-500 font-light text-sm flex items-center px-3"
        >
          <span>{t("share_something_beneficial")}</span>
        </button>
        <AnimatePresence>
          {showModal && (
            <Modal
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
  const [textValidation, setTextValidation] = useState(null);

  const [topics, setTopics] = useState([]);
  const [topicsValidation, setTopicsValidation] = useState(null);
  const topicRef = useRef(null);

  const { mutate, isLoading } = useMutation({
    mutationFn: createPostMutation,
    onSuccess: (response) => {
      dispatch(alertActions.alert({ messages: [response.message] }));
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

  const handleAddTopic = () => {
    const addedTopic = topicRef.current.value;

    if (topics.length === 5) {
      setTopicsValidation("no_more_than_five_topics");
      return;
    }
    if (!range(addedTopic, 2, 16)) {
      setTopicsValidation("topic_not_in_range");
      return;
    }
    if (!uniqueArrayValues([...topics, addedTopic])) {
      setTopicsValidation("topic_already_exists");
      return;
    }

    setTopics((topics) => {
      return [...topics, addedTopic];
    });

    topicRef.current.value = "";
  };

  const handleRemoveTopic = (topic) => {
    setTopics((topics) => {
      return topics.filter((t) => t !== topic);
    });
  };

  function handlePublishPost(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    let { text } = Object.fromEntries(formData);

    if (!range(text, 16, 4096)) {
      setTextValidation("text_not_in_range");
      return;
    } else {
      setTextValidation(null);
    }

    const requestBody = { topics, text };
    mutate(requestBody);
  }

  return (
    <div className="w-[400px] md:w-[550px] dark:bg-elementBlack dark:text-white flex flex-col py-3 px-4  rounded-md dark:border dark:border-darkBorder">
      <div className="w-full flex flex-row items-center justify-between mb-4 ">
        <div className="font-medium ">{t("create_post")}</div>
        <button type="button" className="text-gray-500" onClick={onClose}>
          <XIcon style="w-3 h-3" />
        </button>
      </div>

      <form onSubmit={handlePublishPost}>
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
        {textValidation && (
          <div className="text-red-500 text-sm font-light">
            {t(textValidation)}
          </div>
        )}
        <div
          id="separator"
          className="h-2 border-b border-gray-300 dark:border-darkBorder mb-2  w-full"
        ></div>
        <div className="flex flex-col text-sm font-light space-y-2 ">
          <div>{t("topics")}</div>
          <div className="w-full relative">
            <input
              ref={topicRef}
              className="bg-inherit w-full outline-none border border-gray-300 dark:border-darkBorder px-4 py-2 rounded-md"
            />
            <button
              onClick={handleAddTopic}
              type="button"
              className="absolute top-[9px] ltr:right-3 rtl:left-3 rounded-sm bg-elementBlack dark:bg-white p-1 text-white dark:text-black"
            >
              <PlusIcon style="w-3 h-3" />
            </button>
          </div>
        </div>
        {topicsValidation && (
          <div className="text-red-500 text-sm font-light mt-1">
            {t(topicsValidation)}
          </div>
        )}
        {topics.length > 0 && (
          <div className="text-sm flex flex-col space-x-3 rtl:space-x-reverse space-y-2 w-full rounded-md bg-gray-100 dark:bg-elementGray px-3 py-2 mt-2">
            <div className="text-sm flex flex-wrap gap-x-2 gap-y-1 w-full rounded-md bg-gray-100 dark:bg-elementGray px-3 ">
              {topics.map((topic) => (
                <div
                  key={topic}
                  className="p-1 w-fit  bg-logoOrange text-white rounded-md opacity-100 flex items-center space-x-3 rtl:space-x-reverse"
                >
                  <div>{topic}</div>
                  <button
                    onClick={() => handleRemoveTopic(topic)}
                    type="button"
                  >
                    <XIcon style="w-2 h-2" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="w-full flex justify-end mb-2 mt-4">
          <button className="text-white text-sm bg-logoOrange hover:bg-orange-400 px-4 py-2 rounded-lg shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-transform">
            {t("publish")}
          </button>
        </div>
      </form>
    </div>
  );
}
