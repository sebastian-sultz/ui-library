import type { SVGProps } from "react";

const EmptyState = ({ className, ...props }: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="174"
      height="190"
      viewBox="0 0 174 190"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <g filter="url(#filter0_d_4466_389731)">
        <rect
          x="49.8496"
          y="17"
          width="102"
          height="130"
          rx="10"
          transform="rotate(7.00293 49.8496 17)"
          fill="white"
        />
      </g>
      <circle
        cx="92.5448"
        cy="87.733"
        r="27"
        transform="rotate(7.00293 92.5448 87.733)"
        fill="#F5F8FF"
      />
      <path
        d="M95.8942 81.3959C95.8727 81.5714 93.8784 89.5845 93.7765 89.9283C93.5447 90.8502 92.6318 91.5102 91.6948 91.3951C90.7585 91.2801 90.0253 90.4775 90.03 89.4681C90.0926 77.3565 90.0507 81.5696 90.041 80.6769C90.0224 78.8924 91.6141 77.5434 93.3706 77.7592C95.0676 77.9676 96.3512 79.6109 95.8942 81.3959Z"
        fill="#0179DB"
      />
      <path
        d="M93.6803 95.5686C93.5215 96.8615 92.3419 97.783 91.049 97.6242C89.756 97.4653 88.8346 96.2858 88.9934 94.9929C89.1522 93.6999 90.3317 92.7785 91.6247 92.9373C92.9175 93.0969 93.839 94.2764 93.6803 95.5686Z"
        fill="#0179DB"
      />
      <g filter="url(#filter1_d_4466_389731)">
        <rect x="24" y="16" width="102" height="130" rx="10" fill="white" />
      </g>
      <circle cx="75" cy="81" r="27" fill="#F5F8FF" />
      <path
        d="M77.5509 74.3019C77.5509 74.4787 76.5485 82.6752 76.4892 83.0288C76.3716 83.9721 75.546 84.7385 74.6019 84.7385C73.6587 84.7385 72.833 84.0313 72.7146 83.0288C71.3001 71 71.7721 75.1867 71.6537 74.3019C71.4177 72.533 72.833 71 74.6028 71C76.3125 71 77.7869 72.4745 77.5509 74.3019Z"
        fill="#0179DB"
      />
      <path
        d="M77.0815 88.6389C77.0815 89.9415 76.0231 90.9999 74.7204 90.9999C73.4178 90.9999 72.3594 89.9416 72.3594 88.6389C72.3594 87.3362 73.4178 86.2778 74.7204 86.2778C76.0231 86.2787 77.0815 87.337 77.0815 88.6389Z"
        fill="#0179DB"
      />
      <defs>
        <filter
          id="filter0_d_4466_389731"
          x="11.1436"
          y="2.14355"
          width="162.802"
          height="187.179"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="8" />
          <feGaussianBlur stdDeviation="12" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.521569 0 0 0 0 0.52549 0 0 0 0 0.6 0 0 0 0.15 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_4466_389731"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_4466_389731"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_d_4466_389731"
          x="0"
          y="0"
          width="150"
          height="178"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="8" />
          <feGaussianBlur stdDeviation="12" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.521569 0 0 0 0 0.52549 0 0 0 0 0.6 0 0 0 0.15 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_4466_389731"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_4466_389731"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default EmptyState;
