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

  const addNewWord = () => {
    let words = category[categoryName];
    words = [...words, " "];
    const newData = [...data];

    newData[categoryIndex] = { [categoryName]: words };
    setData(newData);
  };

  return (
    <div className="flex gap-2">
      <h5 className="rounded flex items-center justify-center bg-amber-400 px-4 py-1 shrink-0">
        {categoryName}
      </h5>
      <button className="translate-y-[-3px] px-2 text-4xl" onClick={addNewWord}>
        +
      </button>
      {!!words.length && (
        <WordsList {...{ words, data, setData, categoryName, categoryIndex }} />
      )}
    </div>
  );
}
