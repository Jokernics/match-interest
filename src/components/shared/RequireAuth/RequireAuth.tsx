import { ReactElement } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router";
import Api from "../../../API/API";
import { auth } from "../../../firebase";
import Loader from "../Loader/Loader";
import RoundedButton from "../RoundedButton/RoundedButton";

type props = {
  children: ReactElement;
};

export default function RequireAuth({ children }: props) {
  const [user, loading, error] = useAuthState(auth);

  if (loading) return <Loader />;

  if (error) return <h2>{JSON.stringify(error)}</h2>;

  if (!user)
    return (
      <div className="flex flex-col justify-center items-center gap-2 ">
        <h5 className="drop-shadow-2xl">Вы не авторизованы</h5>
        <RoundedButton onClick={() => Api.login()}>Войти</RoundedButton>
      </div>
    );

  if (user) return children;

  return <h5>Произошла непредвиденная ошибка</h5>
}
