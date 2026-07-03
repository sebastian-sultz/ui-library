import type { SVGProps } from "react";

const Star = ({ className, ...props }: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 12 12"
      className={className}
      {...props}
    >
      <path
        d="M6 0C6.37329 3.14616 8.85384 5.62671 12 6C8.85384 6.37329 6.37329 8.85384 6 12C5.62671 8.85384 3.14616 6.37329 0 6C3.14616 5.62671 5.62671 3.14616 6 0Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default Star;
