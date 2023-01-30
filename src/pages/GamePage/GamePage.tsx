import { doc } from "firebase/firestore";
import { useMemo } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { useParams } from "react-router";
import { db } from "../../firebase";
import { transformResponseWords } from "../../utils/utils";
import Game from "./Game";

export default function GamePage() {
  let { userId } = useParams() as { userId: string };
  const [res, loading, error] = useDocument(doc(db, "words", String(userId)));

  const words = useMemo(() => transformResponseWords(res), [res]);

  if (loading) return <h2 className="mx-auto">Loading...</h2>;

  if (error) return <h2>{JSON.stringify(error)}</h2>;

  if (!words.length) return <h2 className="mx-auto">Ничего не найдено</h2>;

  return (
    <div className="flex flex-col flex-grow">
      {!!words.length && <Game {...{ words, userId }} />}
    </div>
  );
}
