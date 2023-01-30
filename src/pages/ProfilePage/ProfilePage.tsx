import Api from "../../API/API";
import RoundedButton from "../../components/shared/RoundedButton/RoundedButton";
import { auth } from "../../firebase";
import useTabs from "../../hooks/useTabs";
import GuestsResultsSection from "./GuestsResultsSection/GuestsResultsSection";
import UserWordsSection from "./UserWordsSection/UserWordsSection";

export default function ProfilePage() {
  const uid = auth.currentUser?.uid!;

  const tabData = [
    { name: "Слова", element: <UserWordsSection {...{ uid }} /> },
    { name: "Результаты", element: <GuestsResultsSection {...{ uid }} /> },
  ];

  const { tabNames, tabElement, tabIndex } = useTabs({ data: tabData });

  return (
    <div
      className="h-full w-full flex pb-2 rounded-xl overflow-hidden -ml-2 mr-2"
      style={{ fontSize: "1.1em" }}
    >
      <div
        style={{
          background:
            "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(150,150,181,0.24413515406162467) 100%, rgba(0,212,255,1) 100%)",
        }}
        className="flex flex-col items-start gap-3 pb-4 px-3 pt-3
          rounded-md
        "
      >
        {tabNames.map((Name, i) => {
          const activeClass = tabIndex === i ? "bg-slate-500" : "bg-slate-200";
          return (
            <Name
              key={i}
              className={`px-2 h-9 hover:bg-slate-500 transition-all rounded w-full text-black ${activeClass}`}
            />
          );
        })}
        <RoundedButton className="!w-full h-9 bg-red-600 hover:bg-red-900" onClick={() => Api.logout()}>
          Выйти
        </RoundedButton>
      </div>
      <div
        style={{
          background:
            "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(150,150,181,0.3) 100%, rgba(0,212,255,1) 100%)",
        }}
        className="px-3 pt-3 w-full flex justify-center overflow-hidden"
      >
        {tabElement}
      </div>
    </div>
  );
}
