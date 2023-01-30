import { useState } from "react";
import "./index.scss";

export default function StarfallBackground() {
  const defaultArray = Array.from({ length: 1 }).map((_, i) => i);
  const [stars, setStars] = useState(defaultArray);

  const handleAimationEnd = (
    i: number,
    animation: React.AnimationEvent<HTMLDivElement>
  ) => {
    // console.log(animation)
    if (animation.animationName === "fall") {
      // console.log('yes')
      setStars((prev) =>
        prev.map((j) => {
          if (i === j) return j + 9;
          return j;
        })
      );
    }
  };

  return (
    <div className="starfall-stars text-white">
      {stars.map((i) => (
        <div
          style={{
            right: '1000px'
          }}
          // style={{
          //   left: -Math.floor((Math.random() * window.innerWidth)) + 1,
          // }}
          onAnimationEnd={(e) => handleAimationEnd(i, e)}
          key={i}
          className={`star animated-star`}
        ></div>
      ))}
    </div>
  );
}
