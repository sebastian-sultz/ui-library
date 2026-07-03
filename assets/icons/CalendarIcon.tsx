import type { SVGProps } from "react";

const CalendarIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <g clipPath="url(#clip0_1155_15290)">
        <path
          d="M11.6738 2.08553V1.87756C11.6738 1.6696 11.5042 1.5 11.2963 1.5C11.0883 1.5 10.9121 1.66961 10.9121 1.87756V2.84065H11.6738V2.08553Z"
          fill="currentColor"
        />
        <path
          d="M5.08814 2.06635V1.87756C5.08814 1.6696 4.91853 1.5 4.71057 1.5C4.50262 1.5 4.33301 1.66961 4.33301 1.87756V2.84065H5.08814V2.06635Z"
          fill="currentColor"
        />
        <path
          d="M1.5 12.083C1.5 13.4178 2.58182 14.4996 3.9166 14.4996H12.0834C13.4181 14.4996 14.5 13.4178 14.5 12.083V6.55518L1.50019 6.55518L1.5 12.083Z"
          fill="currentColor"
        />
        <path
          d="M4.73375 4.16181C4.52578 4.16181 4.35618 3.9922 4.35618 3.78424V2.84033H3.94101C2.60627 2.84033 1.52441 3.92215 1.52441 5.25693V5.83339H14.5002V5.25693C14.5002 3.92219 13.4184 2.84033 12.0836 2.84033H11.6684V3.78424C11.6684 3.9922 11.4988 4.16181 11.2909 4.16181C11.0829 4.16181 10.9133 3.9922 10.9133 3.78424V2.84033H5.11124V3.78424C5.11124 3.9922 4.9417 4.16181 4.73375 4.16181Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_1155_15290">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default CalendarIcon;
