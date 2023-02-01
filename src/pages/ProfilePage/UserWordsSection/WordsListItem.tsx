import { ChangeEvent, useState } from "react";
import MyInput from "../../../components/shared/MyInput";
import { wordsType } from "../../../types/types";

type props = {
  data: wordsType;
  setData: React.Dispatch<React.SetStateAction<wordsType>>;
  categoryName: string;
  word: string;
  categoryIndex: number;
  wordIndex: number;
};

export default function WordsListItem({
  data,
  setData,
  categoryName,
  word,
  categoryIndex,
  wordIndex,
}: props) {
  const [isEditingMode, setIsEditingMode] = useState(false);

  const editWord = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const newData = [...data];
    newData[categoryIndex][categoryName][wordIndex] = value;
    setData(newData);
  };

  const deleteWord = () => {
    let newData = [...data];
    const words = newData[categoryIndex][categoryName];
    words.splice(wordIndex, 1);

    setData(newData);
  };

  return (
    <div className="min-h-[2.25rem] rounded bg-slate-600 pr-2 flex justify-center items-center overflow-hidden relative">
      {isEditingMode ? (
        <MyInput
          onBlur={() => setIsEditingMode(false)}
          autoFocus
          onChange={editWord}
          value={word}
          size={word.length - 1 < 1 ? 2 : word.length - 1}
        />
      ) : (
        <h5
          onClick={() => {
            setIsEditingMode(true);
          }}
          className="h-full whitespace-nowrap overflow-auto min-w-[2.3em] pl-1 pr-2 flex items-center"
        >
          {word}
        </h5>
      )}
      {!isEditingMode && (
        <button
          onClick={deleteWord}
          className="text-[8px] absolute top-[1px] right-[1px]"
        >
          &#10060;
        </button>
      )}
    </div>
  );
}
