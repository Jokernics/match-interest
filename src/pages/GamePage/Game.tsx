import { useRef, useState } from "react";
import Description from "./Description";
import EndScreen from "./EndScreen";
import GuestNameEntry from "./GuestNameEntry";
import Sphere from "./Sphere/Sphere";

type props = {
  words: string[];
  userId: string;
};

export default function Game({ words, userId }: props) {
  const [gameStatus, setGameStatus] = useState("guestNameEntry");
  const guestName = useRef<string>("");

  if (gameStatus === "description")
    return <Description {...{ setGameStatus }} />;

  if (gameStatus === "started")
    return (
      <Sphere
        {...{ setGameStatus, words, userId }}
        guestName={guestName.current}
      />
    );
  if (gameStatus === "ended") return <EndScreen />;

  return <GuestNameEntry {...{ guestName, setGameStatus }} />;
}
