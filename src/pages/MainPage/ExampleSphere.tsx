import { useCallback, useEffect, useState } from "react";
import SphereSlider from "../../components/shared/SphereSlider/SphereSlider";
import { data } from "../../data";
import { useAllEnabledWidthDiv } from "../../hooks/useAllEnabledWidthDiv";

export default function ExampleSphere() {
  const { Div, height } = useAllEnabledWidthDiv();

  const [radius, setRadius] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const calculatedRadius = Math.min(window.innerWidth, height) / 2
      setRadius(calculatedRadius - 2);
    };
    handleResize()
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [height]);

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
    <Div
      className="flex items-center justify-center grow text-lg 
      animate__animated animate__zoomIn"
    >
      {height !== 0 && (
        <SphereSlider
          array={data.flat()}
          handleClick={handleClick}
          radius={radius}
        />
      )}
    </Div>
  );
}
