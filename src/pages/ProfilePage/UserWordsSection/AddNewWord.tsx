import { SyntheticEvent, useState, useRef } from "react";
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
  const inputRef = useRef<HTMLInputElement | null>(null)

  const addNewWord = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!newWord.trim().length) return;

    let words = category[categoryName];
    words = [...words, newWord];
    const newData = [...data];
    newData[categoryIndex] = { [categoryName]: words };

    setNewWord("");
    setData(newData);
    inputRef?.current?.focus()
  };
  return (
    <form onSubmit={addNewWord} className="flex flex-wrap gap-2 w-full">
     <div className="flex flex-col grow sm:grow-0 overflow-auto">
        <MyInput
          ref={inputRef}
          placeholder="Новое слово"
          value={newWord}
          onChange={(e) => setNewWord(e.target.value)}
          type="search"
        />
     </div>
      <RoundedButton>Добавить</RoundedButton>
    </form>
  );
}
