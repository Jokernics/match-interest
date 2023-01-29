import AnimatedLetters from "../../components/shared/AnimatedLetters/AnimatedLetters";

export default function EndScreen() {
  return (
    <div className="flex justify-center fixed top-1/4 w-full">
      <h2 className="my-auto text-3xl">
        <AnimatedLetters start={1} word="Спасибо за внимание *)" />
      </h2>
    </div>
  );
}
