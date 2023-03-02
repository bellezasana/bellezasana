import React, { useState, useEffect } from "react";
import PersonIcon from "@mui/icons-material/Person";
import { useAuth } from "@/context/authContext";
import Image from "next/image";
import { useNav } from "@/context/navContext";
import { useRouter } from "next/router";
import { auth } from "@/utils/firebaseConfig";
import AccDropdown from "./accDropdown";

function Account() {
   const router = useRouter();
   const { currentUser } = useAuth();
   const { setShowDropdown, showDropdown, accIconRef } = useNav();

   const handleClick = () => {
      if (!currentUser) {
         let url = `/auth/login?src=${encodeURIComponent(router.asPath)}`;

         router.push(url);
         // router.push("/auth/login");
         return;
      }
      setShowDropdown((show: boolean) => !show);
   };

   return (
      <div>
         <span
            ref={accIconRef}
            onClick={handleClick}
            className="flex aspect-square ml-1 mr-4 bg-white rounded-full drop-shadow-md h-[2.5rem] items-center justify-center cursor-pointer hover:drop-shadow-lg overflow-hidden"
         >
            {currentUser?.photoURL && currentUser?.photoURL !== "" ? (
               <span className="relative flex w-full aspect-square">
                  <Image src={currentUser.photoURL} alt="" fill />
               </span>
            ) : (
               <PersonIcon className="text-gray-700" />
            )}
         </span>
         {showDropdown && <AccDropdown />}
      </div>
   );
}

export default Account;
