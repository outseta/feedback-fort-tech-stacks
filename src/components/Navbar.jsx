import React from "react";
import clsx from "clsx";
import AccountDropdown from "./AccountDropdown";

const Navbar = ({ className }) => {
  return (
    <nav className={clsx("navbar gap-2", className)}>
      <a className="btn btn-ghost mr-auto" href="/">
        Feeback Fort
      </a>

      {/* Anonymous buttons - only shown when logged out */}
      <button
        className="btn btn-ghost"
        data-o-anonymous
        data-o-auth="1"
        data-mode="popup"
        data-widget-mode="register"
      >
        Sign Up
      </button>
      <button
        className="btn btn-ghost"
        data-o-anonymous
        data-o-auth="1"
        data-mode="popup"
        data-widget-mode="login"
      >
        Log In
      </button>

      <AccountDropdown data-o-authenticated />
    </nav>
  );
};

export default Navbar;
