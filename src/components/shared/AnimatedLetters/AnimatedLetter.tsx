import React, { useMemo, useState } from "react";

type prms = {
  i: number;
  char: string;
  animationTimeDivider: number;
};

export default function AnimatedLetter({
  i,
  animationTimeDivider,
  char,
}: prms) {
  const [letterClass, setletterClass] = useState("text-animate");

  const handleAnimationEnd = () => {
    setletterClass("");
  };

  const handleMouseMove = () => {
    if (!letterClass) setletterClass("text-animate-hover");
  };

  const isHoverAnimation = useMemo(
    () => letterClass === "text-animate-hover",
    [letterClass]
  );
  
  return (
    <span
      className={`${letterClass} text`}
      style={{
        animationDelay: `${isHoverAnimation ? 0 : i / animationTimeDivider}s`,
      }}
      key={char + i}
      onAnimationEnd={handleAnimationEnd}
      onMouseMove={handleMouseMove}
    >
      {char}
    </span>
  );
}
