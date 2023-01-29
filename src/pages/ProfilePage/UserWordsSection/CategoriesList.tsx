import { wordsType } from "../../../types/types";
import CategoryListItem from "./CategoryListItem";

type props = {
  data: wordsType;
  setData: React.Dispatch<React.SetStateAction<wordsType>>;
};

export default function CategoriesList({ data, setData }: props) {
  

  if (!data.length) return <h2>Слов нет, добавьте категорию</h2>
 
  return (
    <div className="flex flex-col gap-3 ">
      {data.map((category, categoryIndex) => (
        <CategoryListItem
          key={categoryIndex}
          {...{ category, data, setData, categoryIndex }}
        />
      ))}
    </div>
  );
}
