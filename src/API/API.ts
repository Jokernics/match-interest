import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { guestType, wordsType } from "../types/types";

export default class Api {
  static async sendTelegramMessage({ message }: { message: string }) {
    const token = process.env.REACT_APP_TOKEN;
    const chatID = process.env.REACT_APP_CHAT_ID;

    return fetch(
      `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatID}&text=${message}`,
      {
        method: "GET",
      }
    );
  }

  static async login() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  }

  static async logout() {
    return signOut(auth);
  }

  static async updateUserWords(words: wordsType) {
    if (auth.currentUser && auth.currentUser.uid) {
      try {
        const docRef = await setDoc(doc(db, "words", auth.currentUser.uid), {
          categories: words,
        });
        console.log("Document written with ID: ", docRef);
      } catch (e) {
        console.error("Error adding document: ", e);
        throw Error(JSON.stringify(e));
      }
    }
  }

  static async updateGuestResult(result: guestType, userId: string) {
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
  }
}
