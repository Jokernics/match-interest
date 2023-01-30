import { Outlet } from "react-router";
import SmokeBackground from "../Backgrounds/SmokeBackground/SmokeBackground";
import StarfallBackground from "../Backgrounds/StarfallBackground/StarfallBackground";
import Header from "./Header/Header";

export default function Layout() {
  return (
    <div className="relative h-screen w-screen flex justify-center overflow-clip bg-slate-100">
      <div className="z-50 p-3  w-full h-full flex flex-col flex-grow overflow-y-auto">
        <Header />
        <Outlet />
      </div>
      <SmokeBackground />
      <StarfallBackground />
    </div>
  );
}
