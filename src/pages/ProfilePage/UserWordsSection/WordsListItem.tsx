import { ChangeEvent } from "react";
import EditableTitle from "../../../components/shared/EditableTitle";
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
    <EditableTitle
      onChange={editWord}
      onDelete={deleteWord}
      inputValue={word}
      titleValue={word}
    />
  );
}
