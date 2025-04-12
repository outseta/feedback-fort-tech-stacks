import React from "react";

const Header = () => {
  return (
    <header>
      <nav>
        <a href="/">Feeback Fort</a>

        {/* Anonymous buttons - only shown when logged out */}
        <button
          data-o-anonymous
          data-o-auth="1"
          data-mode="popup"
          data-widget-mode="register"
        >
          Sign Up
        </button>
        <button
          data-o-anonymous
          data-o-auth="1"
          data-mode="popup"
          data-widget-mode="login"
        >
          Log In
        </button>

        {/* Authenticated buttons - only shown when logged in */}
        <button data-o-authenticated data-o-profile="1" data-mode="popup">
          <img src="[data-o-member:ProfileImageS3Url]" alt="Avatar" />
          <span data-o-member="Email">Profile</span>
        </button>
        <button data-o-authenticated data-o-logout-link="1">
          Logout
        </button>
      </nav>
    </header>
  );
};

export default Header;
