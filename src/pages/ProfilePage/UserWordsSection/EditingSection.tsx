import { useState } from "react";
import { wordsType } from "../../../types/types";
import CategoriesList from "./CategoriesList";
import NewCategory from "./NewCategory";
import SaveWordsBtn from "./SaveWordsBtn";

type props = {
  bdData: any;
};

export default function EditingSection({ bdData }: props) {
  const [data, setData] = useState<wordsType>(bdData);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col">
        <NewCategory {...{ data, setData }} />
        <div className="px-2 w-full">
          <div className="w-full mb-5 h-[2px] rounded-3xl bg-zinc-100"></div>
        </div>
        <CategoriesList {...{ data, setData }} />
      </div>
      <SaveWordsBtn {...{ data }} />
    </div>
  );
}
