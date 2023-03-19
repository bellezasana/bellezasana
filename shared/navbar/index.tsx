import { useNav } from "@/context/navContext";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { HiMenu } from "react-icons/hi";
import Account from "./account";
import ShoppingCart from "./cart";
import Searchbar from "./searchbar";

function Navbar() {
   const { setShowSideBar, navRef, setShowSearchInput, showSearchInput } =
      useNav();
   const router = useRouter();

   useEffect(() => {
      let show = router.pathname === "/[[...index]]";
      setShowSearchInput(show);
   }, [router, setShowSearchInput]);

   const toggleSidebar = () => setShowSideBar((show: boolean) => !show);

   return (
      <div
         ref={navRef}
         className="fixed z-[1000] flex flex-col w-screen  drop-shadow bg-white  "
      >
         <div className="relative flex items-center w-screen h-14">
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

            {showSearchInput && (
               <span className="hidden w-full sm:flex max-w-[35ch] mx-auto">
                  <Searchbar />
               </span>
            )}

            <ShoppingCart />
            <Account />
         </div>
         {showSearchInput && (
            <div className="w-full px-4 pb-2 h-14 sm:hidden ">
               <Searchbar />
            </div>
         )}
      </div>
   );
}

export default Navbar;
