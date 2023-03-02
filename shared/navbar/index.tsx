import { useNav } from "@/context/navContext";
import Image from "next/image";
import React from "react";
import { HiMenu } from "react-icons/hi";
import Account from "./account";
import ShoppingCart from "./cart";
import Searchbar from "./searchbar";

function Navbar() {
   const {
      showSideBar,
      setShowSideBar,
      navRef,
      setShowSearchInput,
      showSearchInput,
   } = useNav();

   const toggleSidebar = () => setShowSideBar((show: boolean) => !show);
   // const toggleSearch = () => setShowSearchInput((show: boolean) => !show);

   return (
      <div ref={navRef} className="fixed w-full  z-[1000]">
         <div className="relative flex items-center justify-center w-full bg-white drop-shadow">
            <span className="relative md:flex aspect-square w-[2.5rem] mx-r ml-2 hidden my-2">
               <Image src="/LogoBellezaSana.png" alt="" fill />
            </span>
            <HiMenu
               className="mx-2 mr-auto text-gray-700 cursor-pointer hover:drop-shadow-lg md:hidden"
               size="1.7rem"
               onClick={toggleSidebar}
            />
            <Searchbar />
            <div className={`${showSearchInput ? "hidden" : "flex"} sm:flex`}>
               <ShoppingCart />
               <Account />
            </div>
         </div>
      </div>
   );
}

export default Navbar;
