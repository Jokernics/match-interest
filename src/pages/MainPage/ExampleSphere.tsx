import { useCallback, useEffect, useState } from "react";
import { TagCloud } from "@frank-mayer/react-tag-cloud";
import { data } from "../../data";

export default function ExampleSphere() {
  const [radius, setRadius] = useState(calcRadius());

  function calcRadius() {
    return Math.min(window.innerWidth, window.innerHeight) / 2.5;
  }

  useEffect(() => {
    const handleResize = () => {
      setRadius(calcRadius());
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClick = useCallback((tag: string, event: MouseEvent) => {
    const target = event.target as Element;
    const text = target.textContent;
    const isTagCloudItem = target.classList.contains("tagcloud--item");

    if (!target || !text) return;

    if (isTagCloudItem) {
      const isSelected = target.classList.contains("selected");

      if (isSelected) {
        target.classList.remove("selected");
      } else {
        target.classList.add("selected");
      }
    }
  }, []);
  return (
    <div
      className="flex flex-col items-center justify-center grow overflow-clip"
      style={{ height: calcRadius() }}
    >
      <TagCloud
        options={(w: Window & typeof globalThis) => ({
          radius: radius,
          maxSpeed: "normal",
          initSpeed: "fast",
          direction: "110",
        })}
        onClick={handleClick}
        onClickOptions={{ passive: true }}
        className=" text-lg animate__animated animate__zoomIn"
      >
        {data.flat()}
      </TagCloud>
    </div>
  );
}
