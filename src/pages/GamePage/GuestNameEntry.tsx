import { SyntheticEvent, useMemo, useState } from "react";
import RoundedButton from "../../components/shared/RoundedButton/RoundedButton";

type props = {
  guestName: React.MutableRefObject<string>;
  setGameStatus: React.Dispatch<React.SetStateAction<string>>;
};

export default function GuestNameEntry({ guestName, setGameStatus }: props) {
  const [name, setName] = useState("");
  const [isClosed, setIsClosed] = useState(false);

  const setGuestName = (e: SyntheticEvent) => {
    e.preventDefault();

    setIsClosed(true);

    setTimeout(() => {
      guestName.current = name;
      setGameStatus("description");
    }, 200);
  };

  const animation = useMemo(
    () => (isClosed ? "fadeOut" : "fadeInDown"),
    [isClosed]
  );

  const containerAnimationDuration = useMemo(
    () => (isClosed ? ".3s" : ".5s"),
    [isClosed]
  );

  return (
    <div
      className={`w-full flex justify-center p-3 animate__animated animate__${animation} fixed top-1/4 left-0`}
      style={{ animationDuration: containerAnimationDuration }}
    >
      <div className="px-6 py-6 flex flex-col gap-3 bg-slate-800 rounded-md">
        <h2>Введите свое имя:</h2>
        <form onSubmit={setGuestName} className="flex gap-3">
          <input
            autoFocus
            className="px-2 outline-none rounded"
            placeholder="Имя"
            size={15}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <RoundedButton>Сохранить</RoundedButton>
        </form>
      </div>
    </div>
  );
}
