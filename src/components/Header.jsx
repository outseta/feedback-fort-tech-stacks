import React from "react";
import AccountDropdown from "./AccountDropdown";

const Header = () => {
  return (
    <header className="bg-base-100 py-3">
      <nav className="navbar mx-auto max-w-5xl flex gab-2">
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
    </header>
  );
};

export default Header;
