import { TagCloud } from "@frank-mayer/react-tag-cloud";
import { memo, useEffect, useMemo, useState } from "react";
import { ReactComponent as LeftArrow } from "../../../assets/images/chevron_left.svg";
import { ReactComponent as RightArrow } from "../../../assets/images/chevron_right.svg";
import { splitArrayByLength } from "../../../utils/utils";

type props = {
  array: string[];
  radius: number;
  handleClick: (tag: string, event: MouseEvent) => void;
  className?: string;
};

export default memo(function SphereSlider({
  array,
  radius,
  handleClick,
  className = "",
}: props) {
  const fillingRatio = 0.045;
  const diameter = radius * 2;
  const maxWidth = window.innerWidth;
  let width = diameter > maxWidth ? maxWidth : diameter;
  const gap = 40;
  const maxLength = Math.round(fillingRatio * width);
  const chunkedArray = splitArrayByLength({ array, chunkLength: maxLength });
  const [sliderIndex, setSliderIndex] = useState(0);
  const isLeftBtnDisabled = useMemo(() => sliderIndex === 0, [sliderIndex]);
  const isRightBtnDisabled = useMemo(
    () => sliderIndex >= chunkedArray.length - 1,
    [chunkedArray.length, sliderIndex]
  );
  const sliderOffset = useMemo(
    () => (sliderIndex <= 0 ? 0 : sliderIndex * (width + gap)),
    [sliderIndex, width]
  );

  const handleSliderBtns = ({ direction }: { direction: "right" | "left" }) => {
    if (direction === "left" && !isLeftBtnDisabled) {
      setSliderIndex((i) => i - 1);
    }
    if (direction === "right" && !isRightBtnDisabled) {
      setSliderIndex((i) => i + 1);
    }
  };

  useEffect(() => {
    const handleResize = () => {};

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={`flex relative overflow-hidden ${className}`}
      style={{ minWidth: diameter, width: diameter }}
    >
      <div
        className="flex w-full scroll-smooth"
        style={{
          transform: `translateX(-${sliderOffset}px)`,
          transition: "transform .3s",
          gap,
        }}
      >
        {chunkedArray.map((words, i) => (
          <TagCloud
            key={i}
            options={(w: Window & typeof globalThis) => ({
              radius: radius,
              maxSpeed: "normal",
              initSpeed: "fast",
              direction: "110",
            })}
            onClick={handleClick}
            onClickOptions={{ passive: true }}
          >
            {words}
          </TagCloud>
        ))}
      </div>
      {chunkedArray.length > 1 && (
        <div
          className="animate__animated animate__fadeIn animate"
          style={{ animationDelay: "600ms" }}
        >
          <button
            disabled={isLeftBtnDisabled}
            onClick={() => handleSliderBtns({ direction: "left" })}
            className="z-40 fill-white disabled:fill-gray-400 absolute top-1/2 -translate-y-1/2 left-2"
          >
            <div className="relative h-6 w-6 overflow-hidden">
              <LeftArrow className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2" />
            </div>
          </button>
          <button
            disabled={isRightBtnDisabled}
            onClick={() => handleSliderBtns({ direction: "right" })}
            className="z-40 fill-white disabled:fill-gray-400 absolute top-1/2 -translate-y-1/2 right-2"
          >
            <RightArrow />
          </button>
        </div>
      )}
    </div>
  );
});
