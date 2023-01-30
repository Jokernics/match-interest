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

export function hexToRgb(hex: string) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

export function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

