"use client";

import { useState, useEffect } from "react";
import ProgressBarCircle from "@/assets/icons/ProgressBarCircle.svg";

type Props = {
  remaining?: number;
  used?: number;
};

export function ProgressBar({ remaining = 60, used = 40 }: Props) {
  const [pulse, setPulse] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    handleClick();
    setTimeout(() => {
      setShow(false);
    }, 2000);
  }, []);

  const handleClick = () => {
    setPulse(false);
    setShow(true);

    requestAnimationFrame(() => {
      setPulse(true);
    });

    setTimeout(() => {
      setPulse(false);
    }, 1000);
    // setTimeout(() => {
    //     setShow(false);
    // }, 2000);
  };

  const progress = remaining;
  return (
    <div className="w-full bg-container-main rounded-full h-5 relative border border-divider-main z-10">
      <div
        className="h-full rounded-full transition-all duration-300 ease-in-out"
        style={{
          width: `${progress < 4.2 ? 4.2 : progress}%`,
          background: "linear-gradient(90deg, #0179DB 0%, #014075 100%)",
        }}
      />

      <div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-300 ease-in-out -ml-2 flex items-center justify-center w-full h-full"
        style={{
          left: `clamp(16.5px, ${progress > 0 ? progress - 0.3 : progress}%, calc(100% - 1px))`,
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <img src={ProgressBarCircle} alt="" />
        </div>
        <button
          onMouseEnter={handleClick}
          onMouseLeave={() => setShow(false)}
          className={`h-3.25 w-3.25 rounded-ful bg-white cursor-pointer relative z-10 ${pulse ? "animate-pulse-ring" : ""}`}
        />
        <div className="absolute z-100 -ml-10">
          {/* {show && <Tag value={`${used}%`} label="Used" className="w-16" />} */}
        </div>
      </div>
    </div>
  );
}
