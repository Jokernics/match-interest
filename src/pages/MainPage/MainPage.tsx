import AnimatedLetters from "../../components/shared/AnimatedLetters/AnimatedLetters";
import ExampleSphere from "./ExampleSphere";

export default function MainPage() {
  const paragraph = [
    "Тест на совместимость:",
    "Заполните список своих увлечений, поделитесь им c друзьями",
    "проверьте на сколько вы похожи",
  ];

  return (
    <div className="text-2xl text-white gap-2 w-full h-full flex flex-col">
      <div className="flex flex-col items-center text-center">
        {paragraph.map((str, i, arr) => {
          const startTime = arr.slice(0, i).reduce((acc, cur) => acc + cur.length, 0) || 1;

          return <AnimatedLetters key={i} animationTimeDivider={25} start={startTime} word={str} />;
        })}
      </div>
      <ExampleSphere />
    </div>
  );
}
