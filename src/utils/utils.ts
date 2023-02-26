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
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function getRandomRgba(opacity: string) {
  const color = hexToRgb(getRandomColor());
  if (color) {
    const { r, g, b } = color;

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }

  return "inherit";
}

export function splitArrayByLength<T>({
  array,
  chunkLength,
}: {
  array: Array<T>;
  chunkLength: number;
}) {
  if (!array.length || !chunkLength) return [];

  const arrayWithChunks = [];
  let startIndex = 0;
  let endIndex = chunkLength;

  while (startIndex < array.length) {
    const newArray = array.slice(startIndex, endIndex);
    arrayWithChunks.push(newArray);
    startIndex = endIndex;
    endIndex += chunkLength;
  }

  return arrayWithChunks;
}

export function getTextWidth(text: string, font: string) {
  // re-use canvas object for better performance
  // @ts-ignore
  const canvas = (getTextWidth.canvas ||
    // @ts-ignore
    (getTextWidth.canvas =
      document.createElement("canvas"))) as HTMLCanvasElement;
  const context = canvas.getContext("2d")!;

  context.font = font;
  const metrics = context.measureText(text);
  return metrics.width;
}

export function getCssStyle(element: HTMLElement, prop: string) {
  return window.getComputedStyle(element, null).getPropertyValue(prop);
}

export function getCanvasFont(el = document.body) {
  const fontWeight = getCssStyle(el, "font-weight") || "normal";
  const fontSize = getCssStyle(el, "font-size") || "16px";
  const fontFamily = getCssStyle(el, "font-family") || "Times New Roman";

  return `${fontWeight} ${fontSize} ${fontFamily}`;
}
