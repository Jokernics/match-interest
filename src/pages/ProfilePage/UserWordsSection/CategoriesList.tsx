import { useMemo } from "react";
import { wordsType } from "../../../types/types";
import CategoryListItem from "./CategoryListItem";

type props = {
  data: wordsType;
  setData: React.Dispatch<React.SetStateAction<wordsType>>;
};

export default function CategoriesList({ data, setData }: props) {
  const maxCategoryWidth = useMemo(
    () => data.map((el) => Object.keys(el)[0]).sort((a, b) => b.length - a.length)[0].length,
    [data]
  );

  if (!data.length) return <h2>Слов нет, добавьте категорию</h2>;

  return (
    <div className="flex flex-col gap-3 ">
      {data.map((category, categoryIndex) => (
        <CategoryListItem
          key={categoryIndex}
          {...{ category, data, setData, categoryIndex, maxCategoryWidth }}
        />
      ))}
    </div>
  );
}
