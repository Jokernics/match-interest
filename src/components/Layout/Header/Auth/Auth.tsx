import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { setCredential } from "../../../../app/slices/authSlice";
import { auth } from "../../../../firebase";

export default function Auth() {
  const provider = new GoogleAuthProvider();
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);
  const navigate = useNavigate()

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential!.accessToken;
        // The signed-in user info.
        const user = result.user;
        dispatch(setCredential({ token: user.uid }));
        navigate('/profile')
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.log("error", `${errorCode}: ${errorMessage}`);
      });
  };

  const handleAuth = () => {
    if (token) {
      navigate('/profile')
    } else {
      signIn()
    }
    
  }

  return <button onClick={handleAuth}>Профиль</button>;
}
