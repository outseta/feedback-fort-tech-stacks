import React from "react";
import AvatarPlaceholder from "../assets/avatar-placeholder.svg?react";
import LogOut from "../assets/logout.svg?react";

const AccountDropdown = (props) => {
  return (
    <details className="dropdown dropdown-end" {...props}>
      <summary className="btn m-1">
        <div className="avatar w-8">
          <div className="relative h-full w-full rounded">
            <AvatarPlaceholder className="text-base-content/70 h-full w-full p-1" />
            <img
              src="[data-o-member:ProfileImageS3Url]"
              className="bg-base-200 absolute inset-0 [&[src='null']]:hidden"
              alt="Avatar"
            />
          </div>
        </div>
      </summary>

      <div className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
        <p className="border-base-200 mx-3 flex flex-col border-b py-3">
          <span data-o-member="FullName" className="text-base-content"></span>
          <span
            data-o-member="Email"
            className="text-base-content/70 text-xs"
          ></span>
        </p>
        <menu className="py-3">
          <li>
            <button data-o-profile data-mode="popup">
              <AvatarPlaceholder className="size-4" /> My Account
            </button>
          </li>
          <li>
            <button data-o-logout-link>
              <LogOut className="size-4" /> Logout
            </button>
          </li>
        </menu>
      </div>
    </details>
  );
};

export default AccountDropdown;
