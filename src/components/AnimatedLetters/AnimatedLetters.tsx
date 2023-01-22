import "./index.scss";
import AnimatedLetter from "./AnimatedLetter";
import { Fragment, useRef } from "react";

type prms = {
  start: number;
  word: string;
  animationTimeDivider?: number;
};

export default function AnimatedLetters({
  start,
  animationTimeDivider = 10,
  word,
}: prms) {
  const sum = useRef(start);

  return (
    <div className="flex flex-wrap justify-center">
      {word.split(" ").map((singleWord, i, arr) => {
        const index = sum.current;
        sum.current += singleWord.length + 1;

        return (
          <div key={singleWord + i}>
            {singleWord.split("").map((char, j) => (
              <Fragment key={singleWord + i + j}>
                <AnimatedLetter
                  i={index + j}
                  {...{ animationTimeDivider }}
                  char={char}
                />
              </Fragment>
            ))}
            {i !== arr.length - 1 && <span>&nbsp;</span>}
          </div>
        );
      })}
    </div>
  );
}
