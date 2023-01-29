import { wordsType } from "../../../types/types";
import WordsListItem from "./WordsListItem";

type props = {
  words: string[];
  data: wordsType;
  setData: React.Dispatch<React.SetStateAction<wordsType>>;
  categoryName: string;
  categoryIndex: number;
};

export default function WordsList({
  words,
  data,
  setData,
  categoryName,
  categoryIndex,
}: props) {
  return (
    <div className="flex gap-2 flex-wrap items-center">
      {words.map((word, wordIndex) => {
        return (
          <WordsListItem
            key={wordIndex}
            {...{ data, setData, categoryName, word, categoryIndex, wordIndex }}
          />
        );
      })}
    </div>
  );
}
