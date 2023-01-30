import { ReactElement } from "react";
import Loader from "../Loader/Loader";

type props = {
  onClick?: () => void;
  children: string | ReactElement;
  className?: string;
  style?: {};
  isLoading?: boolean;
};

export default function RoundedButton({
  onClick,
  children,
  className,
  style = {},
  isLoading = false,
}: props) {
  return (
    <button
      style={style}
      onClick={() => !isLoading && onClick && onClick()}
      className={`rounded h-9 w-fit text-black flex justify-center items-center bg-slate-200 px-2 hover:bg-slate-500 transition-all ${
        className ? className : ""
      }`}
    >
      <p className={`${!isLoading ? "invisible" : ""} absolute`}>
        {<Loader />}
      </p>
      <p className={`${isLoading ? "invisible" : ""}`}>{children}</p>
    </button>
  );
}
