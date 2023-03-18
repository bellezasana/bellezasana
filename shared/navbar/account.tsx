import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import { useAuth } from "@/context/authContext";
import Image from "next/image";
import { useNav } from "@/context/navContext";
import { useRouter } from "next/router";
import AccDropdown from "./accDropdown";

function Account() {
   const router = useRouter();
   const { currentUser } = useAuth();
   const { setShowDropdown, showDropdown, accIconRef } = useNav();

   const handleClick = () => {
      if (!currentUser) {
         let url = `/auth/login?src=${encodeURIComponent(router.asPath)}`;

         router.push(url);
         return;
      }

      setShowDropdown((show: boolean) => !show);
   };

   return (
      <>
         <span
            ref={accIconRef}
            onClick={handleClick}
            className="flex items-center justify-center relative  overflow-hidden bg-white rounded-full cursor-pointer !aspect-square drop-shadow-md hover:drop-shadow-lg  min-w-max mr-1 !h-12"
         >
            {currentUser?.photoURL && currentUser?.photoURL !== "" ? (
               <Image
                  src={currentUser.photoURL}
                  alt=""
                  fill
                  className="!relative !aspect-square flex !w-12 "
               />
            ) : (
               <PersonIcon className="text-gray-700 " />
            )}
         </span>
         {showDropdown && <AccDropdown />}
      </>
   );
}

export default Account;
