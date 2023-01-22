import { TagCloud } from "@frank-mayer/react-tag-cloud";
import { useCallback, useMemo, useState } from "react";
import { data } from "../../data";
import { useFetch } from "../../hooks/useFetch";
import { sendTelegramMessage } from "../../utils/utils";
import RoundedButton from "../shared/RoundedButton/RoundedButton";
import "./index.scss";

type props = {
  setGameStatus: React.Dispatch<React.SetStateAction<string>>;
};

export default function Sphere({ setGameStatus }: props) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isFinish, setIsFinish] = useState(false);
  const [counter, setCounter] = useState(0);
  const { makeReq, isLoading, error } = useFetch();

  const sphereAnimation = useMemo(
    () => (isFinish ? "animate__zoomOut" : "animate__zoomIn"),
    [isFinish]
  );
  const buttonAnimation = useMemo(
    () => (isFinish ? "animate__fadeOut" : "animate__fadeIn"),
    [isFinish]
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

  const finish = async () => {
    const user = window.location.pathname.split("/")[1] || "strange";
    const items = !!selectedItems.length ? selectedItems : ["Это Габэлла"];
    const message = items.reduce((acc, cur) => acc + "%0A" + cur, `${user}%0A`);

    return sendTelegramMessage({ message }).then((res) => {
      if (res.ok) {
        setIsFinish(true);

        setTimeout(() => {
          setGameStatus("ended");
        }, 800);
      } else {
        throw res;
      }
    });
  };

  const Cloud = useMemo(() => {
    // const words = windowWidth < 400 ? data : [data.flat()];
    const words = [data.flat()];

    return words.map((data, i) => (
      <TagCloud
        key={i}
        options={(w: Window & typeof globalThis) => ({
          radius: Math.min(w.innerWidth, w.innerHeight) / 1.8,
          maxSpeed: "normal",
          initSpeed: "fast",
          direction: "110",
        })}
        onClick={handleClick}
        onClickOptions={{ passive: true }}
      >
        {data}
      </TagCloud>
    ));
  }, [handleClick]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center select-none relative">
      <div
        className={`absolute right-5 top-0 z-20 flex justify-center items-center gap-3 mt-2
          animate__animated ${buttonAnimation}
        `}
        style={{ animationDelay: isFinish ? "0s" : ".7s" }}
      >
        {error && <p className="text-yellow-400">Произошла ошибка {error}</p>}
        <RoundedButton onClick={() => makeReq(finish())} isLoading={isLoading}>
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
