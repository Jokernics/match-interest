import { ReactElement } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useNavigate } from "react-router";
import { auth } from "../../../firebase";
import Loader from "../Loader/Loader";

type props = {
  children: ReactElement;
};

export default function RequireAuth({ children }: props) {
  const [user, loading, error] = useAuthState(auth);
  
  if (loading) return <Loader />;
  if (error) return <h2>Error occured</h2>;

  if (user) return children;

  return <Navigate to='/' />
}
