import React from "react";
import SearchBar from "./SearchBar";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";

const SideBar = () => {
  return (
    <div className="flex flex-col border-r border-slate-500 p-4">
      <SearchBar />
      <div className="divider px-3" />
      <Conversations />
      <LogoutButton />
    </div>
  );
};

export default SideBar;
