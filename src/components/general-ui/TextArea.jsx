import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';

const TextArea = forwardRef(
  (
    {
      placeholder,
      name,
      className,
      rows,
      maxLength,
      maxHeight,
      label,
      validation,
    },
    textareaRef
  ) => {
    const { t } = useTranslation();

    const autoResize = () => {
      const textarea = textareaRef.current;
      if (textarea && maxHeight) {
        textarea.style.height = 'auto';
        const newHeight = textarea.scrollHeight + 4;

        textarea.style.height =
          newHeight > maxHeight ? `${maxHeight}px` : `${newHeight}px`;
      }
    };

    return (
      <div>
        {label && <lable className="text-sm font-light">{t(label)}</lable>}
        <textarea
          ref={textareaRef}
          rows={rows}
          maxLength={maxLength}
          name={name || ''}
          className={`text-sm w-full resize-none my-auto  ${className}`}
          placeholder={placeholder}
          onInput={autoResize}
        ></textarea>
        {validation && (
          <div className="text-red-500 text-sm font-light">{t(validation)}</div>
        )}
      </div>
    );
  }
);

export default TextArea;
