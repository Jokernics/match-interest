import { doc } from "firebase/firestore";
import { useMemo } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import Loader from "../../../components/shared/Loader/Loader";
import { db } from "../../../firebase";
import GuestsResultsList from "./GuestsResultsList";

type props = {
  uid: string;
};

export default function GuestsResultsSection({ uid }: props) {
  const [res, loading, error] = useDocument(doc(db, "results", uid));
  const results = useMemo(
    () =>
      res?.exists() && res.data().hasOwnProperty("guests")
        ? res.data().guests
        : null,
    [res]
  );

  if (loading) return <Loader />

  if (error) return <h2>{JSON.stringify(error)}</h2>;

  if (!results) return <h2>Результаты отсутствуют</h2>

  return (
    <div className="flex flex-col gap-3 w-full ">
      <h2>Результаты:</h2>
      {results && <GuestsResultsList {...{ results }} />}
    </div>
  );
}
