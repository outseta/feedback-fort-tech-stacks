import React from "react";
import clsx from "clsx";
import AccountDropdown from "./AccountDropdown";
import TowerIcon from "../assets/icons8-tower.svg?react";
const Navbar = ({ className }) => {
  return (
    <nav className={clsx("navbar gap-2 items-center", className)}>
      <a
        href="/"
        className="btn btn-lg btn-ghost flex flex-col mr-auto px-0 group"
      >
        <span className="z-10">Feedback Fort</span>
        <span className="badge badge-sm badge-soft badge-secondary -mt-4 group-hover:bg-transparent group-hover:border-transparent transition-all">
          Outseta + React + Supabase
        </span>
      </a>

      <button
        className="btn btn-ghost"
        data-o-anonymous // Anonymous buttons - only shown when logged out
        data-o-auth="1"
        data-mode="popup"
        data-widget-mode="login"
      >
        Log In
      </button>
      <button
        className="btn btn-ghost"
        data-o-anonymous // Anonymous buttons - only shown when logged out
        data-o-auth="1"
        data-mode="popup"
        data-widget-mode="register"
      >
        Sign Up
      </button>

      <AccountDropdown
        data-o-authenticated // Account dropdown - only shown when logged in
      />
    </nav>
  );
};

export default Navbar;
