import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { NavLink } from "react-router-dom";
import { auth } from "../../../../firebase";

const login = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider);
};
const logout = () => {
  signOut(auth);
};

export default function Auth() {
  const [user, loading, error] = useAuthState(auth);

  if (!user)
    return <button onClick={login}>{loading ? "loading..." : "Log In"}</button>;

  return <NavLink to='/profile'>K профилю</NavLink>
}
