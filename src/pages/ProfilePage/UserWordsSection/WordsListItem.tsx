import { ChangeEvent, useState } from "react";
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
  const [isEditingMode, setIsEditingMode] = useState(true);

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

    if (!words.length) {
      newData = newData.filter((_, i) => i !== categoryIndex);
    } else {
      newData[categoryIndex][categoryName] = words;
    }

    setData(newData);
  };

  return (
    <div className="h-9 rounded bg-slate-600 pr-2 flex justify-center items-center overflow-hidden">
      {isEditingMode ? (
        <input
          onBlurCapture={() => setIsEditingMode(false)}
          onChange={editWord}
          value={word}
          className="h-full outline-none bg-inherit text-white px-2"
          size={word.length || 1}
          autoFocus
        />
      ) : (
        <h5
          onClick={() => {
            setIsEditingMode(true);
          }}
          className="h-full min-w-[10px] px-3 flex items-center"
        >
          {word}
        </h5>
      )}
      {!isEditingMode && (
        <button onClick={deleteWord} className="text-xs">
          &#10060;
        </button>
      )}
    </div>
  );
}
