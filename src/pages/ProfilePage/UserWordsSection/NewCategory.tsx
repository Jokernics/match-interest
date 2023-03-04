import { SyntheticEvent, useState, useRef } from "react";
import MyInput from "../../../components/shared/MyInput";
import RoundedButton from "../../../components/shared/RoundedButton/RoundedButton";
import { categoryType, wordsType } from "../../../types/types";

type props = {
  data: wordsType;
  setData: React.Dispatch<React.SetStateAction<wordsType>>;
};

export default function NewCategory({ data, setData }: props) {
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const addCategory = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!category.trim().length) return;
    const categories = data.reduce(
      (acc, cur) => [...acc, Object.keys(cur)[0]],
      [] as string[]
    );
    if (
      categories.some(
        (el) => el.trim().toLowerCase() === category.trim().toLowerCase()
      )
    ) {
      setError("Такая группа уже существует");
      return;
    }

    const newCategory = { [category]: [] } as categoryType;
    setData((prev) => [newCategory, ...prev]);
    setCategory("");
    inputRef?.current?.focus();
  };

  return (
    <div className="flex gap-2 flex-wrap bg-gray-200/20 px-2 py-3 rounded-md mb-3">
      <form onSubmit={addCategory} className="flex gap-2 flex-wrap w-full">
        <div className="flex flex-col grow sm:grow-0 overflow-auto">
          <MyInput
            ref={inputRef}
            placeholder="Новая категория"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setError("");
            }}
          />
          {error && <h2 className="text-red-600">{error}</h2>}
        </div>
        <RoundedButton className="text-center">Добавить</RoundedButton>
      </form>
    </div>
  );
}
