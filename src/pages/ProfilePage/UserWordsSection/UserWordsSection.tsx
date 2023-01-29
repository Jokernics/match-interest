import { doc } from "firebase/firestore";
import { useMemo, useState } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { db } from "../../../firebase";
import EditingSection from "./EditingSection";
import GameLink from "../GameLink";
import Loader from "../../../components/shared/Loader/Loader";

type props = {
  uid: string;
};

export default function UserWordsSection({ uid }: props) {
  const [res, loading, error] = useDocument(doc(db, "words", uid));
  const data = useMemo(
    () =>
      res?.exists() && res.data().hasOwnProperty("categories")
        ? res.data().categories
        : [],
    [res]
  );
  
  if (loading) return <Loader />;

  if (error) return <h2>{JSON.stringify(error)}</h2>;

  return (
    <div className="flex flex-col gap-4">
      <EditingSection bdData={data} />
      <GameLink {...{ uid }} />
    </div>
  );
}
