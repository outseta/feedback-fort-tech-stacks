import React from "react";
import clsx from "clsx";
import AccountDropdown from "./AccountDropdown";
import SignupIcon from "../assets/signup.svg?react";
import LoginIcon from "../assets/login.svg?react";

const PRESELECTED_PLAN_UID = import.meta.env.VITE_OUTSETA_PRESELECTED_PLAN_UID;

const Navbar = ({ className }) => {
  return (
    <nav className={clsx("navbar gap-2 items-center", className)}>
      <a href="/" className="btn btn-lg btn-ghost mr-auto px-4">
        <span className="z-10">FF Tech Stacks</span>
      </a>

      <button
        className="btn btn-ghost btn-sm"
        data-o-anonymous // Anonymous buttons - only shown when logged out
        data-o-auth="1"
        data-mode="popup"
        data-widget-mode="login"
      >
        <LoginIcon className="size-5" />
        Log In
      </button>
      <button
        className="btn btn-primary btn-sm"
        data-o-anonymous // Anonymous buttons - only shown when logged out
        data-o-auth="1"
        data-mode="popup"
        data-widget-mode="register"
        data-plan-uid={PRESELECTED_PLAN_UID}
        data-skip-plan-options="true"
      >
        <SignupIcon className="size-5" />
        Sign Up
      </button>

      <AccountDropdown
        data-o-authenticated // Account dropdown - only shown when logged in
      />
    </nav>
  );
};

export default Navbar;
