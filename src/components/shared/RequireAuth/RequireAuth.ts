import { getAuth } from "firebase/auth";
import { ReactNode } from "react";

type props = {
  children: ReactNode;
};

export default function RequireAuth({ children }: props) {
  const user = getAuth().currentUser;

  if (!user) return null;

  return children;
}
