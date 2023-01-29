import { GoogleAuthProvider, signInWithPopup, signOut } from "@firebase/auth";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { auth } from "../../../firebase";
import Auth from "./Auth/Auth";

const links = [{ to: "/", name: "Домой" }];

export default function Header() {
  return (
    <div className="p-3 flex w-full justify-end text-white gap-2 pt-2 pr-4">
      {links.map((link) => (
        <Link key={link.name} to={link.to}>
          {link.name}
        </Link>
      ))}
      <Auth />
    </div>
  );
}
