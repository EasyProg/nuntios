import { FC } from "react";

export const LinkifyText: FC<{ text?: string }> = ({ text }) => {
  const urlRegex =
    /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;

  const linkify = (text?: string) => {
    const parts = [];
    let lastIndex = 0;
    let match;

    if (text) {
      while ((match = urlRegex.exec(text)) !== null) {
        if (match.index > lastIndex) {
          parts.push(text.substring(lastIndex, match.index));
        }

        const url = match[0];
        const href = url.startsWith("http") ? url : `https://${url}`;

        parts.push(
          <a
            key={match.index}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#44CBDA] wrap-anywhere"
          >
            {url}
          </a>,
        );

        lastIndex = match.index + url.length;
      }

      if (lastIndex < text.length) {
        parts.push(text.substring(lastIndex));
      }

      return parts;
    }
  };

  return <>{linkify(text)}</>;
};
