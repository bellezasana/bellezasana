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
      <div
         ref={navRef}
         className="fixed z-[1000]  flex w-screen h-14 overflow-hidden drop-shadow bg-white items-center"
      >
         <Image
            src="/LogoBellezaSana.png"
            alt=""
            fill
            className="!relative hidden md:flex !aspect-square !w-fit  mx-2"
         />
         <HiMenu
            className="mx-2 my-auto text-gray-700 cursor-pointer hover:drop-shadow-lg md:hidden"
            size="1.7rem"
            onClick={toggleSidebar}
         />
         <Searchbar />
         {/* <div
               className={`${
                  showSearchInput ? "hidden" : "flex "
               } sm:flex bg-red-400 min-h-full  `}
            > */}
         {/* <div className="relative flex !w-fit bg-red-400 "> */}
         <ShoppingCart />
         <Account />
         {/* </div> */}
         {/* </div> */}
      </div>
   );
}

export default Navbar;
