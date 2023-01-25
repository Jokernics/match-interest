import { addDoc, collection, doc } from "@firebase/firestore";
import { db } from "../../firebase";

export default function ProfilePage() {
  return (
    <div>
      <h5>Progile page</h5>
      <button
        onClick={async () => {
          try {
            const wordsDocumentRef = doc(db, "words/userid2");
            const docRef = await addDoc(collection(db, "users"), {
              first: "Adwa",
              last: "Lovelace",
              born: 1815,
            });
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
        }}
      >
        Send Data
      </button>
    </div>
  );
}
