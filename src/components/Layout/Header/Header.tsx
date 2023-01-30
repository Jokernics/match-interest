import { NavLink } from "react-router-dom";
import { ReactComponent as HomeIcon } from "../../../assets/images/home.svg";
import { ReactComponent as ProfileIcon } from "../../../assets/images/profile.svg";

const links = [
  { to: "/", name: <HomeIcon /> },
  { to: "/profile", name: <ProfileIcon /> },
];

export default function Header() {
  return (
    <div className="flex w-full justify-end text-white gap-2 mb-3">
      {links.map((link, i) => (
        <NavLink
          style={({ isActive }) => (isActive ? { fill: "#476a9a" } : {})}
          key={link.to + i}
          to={link.to}
          className="fill-white hover:fill-slate-500 transition-all"
        >
          {link.name}
        </NavLink>
      ))}
    </div>
  );
}
