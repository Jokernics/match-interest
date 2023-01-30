import ExampleSphere from "./ExampleSphere";

export default function MainPage() {
  return (
    <div className="text-2xl text-white gap-2 w-full h-full flex flex-col justify-center overflow-hidden">
      <div className="flex flex-col items-center text-center">
        <h1 className="mb-3">Тест на совместимость:</h1>
        <h2>Заполняйте список своих увлечений и делитесь им с друзьями</h2>
        <h2>чтобы проверить на сколько вы похожи :)</h2>
      </div>
      <ExampleSphere />
    </div>
  );
}
