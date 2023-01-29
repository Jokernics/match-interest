import React, { useState } from "react";
import AnimatedLetters from "../../components/shared/AnimatedLetters/AnimatedLetters";
import RoundedButton from "../../components/shared/RoundedButton/RoundedButton";

type props = {
  setGameStatus: React.Dispatch<React.SetStateAction<string>>;
};

export default function Description({ setGameStatus }: props) {
  const [animation, setAnimation] = useState("");
  const handleStart = () => {
    setAnimation("animate__zoomOutDown");

    setTimeout(() => {
      setGameStatus("started");
    }, 800);
  };

  const phrase1 = "match-of-interest test";
  const phrase2 = "Сейчас будет предложен список вариантов!";
  const phrase3 = "Надо выбрать знакомые темы!";

  return (
    <div
      className={`flex w-full h-full text-2xl flex-col gap-4 pt-4 items-center
        animate__animated ${animation}
    `}
    >
      <h2 className="uppercase">
        <AnimatedLetters animationTimeDivider={25} start={4} word={phrase1} />
      </h2>
      <h2>
        <AnimatedLetters
          animationTimeDivider={25}
          start={phrase1.length + 8}
          word={phrase2}
        />
      </h2>
      <h2>
        <AnimatedLetters
          animationTimeDivider={25}
          start={phrase1.length + phrase2.length + 8}
          word={phrase3}
        />
      </h2>
      <RoundedButton
        style={{ animation: "1s 3.5s both backInLeft" }}
        className="mt-2"
        onClick={handleStart}
      >
        Начать
      </RoundedButton>
    </div>
  );
}
