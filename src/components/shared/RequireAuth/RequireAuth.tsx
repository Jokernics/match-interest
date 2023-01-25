import { ReactElement, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { setCredential } from "../../../app/slices/authSlice";
import { auth } from "../../../firebase";
import Loader from "../Loader/Loader";

type props = {
  children: ReactElement;
};

export default function RequireAuth({ children }: props) {
  const navigate = useNavigate();
  const dispath = useAppDispatch();
  const [user, loading, error] = useAuthState(auth);
  useEffect(() => {
    console.log('requireAuth, user is', user)
  }, [])
  
  useEffect(() => {
    if (user) {
      const uid = user.uid;
      dispath(setCredential({ token: uid }));
    }
    if (!user && !loading) navigate("/");
  }, [user, loading]);

  if (loading) return <Loader />;
  if (error) return <h2>Error occured</h2>;

  if (user) return children;

  return <h5>404</h5>
}
