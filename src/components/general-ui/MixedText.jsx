import { useState } from 'react';

export default function MixedText({ text, className, maxlines = 5 }) {
  const [expanded, setExpanded] = useState(false);

  function toggleExpanded() {
    setExpanded((state) => !state);
  }

  const lines = text.split('\n');
  const displayLines = expanded ? lines : lines.slice(0, maxlines);

  const getLineDirection = (line) => {
    const trimmedLine = line.trim();
    const firstChar = trimmedLine
      .split('')
      .find((char) => /[a-zA-Z\u0600-\u06FF]/.test(char));
    if (!firstChar) {
      return 'ltr';
    }
    return /^[\u0600-\u06FF]/.test(firstChar) ? 'rtl' : 'ltr';
  };

  function replaceHashtags(line) {
    return line.replace(/#(\w+)/g, '<span class="text-logoOrange">#$1</span>');
  }

  return (
    <div className={className}>
      {displayLines.map((line, index) => {
        if (line === '') return <br></br>;
        if (line.startsWith('http'))
          return (
            <a className="text-logoOrange underline break-words" href={line}>
              {line}
            </a>
          );
        const direction = getLineDirection(line);
        return (
          <p
            className="break-words"
            dangerouslySetInnerHTML={{ __html: replaceHashtags(line) }}
            key={index}
            dir={direction}
          ></p>
        );
      })}
      {lines.length > maxlines && (
        <button onClick={toggleExpanded} className="text-logoOrange underline">
          {expanded ? 'Show less' : 'Read more'}
        </button>
      )}
    </div>
  );
}
