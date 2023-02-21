import { useMemo } from "react";
import EditableTitle from "../../../components/shared/EditableTitle";
import { categoryType, wordsType } from "../../../types/types";
import { getRandomRgba } from "../../../utils/utils";
import AddNewWord from "./AddNewWord";
import WordsList from "./WordsList";

type props = {
  category: categoryType;
  data: wordsType;
  setData: React.Dispatch<React.SetStateAction<wordsType>>;
  categoryIndex: number;
};

export default function CategoryListItem({
  category,
  data,
  setData,
  categoryIndex,
}: props) {
  const categoryName = Object.keys(category)[0];
  const words = category[categoryName];

  const deleteCategory = () => {
    let newData = [...data];
    newData.splice(categoryIndex, 1);

    setData(newData);
  };

  const changeCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const newData = [...data];
    const categoryData = Object.values(newData[categoryIndex])[0];

    newData[categoryIndex] = { [value]: categoryData };
    setData(newData);
  };

  const backgroundColor = useMemo(() => getRandomRgba(".3"), []);

  return (
    <div
      className="flex flex-col gap-2 rounded-md py-2 px-2"
      style={{ backgroundColor }}
    >
      <div className="flex gap-2 flex-col sm:flex-row flex-wrap w-full">
        <EditableTitle
          inputValue={categoryName}
          titleValue={`${categoryIndex + 1}. ${categoryName}`}
          onDelete={deleteCategory}
          onChange={changeCategory}
          className="!bg-amber-400 !text-slate-800 w-full sm:w-auto [&>input]:w-full [&>input]:sm:w-auto !justify-start"
        />
        <AddNewWord
          {...{ category, categoryIndex, categoryName, data, setData }}
        />
      </div>
      {!!words.length ? (
        <WordsList {...{ words, data, setData, categoryName, categoryIndex }} />
      ) : (
        <h2 className="text-center sm:text-left">Категория пуста</h2>
      )}
    </div>
  );
}
