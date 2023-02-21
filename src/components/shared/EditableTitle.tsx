import { useState } from "react";
import MyInput from "./MyInput";

type props = {
  titleValue: string;
  inputValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDelete: () => void;
  className?: string;
};

export default function EditableTitle({
  onDelete,
  titleValue,
  inputValue,
  onChange,
  className = "",
}: props) {
  const [isEditingMode, setIsEditingMode] = useState(false);

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();

      setIsEditingMode(false);
    }
  };

  return (
    <div
      className={`min-h-[2.25rem] rounded bg-slate-600 flex justify-center items-center overflow-hidden relative h-9
      ${!isEditingMode ? "pr-4" : ""} ${className}
  `}
    >
      {isEditingMode ? (
        <MyInput
          onKeyUp={handleKeyUp}
          type="text"
          className="pr-2 overflow-auto"
          onBlur={() => setIsEditingMode(false)}
          autoFocus
          onChange={onChange}
          value={inputValue}
          size={inputValue.length - 1 < 1 ? 2 : inputValue.length}
        />
      ) : (
        <h5
          onClick={() => {
            setIsEditingMode(true);
          }}
          className="h-full whitespace-nowrap overflow-auto min-w-[2.3em] pl-1 pr-1 flex items-center"
        >
          {titleValue}
        </h5>
      )}
      {!isEditingMode && (
        <button
          onClick={onDelete}
          className="text-[8px] absolute top-[1px] right-[1px]"
        >
          &#10060;
        </button>
      )}
    </div>
  );
}
