import React from "react";
import { cn } from "@/lib/utils";

interface NonDematIconProps extends React.HTMLAttributes<HTMLDivElement> {
  isin?: string;
  title?: string;
}

const NonDematIcon = ({
  isin = "64763872648234",
  title = "NON - DEMAT",
  className,
  ...props
}: NonDematIconProps) => {
  return (
    <div
      className={cn(
        "relative w-[189px] h-[60px] shrink-0 select-none overflow-visible",
        className,
      )}
      {...props}
    >
      <div className="absolute inset-0 flex justify-center items-center min-w-[189px] z-10">
        <div className="relative w-fit h-fit overflow-visible">
          <div className="absolute top-[-40px] left-1/2 -translate-x-1/2 w-[117px] h-[150px]  bg-white shadow-primary" />
          <div className="relative z-10 w-fit h-fit rounded-[8px] bg-[#FAFAFA] shadow-[0px_8px_24px_rgba(14,14,14,0.16)] flex items-center p-[0.56rem] gap-[8px]">
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              className="shrink-0"
            >
              <g filter="url(#filter0_i_585_100579)">
                <circle
                  cx="15"
                  cy="15"
                  r="13.4091"
                  stroke="#F5F5F5"
                  strokeWidth="3.18182"
                />
              </g>
              <g filter="url(#filter1_i_585_100579)">
                <circle cx="15.0003" cy="15.0003" r="12.2727" fill="#F5F5F5" />
              </g>
              <g filter="url(#filter2_i_585_100579)">
                <mask id="path-3-inside-1_585_100579" fill="white">
                  <path d="M22.3015 9.78C21.8876 9.35366 21.2027 9.3554 20.791 9.78383L12.8536 18.0429L9.25323 14.2511C8.82202 13.797 8.0963 13.8034 7.67316 14.265C7.29287 14.6799 7.29475 15.3172 7.67747 15.7299L12.361 20.7796C12.4251 20.8486 12.5016 20.9036 12.5862 20.9414C12.6707 20.9793 12.7616 20.9992 12.8536 21C12.9456 20.9992 13.0365 20.9793 13.1211 20.9414C13.2056 20.9036 13.2821 20.8486 13.3462 20.7796L22.3136 11.2303C22.6977 10.8213 22.6924 10.1826 22.3015 9.78Z" />
                </mask>
                <path
                  d="M12.8536 18.0429L10.5462 20.2338L12.8397 22.6491L15.1477 20.2476L12.8536 18.0429ZM12.361 20.7796L10.0282 22.9433L10.029 22.9442L12.361 20.7796ZM12.8536 21L12.8249 24.1817L12.8536 24.1819L12.8824 24.1817L12.8536 21ZM13.3462 20.7796L11.0267 18.6014L11.0204 18.6082L11.0142 18.6149L13.3462 20.7796ZM22.3136 11.2303L19.9942 9.05223L22.3136 11.2303ZM9.25323 14.2511L6.94587 16.442L9.25323 14.2511ZM20.791 9.78383L18.4968 7.57907L20.791 9.78383ZM20.791 9.78383L18.4968 7.57907L10.5595 15.8381L12.8536 18.0429L15.1477 20.2476L23.0851 11.9886L20.791 9.78383ZM12.8536 18.0429L15.161 15.8519L11.5606 12.0602L9.25323 14.2511L6.94587 16.442L10.5462 20.2338L12.8536 18.0429ZM7.67747 15.7299L5.3446 17.8936L10.0282 22.9433L12.361 20.7796L14.6939 18.6159L10.0103 13.5661L7.67747 15.7299ZM12.361 20.7796L10.029 22.9442C10.3792 23.3215 10.8052 23.6303 11.2865 23.8457L12.5862 20.9414L13.8858 18.0371C14.198 18.1768 14.471 18.3757 14.693 18.6149L12.361 20.7796ZM12.5862 20.9414L11.2865 23.8457C11.768 24.0612 12.2914 24.1769 12.8249 24.1817L12.8536 21L12.8824 17.8183C13.2319 17.8215 13.5734 17.8973 13.8858 18.0371L12.5862 20.9414ZM12.8536 21L12.8824 24.1817C13.4159 24.1769 13.9392 24.0612 14.4207 23.8457L13.1211 20.9414L11.8214 18.0371C12.1338 17.8973 12.4753 17.8215 12.8249 17.8183L12.8536 21ZM13.1211 20.9414L14.4207 23.8457C14.902 23.6303 15.328 23.3215 15.6782 22.9442L13.3462 20.7796L11.0142 18.6149C11.2363 18.3757 11.5092 18.1768 11.8214 18.0371L13.1211 20.9414ZM13.3462 20.7796L15.6656 22.9577L24.633 13.4085L22.3136 11.2303L19.9942 9.05223L11.0267 18.6014L13.3462 20.7796ZM22.3136 11.2303L24.633 13.4085C26.181 11.7601 26.1596 9.18601 24.5844 7.56361L22.3015 9.78L20.0187 11.9964C19.2252 11.1792 19.2144 9.88255 19.9942 9.05223L22.3136 11.2303ZM7.67316 14.265L5.32758 12.1151C3.82745 13.7517 3.83485 16.2658 5.3446 17.8936L7.67747 15.7299L10.0103 13.5661C10.7547 14.3686 10.7583 15.6081 10.0187 16.4149L7.67316 14.265ZM9.25323 14.2511L11.5606 12.0602C9.85959 10.2688 6.99678 10.294 5.32758 12.1151L7.67316 14.265L10.0187 16.4149C9.19582 17.3127 7.78445 17.3252 6.94587 16.442L9.25323 14.2511ZM20.791 9.78383L23.0851 11.9886C22.2492 12.8583 20.8589 12.8618 20.0187 11.9964L22.3015 9.78L24.5844 7.56361C22.9163 5.84547 20.1562 5.85248 18.4968 7.57907L20.791 9.78383Z"
                  fill="#F5F5F5"
                  mask="url(#path-3-inside-1_585_100579)"
                />
              </g>
              <defs>
                <filter
                  id="filter0_i_585_100579"
                  x="0"
                  y="-1"
                  width="30"
                  height="31"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                  />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="-1" />
                  <feGaussianBlur stdDeviation="2.5" />
                  <feComposite
                    in2="hardAlpha"
                    operator="arithmetic"
                    k2="-1"
                    k3="1"
                  />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="shape"
                    result="effect1_innerShadow_585_100579"
                  />
                </filter>
                <filter
                  id="filter1_i_585_100579"
                  x="2.38647"
                  y="2.54563"
                  width="24.8865"
                  height="24.7278"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                  />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dx="-0.454762" dy="-0.181905" />
                  <feGaussianBlur stdDeviation="0.170536" />
                  <feComposite
                    in2="hardAlpha"
                    operator="arithmetic"
                    k2="-1"
                    k3="1"
                  />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.836328 0 0 0 0 0.830203 0 0 0 0 0.830203 0 0 0 0.58 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="shape"
                    result="effect1_innerShadow_585_100579"
                  />
                </filter>
                <filter
                  id="filter2_i_585_100579"
                  x="7.38918"
                  y="8.46094"
                  width="15.209"
                  height="12.5391"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                  />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="-1" />
                  <feGaussianBlur stdDeviation="2.5" />
                  <feComposite
                    in2="hardAlpha"
                    operator="arithmetic"
                    k2="-1"
                    k3="1"
                  />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="shape"
                    result="effect1_innerShadow_585_100579"
                  />
                </filter>
              </defs>
            </svg>

            <div className="flex flex-col gap-[0px] min-w-0 ">
              <span
                className="bg-clip-text text-transparent leading-normal uppercase truncate"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "1.25rem",
                  fontWeight: 900,
                  background: "linear-gradient(96deg, #858699 0%, #ABACC2 98%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {title}
              </span>

              {isin && (
                <span
                  className="leading-normal truncate"
                  style={{
                    color: "#858699",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "0.5rem",
                    fontWeight: 300,
                    letterSpacing: "0.00875rem",
                  }}
                >
                  ISIN: {isin}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NonDematIcon;
