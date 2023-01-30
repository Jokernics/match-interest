import AnimatedLetters from "../../../components/shared/AnimatedLetters/AnimatedLetters";

export default function FarewellStage() {
  return (
    <div className="flex justify-center fixed top-1/4 w-full">
      <h2 className="my-auto text-3xl">
        <AnimatedLetters animationTimeDivider={25} start={1} word="Ответы отправлены" />
      </h2>
    </div>
  );
}
