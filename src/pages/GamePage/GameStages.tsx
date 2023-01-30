import { useRef, useState } from "react";
import Sphere from "./Sphere/Sphere";
import DescriptionStage from "./Stages/DescriptionStage";
import FarewellStage from "./Stages/FarewellStage";
import GuestNameStage from "./Stages/GuestNameStage";

type props = {
  words: string[];
  userId: string;
};

export default function GameStages({ words, userId }: props) {
  const [gameStatus, setGameStatus] = useState("guestNameEntry");
  const guestName = useRef<string>("");

  if (gameStatus === "description")
    return <DescriptionStage {...{ setGameStatus }} />;

  if (gameStatus === "started")
    return (
      <Sphere
        {...{ setGameStatus, words, userId }}
        guestName={guestName.current}
      />
    );
  if (gameStatus === "ended") return <FarewellStage />;

  return <GuestNameStage {...{ guestName, setGameStatus }} />;
}
