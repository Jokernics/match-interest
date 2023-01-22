import "animate.css";
import Game from "./components/Game/Game";
import SmokeBackground from "./components/SmokeBackground/SmokeBackground";
import StarfallBackground from "./components/StarfallBackground/StarfallBackground";

function App() {

  return (
    <div className="relative h-screen w-screen p-3 flex justify-center overflow-hidden bg-slate-100">
      <div className="z-50 w-full h-full flex justify-center">
        <Game />
      </div>
      <SmokeBackground />
      <StarfallBackground />
    </div>
  );
}

export default App;
