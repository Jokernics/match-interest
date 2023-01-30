import { SyntheticEvent, useState } from "react";
import RoundedButton from "../../../components/shared/RoundedButton/RoundedButton";
import { categoryType, wordsType } from "../../../types/types";
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
  const [newWord, setNewWord] = useState("");

  const addNewWord = (e: SyntheticEvent) => {
    e.preventDefault();

    let words = category[categoryName];
    words = [...words, newWord];
    const newData = [...data];
    newData[categoryIndex] = { [categoryName]: words };

    setNewWord("");
    setData(newData);
  };

  const deleteCategory = () => {
    let newData = [...data];
    newData.splice(categoryIndex, 1);

    setData(newData);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 flex-col sm:flex-row">
        <div className="relative w-fit flex">
          <h5 className="rounded bg-amber-400 px-2 py-1 text-slate-800">
            {categoryIndex + 1}. {categoryName}
          </h5>
          <button
            onClick={deleteCategory}
            className="text-[8px] absolute top-[1px] right-[1px]"
          >
            &#10060;
          </button>
        </div>
        <form onSubmit={addNewWord} className="flex flex-wrap gap-2">
          <input
            placeholder="Новое слово"
            className="rounded outline-none px-2"
            value={newWord}
            onChange={(e) => setNewWord(e.target.value)}
            type="search"
          />
          <RoundedButton>Добавить</RoundedButton>
        </form>
      </div>
      {!!words.length && (
        <WordsList {...{ words, data, setData, categoryName, categoryIndex }} />
      )}
    </div>
  );
}
