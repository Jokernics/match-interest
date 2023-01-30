import { SyntheticEvent, useState } from "react";
import Api from "../../../API/API";
import RoundedButton from "../../../components/shared/RoundedButton/RoundedButton";
import { useFetch } from "../../../hooks/useFetch";
import { categoryType, wordsType } from "../../../types/types";
import SaveWordsBtn from "./SaveWordsBtn";

type props = {
  data: wordsType;
  setData: React.Dispatch<React.SetStateAction<wordsType>>;
};

export default function NewCategory({ data, setData }: props) {
  const [category, setCategory] = useState("");

  const addCategory = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!category.trim().length) return;

    const newCategory = { [category]: [""] } as categoryType;
    setData((prev) => [newCategory, ...prev]);
    setCategory("");
  };
  return (
    <div className="flex gap-2 flex-wrap">
      <form onSubmit={addCategory} className="flex gap-2 flex-wrap">
        <input
          placeholder="Новая категория"
          className="rounded outline-none px-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          type="search"
        />
        <RoundedButton className="text-center">Добавить</RoundedButton>
      </form>
      <SaveWordsBtn {...{ data }} />
    </div>
  );
}
