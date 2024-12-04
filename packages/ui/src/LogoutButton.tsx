import React from "react";
import { BiLogOut } from "react-icons/bi";
import { userAuth } from "./zustand/userAuth";
import axios from "axios";

const LogoutButton = () => {
  const { removeUser } = userAuth();

  return (
    <div className="mt-auto">
      <BiLogOut
        className="w-6 h-6 text-white cursor-pointer"
        onClick={() => {
          axios.get("http://localhost:8000/api/v1/auth/signout", {
            withCredentials: true,
          });
          removeUser();
        }}
      />
    </div>
  );
};

export default LogoutButton;
