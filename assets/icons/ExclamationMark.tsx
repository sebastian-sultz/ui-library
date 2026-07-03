


import type { SVGProps } from "react";

const ExclamationMark = ({ className, ...props }: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 14 14"
      className={className}
      {...props}
    >
      <path
        d="M8.08352 2.94571C8.08352 3.04394 7.5266 7.59753 7.4937 7.79402C7.42836 8.31805 6.96966 8.74385 6.44518 8.74385C5.92115 8.74385 5.46246 8.35094 5.39667 7.79402C4.61084 1.11133 4.87309 3.43729 4.8073 2.94571C4.67618 1.96299 5.46246 1.11133 6.44566 1.11133C7.3955 1.11133 8.21463 1.9305 8.08352 2.94571Z"
        fill="currentColor"
      />
      <path
        d="M7.82261 10.9113C7.82261 11.635 7.23462 12.223 6.51091 12.223C5.78721 12.223 5.19922 11.635 5.19922 10.9113C5.19922 10.1876 5.78721 9.59961 6.51091 9.59961C7.2346 9.60007 7.82261 10.1881 7.82261 10.9113Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default ExclamationMark;
