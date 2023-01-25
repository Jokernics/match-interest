import { Outlet } from "react-router";
import SmokeBackground from "../Backgrounds/SmokeBackground/SmokeBackground";
import StarfallBackground from "../Backgrounds/StarfallBackground/StarfallBackground";
import Header from "./Header/Header";

export default function Layout() {
  return (
    <div className="relative h-screen w-screen p-3 flex justify-center overflow-hidden bg-slate-100">
      <div className="z-50 w-full h-full flex justify-center">
        <Header />
        <Outlet />
      </div>
      <SmokeBackground />
      <StarfallBackground />
    </div>
  );
}
