import { TagCloud } from "@frank-mayer/react-tag-cloud";
import { useCallback, useEffect, useMemo, useState } from "react";
import { data } from "../../../data";
import { useFetch } from "../../../hooks/useFetch";
import RoundedButton from "../../../components/shared/RoundedButton/RoundedButton";
import "./index.scss";
import Api from "../../../API/API";

type props = {
  setGameStatus: React.Dispatch<React.SetStateAction<string>>;
  words: string[];
  userId: string;
  guestName: string;
  isAnimation?: boolean;
};

export default function Sphere({
  setGameStatus,
  words,
  userId,
  guestName,
  isAnimation = true,
}: props) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isFinish, setIsFinish] = useState(false);
  const [counter, setCounter] = useState(0);
  const calcRadius = () =>
    Math.min(window.innerWidth, window.innerHeight) / 2.5;
  const [radius, setRadius] = useState(calcRadius());
  const { makeReq, isLoading, error } = useFetch();

  useEffect(() => {
    const handleResize = () => {
      setRadius(calcRadius());
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sphereAnimation = useMemo(
    () => isAnimation && (isFinish ? "animate__zoomOut" : "animate__zoomIn"),
    [isAnimation, isFinish]
  );
  const buttonAnimation = useMemo(
    () => isAnimation && (isFinish ? "animate__fadeOut" : "animate__fadeIn"),
    [isAnimation, isFinish]
  );

  const handleClick = useCallback((tag: string, event: MouseEvent) => {
    const target = event.target as Element;
    const text = target.textContent;
    const isTagCloudItem = target.classList.contains("tagcloud--item");

    if (!target || !text) return;

    if (isTagCloudItem) {
      const isSelected = target.classList.contains("selected");

      if (isSelected) {
        target.classList.remove("selected");
        setSelectedItems((arr) => arr.filter((el) => el !== text));
        setCounter((number) => number - 1);
      } else {
        target.classList.add("selected");
        setSelectedItems((arr) => [...arr, text]);
        setCounter((number) => number + 1);
      }
    }
  }, []);

  const finish = useCallback(async () => {
    const user = window.location.pathname.split("/")[1] || "strange";
    const items = !!selectedItems.length ? selectedItems : ["Это Габэлла"];
    const stat = `${user}: ${selectedItems.length}/${data.flat().length}%0A`;
    const message = items.reduce((acc, cur) => acc + "%0A" + cur, stat);

    const result = {
      [guestName]: {
        total: words.length,
        answers: selectedItems,
      },
    };

    await Api.updateGuestResult(result, userId);
    setIsFinish(true);

    setTimeout(() => {
      setGameStatus("ended");
    }, 800);

    // return sendTelegramMessage({ message }).then((res) => {
    //   if (res.ok) {
    //     setIsFinish(true);

    //     setTimeout(() => {
    //       setGameStatus("ended");
    //     }, 800);
    //   } else {
    //     throw res;
    //   }
    // });
  }, [guestName, selectedItems, setGameStatus, userId, words.length]);

  const Cloud = useMemo(
    () => (
      <TagCloud
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
    ),
    [handleClick, radius, words]
  );

  return (
    <div className="flex flex-col grow justify-center items-center select-none relative">
      <div
        className={`absolute right-5 top-0 z-20 flex justify-center items-center gap-3 mt-2
          animate__animated ${buttonAnimation}
        `}
        style={{ animationDelay: isFinish ? "0s" : ".7s" }}
      >
        {error && <p className="text-yellow-400">Произошла ошибка {error}</p>}
        <RoundedButton onClick={() => makeReq(finish)} isLoading={isLoading}>
          Закончить
        </RoundedButton>
        <h2 className="text-white">{counter}</h2>
      </div>

      <div
        className={`flex flex-col animate__animated tagcloud ${sphereAnimation}`}
      >
        {Cloud}
      </div>
    </div>
  );
}
