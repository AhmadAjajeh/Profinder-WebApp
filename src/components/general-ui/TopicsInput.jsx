import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PlusIcon, XIcon } from './IconsSvg';
import { range, uniqueArrayValues } from '../../util/validation';

export default function TopicsInput({
  topics,
  setTopics,
  validation,
  className,
}) {
  const { t } = useTranslation();
  const topicRef = useRef(null);
  const [topicsValidation, setTopicsValidation] = useState(null);

  const handleAddTopic = () => {
    const addedTopic = topicRef.current.value;

    if (topics.length === 5) {
      setTopicsValidation('no_more_than_five_topics');
      return;
    }
    if (!range(addedTopic, 2, 16)) {
      setTopicsValidation('topic_not_in_range');
      return;
    }
    if (!uniqueArrayValues([...topics, addedTopic])) {
      setTopicsValidation('topic_already_exists');
      return;
    }

    setTopicsValidation(null);

    setTopics((topics) => {
      return [...topics, addedTopic];
    });

    topicRef.current.value = '';
  };

  const handleRemoveTopic = (topic) => {
    setTopics((topics) => {
      return topics.filter((t) => t !== topic);
    });
  };

  return (
    <div>
      <div className="flex flex-col text-sm font-light space-y-2 ">
        <div>{t('topics')}</div>
        <div className="w-full relative">
          <input
            ref={topicRef}
            className="bg-elementLightGray dark:bg-elementGray w-full outline-none border border-gray-300 dark:border-darkBorder px-4 py-2 rounded-md"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddTopic();
              }
            }}
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

      {/* topics validation */}
      {(validation || topicsValidation) && (
        <div className="text-red-500 text-sm font-light mt-1">
          {t(validation || topicsValidation)}
        </div>
      )}

      {/* choosen topics display */}
      {topics.length > 0 && (
        <div className="text-sm flex flex-col space-x-3 rtl:space-x-reverse space-y-2 w-full rounded-md bg-gray-100 dark:bg-elementGray px-3 py-2 mt-2">
          <div className="text-sm flex flex-wrap gap-x-2 gap-y-1 w-full rounded-md bg-gray-100 dark:bg-elementGray px-3 ">
            {topics.map((topic) => (
              <div
                key={topic}
                className="p-1 w-fit  bg-logoOrange text-white rounded-md opacity-100 flex items-center space-x-3 rtl:space-x-reverse"
              >
                <div>{topic}</div>
                <button onClick={() => handleRemoveTopic(topic)} type="button">
                  <XIcon style="w-2 h-2" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
