import { doc } from "firebase/firestore";
import { useMemo } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import Loader from "../../../components/shared/Loader/Loader";
import { db } from "../../../firebase";
import GameLink from "../GameLink";
import EditingSection from "./EditingSection";

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
    <div className="flex flex-col w-full gap-4">
      <EditingSection bdData={data} />
      <GameLink {...{ uid }} />
    </div>
  );
}
