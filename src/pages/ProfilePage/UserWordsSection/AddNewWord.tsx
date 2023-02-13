import { SyntheticEvent, useState } from "react";
import MyInput from "../../../components/shared/MyInput";
import RoundedButton from "../../../components/shared/RoundedButton/RoundedButton";
import { categoryType, wordsType } from "../../../types/types";

type props = {
  category: categoryType;
  data: wordsType;
  setData: React.Dispatch<React.SetStateAction<wordsType>>;
  categoryIndex: number;
  categoryName: string;
};

export default function AddNewWord({
  category,
  data,
  setData,
  categoryIndex,
  categoryName,
}: props) {
  const [newWord, setNewWord] = useState("");

  const addNewWord = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!newWord.trim().length) return;

    let words = category[categoryName];
    words = [...words, newWord];
    const newData = [...data];
    newData[categoryIndex] = { [categoryName]: words };

    setNewWord("");
    setData(newData);
  };
  return (
    <form onSubmit={addNewWord} className="flex flex-wrap gap-2 w-full">
      <MyInput
        placeholder="Новое слово"
        value={newWord}
        onChange={(e) => setNewWord(e.target.value)}
        type="search"
        className="grow sm:grow-0"
      />
      <RoundedButton>Добавить</RoundedButton>
    </form>
  );
}
