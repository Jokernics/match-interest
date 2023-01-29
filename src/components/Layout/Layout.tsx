import { Outlet } from "react-router";
import SmokeBackground from "../Backgrounds/SmokeBackground/SmokeBackground";
import StarfallBackground from "../Backgrounds/StarfallBackground/StarfallBackground";
import Header from "./Header/Header";

export default function Layout() {
  return (
    <div className="relative h-screen w-screen flex justify-center overflow-hidden bg-slate-100">
      <div className="z-50 w-full h-full flex flex-col flex-grow overflow-auto">
        <Header />
        <div className="flex grow overflow-auto flex-col px-4">
          <Outlet />
        </div>
      </div>
      <SmokeBackground />
      <StarfallBackground />
    </div>
  );
}
