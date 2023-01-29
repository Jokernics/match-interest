import { SyntheticEvent, useState } from "react";
import RoundedButton from "../../../components/shared/RoundedButton/RoundedButton";
import { categoryType, wordsType } from "../../../types/types";

type props = {
  setData: React.Dispatch<React.SetStateAction<wordsType>>;
};

export default function NewCategory({ setData }: props) {
  const [category, setCategory] = useState("");

  const addCategory = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!category.trim().length) return

    const newCategory = { [category]: [""] } as categoryType;
    setData((prev) => [newCategory, ...prev]);
  };

  return (
    <form onSubmit={addCategory} className="flex gap-2">
      <input
        placeholder="Новая категория"
        className="rounded outline-none px-2"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        type="search"
        
      />
      <RoundedButton className="text-center">Добавить</RoundedButton>
    </form>
  );
}
