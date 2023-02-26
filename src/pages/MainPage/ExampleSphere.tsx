import { useCallback, useEffect, useState } from "react";
import { TagCloud } from "@frank-mayer/react-tag-cloud";
import { data } from "../../data";
import SphereSlider from "../../components/shared/SphereSlider/SphereSlider";

export default function ExampleSphere() {
  const [radius, setRadius] = useState(calcRadius());

  function calcRadius() {
    return Math.min(window.innerWidth, window.innerHeight) / 2.4;
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
      className="flex items-center justify-center grow overflow-clip text-lg 
      animate__animated animate__zoomIn"
    >
      <SphereSlider
        array={data.flat()}
        handleClick={handleClick}
        radius={radius}
      />
    </div>
  );
}
