import React from "react";
import Logo from "./logo";
import Search from "./search";
import Actions from "./actions"
const Navbar = () => {
  return (
    <nav className="fixed top-0 bg-[#252731] w-full h-20 flex items-center justify-between px-2 lg:px-4 z-[49] shadow-sm">
      <Logo/>
      <Search/>
      <Actions/>
    </nav>
  );
};

export default Navbar;
