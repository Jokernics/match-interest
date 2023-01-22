import { useState } from "react";
import AnimatedLetters from "../AnimatedLetters/AnimatedLetters";
import Description from "../Description/Description";
import Sphere from "../Sphere/Sphere";

export default function Game() {
  const [gameStatus, setGameStatus] = useState("description");

  if (gameStatus === "started") return <Sphere {...{ setGameStatus }} />;
  if (gameStatus === "ended")
    return (
      <h2 className="my-auto text-3xl">
        <AnimatedLetters start={1} word="Спасибо за внимание *)" />
      </h2>
    );

  return (
    <div className="w-full h-full text-2xl">
      <Description {...{ setGameStatus }} />
    </div>
  );
}
