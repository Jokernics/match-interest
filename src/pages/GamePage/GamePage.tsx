import { doc } from "firebase/firestore";
import { useMemo } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { useParams } from "react-router";
import Loader from "../../components/shared/Loader/Loader";
import { db } from "../../firebase";
import { transformResponseWords } from "../../utils/utils";
import GameStages from "./GameStages";

export default function GamePage() {
  let { userId } = useParams() as { userId: string };
  const [res, loading, error] = useDocument(doc(db, "words", String(userId)));

  const words = useMemo(() => transformResponseWords(res), [res]);

  if (loading) return <Loader />

  if (error) return <h2>{JSON.stringify(error)}</h2>;

  if (!words.length) return <h2 className="mx-auto">Ничего не найдено</h2>;

  return (
    <div className="flex flex-col grow">
      {!!words.length && <GameStages {...{ words, userId }} />}
    </div>
  );
}
