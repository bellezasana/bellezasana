import React from "react";
import NavUl from "../sidebar";
import Topbar from "./topbar";

function Navbar() {
   return (
      <div className="fixed w-full  z-[1000]">
         <Topbar />
      </div>
   );
}

export default Navbar;
