import { useState } from "react";
import { wordsType } from "../../../types/types";
import CategoriesList from "./CategoriesList";
import NewCategory from "./NewCategory";

type props = {
  bdData: any;
};

export default function EditingSection({ bdData }: props) {
  const [data, setData] = useState<wordsType>(bdData);

  return (
    <div className="flex flex-col gap-5">
      <NewCategory {...{ data, setData }} />
      <CategoriesList {...{ data, setData }} />
    </div>
  );
}
