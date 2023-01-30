import { DocumentData, DocumentSnapshot } from "firebase/firestore";
import { wordsType } from "./../types/types";

export const transformResponseWords = (
  res: DocumentSnapshot<DocumentData> | undefined
) => {
  if (res?.exists() && res.data().hasOwnProperty("categories")) {
    const categories = res.data().categories as wordsType;
    const data = categories.reduce((acc, cur) => {
      let words = Object.values(cur)[0];
      words = words.filter((str) => str.trim().length);
      return [...acc, ...words];
    }, [] as string[]);

    return data;
  } else {
    return [];
  }
};



