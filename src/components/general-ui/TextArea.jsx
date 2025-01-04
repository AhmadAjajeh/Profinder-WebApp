import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';

const TextArea = forwardRef(
  (
    { placeholder, name, className, rows, maxLength, maxHeight, label },
    textareaRef
  ) => {
    const { t } = useTranslation();

    const autoResize = () => {
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = 'auto';
        const newHeight = textarea.scrollHeight + 4;

        textarea.style.height =
          newHeight > maxHeight ? `${maxHeight}px` : `${newHeight}px`;
      }
    };

    return (
      <div>
        {label && <lable className="text-sm font-light">{label}</lable>}
        <textarea
          ref={textareaRef}
          rows={rows}
          maxLength={maxLength}
          name={name | ''}
          className={`outline-none text-sm w-full resize-none my-auto  ${className}`}
          placeholder={t(placeholder)}
          onInput={autoResize}
        ></textarea>
      </div>
    );
  }
);

export default TextArea;
