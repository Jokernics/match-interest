import { auth } from "../../firebase";
import GuestsResultsSection from "./GuestsResultsSection/GuestsResultsSection";
import UserWordsSection from "./UserWordsSection/UserWordsSection";

export default function ProfilePage() {
  const uid = auth.currentUser?.uid!;

  return (
    <div className="h-full w-full flex flex-col gap-4" style={{fontSize: '1.1em'}}>
      <UserWordsSection {...{uid}} />
      <GuestsResultsSection {...{uid}} />
    </div>
  );
}
