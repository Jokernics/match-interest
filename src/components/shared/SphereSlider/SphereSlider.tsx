import { TagCloud } from "@frank-mayer/react-tag-cloud";
import { useEffect, useRef } from "react";
import { ReactComponent as LeftArrow } from "../../../assets/images/chevron_left.svg";
import { ReactComponent as RightArrow } from "../../../assets/images/chevron_right.svg";
import { splitArrayByLength } from "../../../utils/utils";

type props = {
  array: string[];
  radius: number;
  handleClick: (tag: string, event: MouseEvent) => void;
  className?: string;
};

export default function SphereSlider({
  array,
  radius,
  handleClick,
  className = "",
}: props) {
  const fillingRatio = 0.045;
  const diameter = radius * 2;
  const maxLength = Math.round(fillingRatio * diameter);
  console.log(fillingRatio, diameter, maxLength);
  const chunkedArray = splitArrayByLength({ array, chunkLength: maxLength });

  const sliderRef = useRef<HTMLDivElement>(null);
  const sliderLeftBtn = useRef<HTMLButtonElement>(null);
  const sliderRightBtn = useRef<HTMLButtonElement>(null);

  const handleSlider = (isLeft = true) => {
    const slider = sliderRef.current;

    if (slider) {
      
      const offset = Math.ceil(diameter) + 20;
      let scrollLeft = slider.scrollLeft;

      if (isLeft) {
        scrollLeft -= offset;
      } else {
        scrollLeft += offset;
      }

      const container = sliderRef.current;
      const sliderLeft = sliderLeftBtn.current;
      const sliderRight = sliderRightBtn.current;
      if (sliderLeft && sliderRight && container) {
        sliderLeft.disabled = scrollLeft <= 0;
        sliderRight.disabled =
          container.offsetWidth + scrollLeft >= container.scrollWidth;
      }

      slider.scrollLeft = scrollLeft;
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const container = sliderRef.current;
      const sliderLeft = sliderLeftBtn.current;
      const sliderRight = sliderRightBtn.current;
      if (!sliderLeft || !sliderRight || !container) return;
      const isScroll = container.scrollWidth > container.clientWidth;

      if (isScroll) {
        sliderLeft.style.display = "block";
        sliderRight.style.display = "block";
        sliderLeft.disabled = container.scrollLeft <= 0;
        sliderRight.disabled =
          container.offsetWidth + container.scrollLeft >= container.scrollWidth;
      } else {
        sliderLeft.style.display = "none";
        sliderRight.style.display = "none";
        container.style.width = "auto";
      }
    };
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  console.log(chunkedArray);
  return (
    <div className={`flex relative ${className}`} style={{ width: diameter }}>
      <div
        className="flex gap-5 w-full overflow-hidden scroll-smooth "
        ref={sliderRef}
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
      <button
        ref={sliderLeftBtn}
        className="z-999 fill-white disabled:fill-gray-400 absolute top-1/2 -translate-y-1/2 -left-4"
      >
        <LeftArrow onClick={() => handleSlider()} />
      </button>
      <button
        ref={sliderRightBtn}
        className="z-999 fill-white disabled:fill-gray-400 absolute top-1/2 -translate-y-1/2 -right-4"
      >
        <RightArrow onClick={() => handleSlider(false)} />
      </button>
    </div>
  );
}
