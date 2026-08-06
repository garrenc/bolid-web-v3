import React, { useId } from "react";

interface SocialLinksProps {
  className?: string;
  linkClassName?: string;
}

const SocialLinks: React.FC<SocialLinksProps> = ({
  className = "social-links-header",
  linkClassName = "social-link",
}) => {
  const maxGradientId = `max-icon-gradient-${useId().replace(/:/g, "")}`;

  return (
    <div className={className}>
      <a
        href="https://vk.com/radiobolid"
        target="_blank"
        rel="noopener noreferrer"
        className={linkClassName}
        aria-label="VKontakte"
      >
        <svg width="50" height="50" viewBox="0 0 24 24">
          <rect width="24" height="24" rx="5" fill="#0077FF" />
          <path
            fill="#FFFFFF"
            d="M19.38 8.64c.12-.39 0-.68-.58-.68h-1.92c-.49 0-.72.26-.84.55 0 0-.98 2.39-2.37 3.94-.45.45-.65.6-.9.6-.12 0-.31-.15-.31-.57V8.64c0-.49-.14-.68-.55-.68H8.89c-.31 0-.49.23-.49.45 0 .47.69.57.76 1.88v2.83c0 .62-.11.74-.36.74-.65 0-2.23-2.4-3.17-5.15-.18-.53-.37-.75-.87-.75H2.84c-.55 0-.66.26-.66.55 0 .51.65 3.03 3.03 6.36 1.59 2.28 3.82 3.52 5.85 3.52 1.23 0 1.38-.28 1.38-.75v-1.72c0-.55.12-.66.51-.66.29 0 .78.15 1.94 1.26 1.32 1.32 1.54 1.92 2.28 1.92h1.92c.55 0 .83-.28.67-.82-.18-.54-.82-1.33-1.67-2.28-.45-.53-1.14-1.1-1.35-1.39-.29-.37-.21-.53 0-.86 0 0 2.38-3.35 2.63-4.48Z"
          />
        </svg>
      </a>
      <a
        href="https://t.me/bolidfmBot"
        target="_blank"
        rel="noopener noreferrer"
        className={linkClassName}
        aria-label="Telegram"
      >
        <svg width="50" height="50" viewBox="0 0 24 24">
          <rect width="24" height="24" rx="5" fill="#26A5E4" />
          <path
            fill="#FFFFFF"
            d="M18.61 6.57c.3-.12.58.13.5.44l-2.12 10c-.08.4-.56.58-.9.34l-3.27-2.42-1.67 1.6c-.29.28-.77.14-.86-.25l-.7-3.05-2.97-.98c-.39-.13-.42-.67-.05-.84l12.04-4.84Zm-2.4 2.36-5.83 3.62.55 2.39.37-1.55c.04-.16.13-.3.26-.4l4.65-4.06Z"
          />
        </svg>
      </a>
      <a
        href="https://max.ru/id5902187170_1_bot"
        target="_blank"
        rel="noopener noreferrer"
        className={linkClassName}
        aria-label="MAX"
      >
        <svg width="50" height="50" viewBox="0 0 24 24">
          <defs>
            <linearGradient
              id={maxGradientId}
              x1="3"
              y1="21"
              x2="21"
              y2="3"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#35C8F4" />
              <stop offset="0.52" stopColor="#246BFE" />
              <stop offset="1" stopColor="#A43AF7" />
            </linearGradient>
          </defs>
          <rect width="24" height="24" rx="5" fill={`url(#${maxGradientId})`} />
          <path
            fill="#FFFFFF"
            fillRule="evenodd"
            d="M12.08 5.12c-4.03 0-7.3 2.93-7.3 6.55v4.78c0 .8.87 1.3 1.56.89l1.35-.81c1.2.85 2.72 1.35 4.39 1.35 4.03 0 7.3-2.78 7.3-6.21s-3.27-6.55-7.3-6.55Zm0 3.08c2.2 0 3.98 1.55 3.98 3.46 0 1.8-1.78 3.13-3.98 3.13-.94 0-1.8-.24-2.48-.67l-.83-.52-.87.52.1-1.12-.11-.42a3.05 3.05 0 0 1-.13-.92c0-1.91 1.88-3.46 4.32-3.46Z"
          />
        </svg>
      </a>
    </div>
  );
};

export default SocialLinks;
