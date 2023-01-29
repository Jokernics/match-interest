import { arrayUnion, doc, updateDoc } from "@firebase/firestore";
import { DocumentData, DocumentSnapshot, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { guestType, wordsType } from "./../types/types";

export const sendTelegramMessage = ({ message }: { message: string }) => {
  const token = process.env.REACT_APP_TOKEN;
  const chatID = process.env.REACT_APP_CHAT_ID;

  return fetch(
    `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatID}&text=${message}`,
    {
      method: "GET",
    }
  );
};

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

export const updateUserWords = async (words: wordsType) => {
  if (auth.currentUser && auth.currentUser.uid) {
    try {
      const docRef = await setDoc(doc(db, "words", auth.currentUser.uid), {
        categories: words,
      });
      console.log("Document written with ID: ", docRef);
    } catch (e) {
      console.error("Error adding document: ", e);
      throw Error(JSON.stringify(e))
    }
  }
};

export const updateGuestResult = async (result: guestType, userId: string) => {
  if (auth.currentUser && auth.currentUser.uid) {
    try {
      const docRef = await updateDoc(doc(db, "results", userId), {
        guests: arrayUnion(result),
      });
      console.log("Document written with ID: ", docRef);
    } catch (e) {
      console.error("Error adding document: ", e);
      try {
        const docRef = await setDoc(doc(db, "results", userId), {
          guests: arrayUnion(result),
        });
        console.log("Document written with ID: ", docRef);
      } catch (error) {
        console.error("Error adding document: ", error);
        throw Error("Произошла ошибка");
      }
    }
  }
};
