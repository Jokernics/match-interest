import { getAuth } from "firebase/auth";
import { ReactElement, useEffect } from "react";
import { useNavigate } from "react-router";

type props = {
  children: ReactElement;
};

export default function RequireAuth({ children }: props) {
  const user = getAuth().currentUser;
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!user) return navigate("/");
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [user]);

  if (!user) return null;

  return children;
}
