import { ReactElement, useEffect, useRef, useState } from "react";
import Loader from "../Loader/Loader";
import { ReactComponent as ArrowIcon } from "../../../assets/images/arrow.svg";

type props = {
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children: string | ReactElement;
  className?: string;
  style?: {};
  isLoading?: boolean;
  isSuccess?: boolean;
};

export default function RoundedButton({
  onClick,
  children,
  className,
  style = {},
  isLoading = false,
  isSuccess = false,
}: props) {
  const [isArrow, setIsArrow] = useState(true);
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isSuccess) {
      setIsArrow(true);
      timer.current = setTimeout(() => {
        setIsArrow(false);
      }, 2000);
    } else {
      setIsArrow(false);

      if (timer.current) {
        clearTimeout(timer.current);
      }
    }
  }, [isSuccess]);

  return (
    <button
      style={style}
      onClick={(e) => !isLoading && !isArrow && onClick && onClick(e)}
      className={`relative rounded h-9 w-fit text-black flex justify-center items-center bg-slate-200 px-2 hover:bg-slate-500 transition-all ${
        className ? className : ""
      }`}
    >
      {isLoading && <p className="absolute">{<Loader />}</p>}
      {isArrow && (
        <p className="absolute">
          <ArrowIcon
            style={{ animationDuration: ".8s" }}
            className=" mx-auto overflow-hidden animate__animated animate__fadeIn fill-black"
          />
        </p>
      )}
      <p
        className={`${isLoading || isArrow ? "invisible" : ""} ${
          !isArrow && isSuccess ? "animate__animated animate__fadeIn" : ""
        }`}
      >
        {children}
      </p>
    </button>
  );
}
