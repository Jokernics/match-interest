import { getAuth, GoogleAuthProvider, signInWithPopup } from "@firebase/auth";
import React from "react";
import { auth } from "../../firebase";

export default function MainPage() {
  const provider = new GoogleAuthProvider();

  const signIn = () => {
    signInWithPopup(auth, provider).then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential!.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log(user)
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
      console.log('error', `${errorCode}: ${errorMessage}`)
    });
  };

  

  return (
    <div>
      <button onClick={signIn}>Зайти</button>
      <button onClick={() => console.log(auth.currentUser)}>Посмотреть</button>
    </div>
  );
}
