import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth, db } from "../../../firebase";
import Auth from "./Auth/Auth";
import { signOut } from "firebase/auth";

const links = [
  { to: "/", name: "Домой" },
  { to: "/profile", name: "К профилю" },
];

export default function Header() {
  const [signInWithGoogle, loading, error] = useSignInWithGoogle(auth);
  const [user] = useAuthState(auth);
  useEffect(() => {
    console.log(`current user is ${user}`);
  }, [user]);

  return (
    <div className="fixed top-0 flex w-full justify-end text-white gap-2 pt-2 pr-4">
      {!user && !loading ? (
        <button
          onClick={() => {
            signInWithGoogle().then((res) => console.log("curent res", res));
          }}
        >
          {loading ? "loading..." : "Log In"}
        </button>
      ) : (
        <button onClick={() => signOut(auth)}>Log Out</button>
      )}

      {links.map((link) => (
        <Link key={link.name} to={link.to}>
          {link.name}
        </Link>
      ))}
      {/* <Auth /> */}
    </div>
  );
}
