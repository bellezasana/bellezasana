import { useNav } from "@/context/navContext";
import Image from "next/image";
import React from "react";
import { HiMenu } from "react-icons/hi";
import Account from "./account";
import ShoppingCart from "./cart";
import Searchbar from "./searchbar";

function Topbar() {
   const { showSideBar, setShowSideBar, navRef } = useNav();
   const toggleSidebar = () => setShowSideBar((show: boolean) => !show);
   return (
      <div
         ref={navRef}
         className="relative flex items-center justify-center w-full py-2 bg-white drop-shadow"
      >
         <span className="relative md:flex aspect-square w-[2.5rem] mx-r ml-2 hidden">
            <Image src="/LogoBellezaSana.png" alt="" fill />
         </span>
         <HiMenu
            className="mx-2 mr-auto text-gray-700 cursor-pointer hover:drop-shadow-lg md:hidden"
            size="1.7rem"
            onClick={toggleSidebar}
         />
         <Searchbar />
         <ShoppingCart />
         <Account />
      </div>
   );
}

export default Topbar;
