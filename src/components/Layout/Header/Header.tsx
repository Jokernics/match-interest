import { Link, NavLink } from "react-router-dom";
import { ReactComponent as HomeIcon } from "../../../assets/images/home.svg";
import { ReactComponent as ProfileIcon } from "../../../assets/images/profile.svg";

const links = [
  { to: "/", name: <HomeIcon /> },
  { to: "/profile", name: <ProfileIcon /> },
];

export default function Header() {
  return (
    <div className="p-3 flex w-full justify-end text-white gap-2 pt-2 pr-4 ">
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
