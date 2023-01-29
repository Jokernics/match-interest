import { doc } from "firebase/firestore";
import { useMemo, useState } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { useParams } from "react-router";
import { db } from "../../firebase";
import Game from "./Game/Game";
import { wordsType } from "../../types/types";
import { transformResponseWords } from "../../utils/utils";

export default function GamePage() {
  let { userId } = useParams() as {userId: string}
  const [res, loading, error] = useDocument(doc(db, "words", String(userId)));
  const [guestName, setGuestName] = useState("");

  const words = useMemo(() => transformResponseWords(res), [res]);

  if (loading) return <h2 className="mx-auto">Loading...</h2>;

  if (!words.length) return <h2 className="mx-auto">Ничего не найдено</h2>

  return (
    <div className="flex flex-col flex-grow overflow-hidden">
      {!!words.length && <Game {...{ guestName, words, userId }} />}
    </div>
  );
}
