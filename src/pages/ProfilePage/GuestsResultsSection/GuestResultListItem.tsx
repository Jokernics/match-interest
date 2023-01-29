import { guestType } from "../../../types/types";

type props = {
  result: guestType;
  index: number;
};

export default function GuestResultListItem({ result, index }: props) {
  const guestName = Object.keys(result)[0];
  const answers = result[guestName];
  return (
    <div className="flex flex-col overflow-hidden rounded py-3 w-fit bg-orange-500">
      <h2 className="bg-slate-300 rounded px-2 mx-2">
        {index + 1}. {guestName} {answers.answers.length}/{answers.total}
      </h2>
      <div className="flex flex-col ml-3 mr-4">
        {answers.answers.map((word, index) => (
          <h2 key={word + index}>- {word}</h2>
        ))}
      </div>
    </div>
  );
}
