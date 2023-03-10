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

  const { tabNames, TabElement, tabIndex } = useTabs({ data: tabData });

  return (
    <div
      className="flex flex-col grow rounded-xl px-3
          bg-gradient-to-r from-cyan-500/10 to-blue-500/25 
        "
    >
      <div
        className="flex items-start gap-3 pb-4  pt-3
            rounded-md overflow-auto
          "
      >
        {tabNames.map((TabName, i) => {
          const activeClass = tabIndex === i ? "bg-slate-500" : "bg-slate-200";
          return (
            <TabName
              key={i}
              className={`px-2 h-9 hover:bg-slate-500 transition-all rounded text-black ${activeClass}`}
            />
          );
        })}
        <RoundedButton
          className="h-9 bg-red-600 hover:bg-red-900 ml-auto"
          onClick={() => Api.logout()}
        >
          Выйти
        </RoundedButton>
      </div>
      <div className="py-3 w-full flex justify-center overflow-hidden">
        <TabElement/>
      </div>
    </div>
  );
}
