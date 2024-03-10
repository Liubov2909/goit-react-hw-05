import { NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "./Navigation.module.css";

const linkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.isActive);
};

export const Navigation = () => {
  return (
    <header>
      <nav className={css.nav}>
        <NavLink to="/" className={linkClass}>
          Home
        </NavLink>
        <NavLink to="/movies" className={linkClass}>
          Movies
        </NavLink>
      </nav>
    </header>
  );
};

export default Navigation;
